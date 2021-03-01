/* eslint-disable prefer-spread */
/* eslint-disable prettier/prettier */
const _ = require("lodash")
const User = require("../../models/user")
const Notification = require("../../models/notification")
const Objective = require("../../models/objective")

// router.get("/:userId/mentees/match", matchMentees)
const matchMentees = async (req, res) => {
  try {
    const pageOptions = { page: parseInt(req.query.page, 10) || 0, limit: parseInt(req.query.limit, 10) || 999 }
    const selectedUser = await User.findOne({ _id: req.params.userId }).select("-__v -skills").lean()

    // seleccionamos los skills y keywords a matchear
    const skillsIdsToMatch = selectedUser.skillsToTeach.map((e) => e._id)
    const skillsKeywordsToMatch = _.uniq([].concat.apply([], selectedUser.skillsToTeach.map((e) => e.keywords)))

    // excluimos al usuario mismo y a los mentees que ya tiene y cuya relación esta activa
    const menteesIds = selectedUser.mentees.filter((e) => e.active).map((e) => e._id)
    const excludedResults = [...menteesIds, selectedUser._id]

    // query
    const users = await User.aggregate([
      { $unwind: "$skillsToLearn" },
      { $unwind: "$skillsToLearn.keywords" },
      {
        $project: { skillsToTeach: 0 },
      },

      {
        $match: {
          _id: { $nin: excludedResults },
          $or: [
            { "skillsToLearn._id": { $in: skillsIdsToMatch } }, // [id,id,id,id]
            { "skillsToLearn.keywords": { $in: skillsKeywordsToMatch } },
          ],
        },
      },

      {
        $group: {
          _id: {
            userId: "$_id",
            skillId: "$skillsToLearn._id",
          },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          country: { $first: "$country" },
          languages: { $first: "$languages" },
          avatar: { $first: "$avatar" },
          name: { $first: "$skillsToLearn.name" },
          proficiency: { $first: "$skillsToLearn.proficiency" },
          popularity: { $first: "$skillsToLearn.popularity" },
          keywords: { $push: "$skillsToLearn.keywords" },
          matchedKeywordsCount: { $sum: 1 }, // peso por cada match de keyword (1)
        },
      },

      {
        $project: {
          _id: "$_id.userId",
          firstName: "$firstName",
          lastName: "$lastName",
          country: "$country",
          languages: "$languages",
          avatar: "$avatar",

          skillsToLearn: {
            _id: "$_id.skillId",
            name: "$name",
            proficiency: "$proficiency",
            popularity: "$popularity",
            keywords: "$keywords",
            matchedKeywordsCount: "$matchedKeywordsCount",
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          country: { $first: "$country" },
          skillsToLearn: { $push: "$skillsToLearn" },
          languages: { $first: "$languages" },
          avatar: { $first: "$avatar" },
          // skillsCount: { $sum: 1 },
          matchedKeywordsCount: { $sum: "$skillsToLearn.matchedKeywordsCount" },
          skillMatchCount: {
            $sum: {
              $cond: [{ $in: ["$skillsToLearn._id", skillsIdsToMatch] }, 3, 0], // peso por cada match exacto (3)
            },
          },
        },
      },

      {
        $set: {
          score: { $add: ["$matchedKeywordsCount", "$skillMatchCount"] },
        },
      },

      {
        $project: {
          skillsToLearn: {
            "proficiency": 0,
            "popularity": 0,
            "keywords": 0,
            "matchedKeywordsCount": 0,
          },
          matchedSkillsCount: 0,
          matchedKeywordsCount: 0,
        },
      },

      { $sort: { score: -1 } },

      { $skip: pageOptions.page * pageOptions.limit },
      { $limit: pageOptions.limit },
    ])
    return res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
}

// router.post("/:userId/mentees/:menteeId/request", mentorToMenteeRequest)
const mentorToMenteeRequest = async (req, res) => {
  const { userId, menteeId } = req.params
  const { firstName, lastName, teachingSkills } = req.body

  const notification = await Notification.create({
    type: "mentor request",
    userId: menteeId,
    mentorId: userId,
    mentorName: `${firstName} ${lastName}`,
    payload: teachingSkills,
    isActive: true,
  })
  res.status(201).send({ message: "Request sent to mentee!", notification })
}

// router.post("/:userId/mentees/:menteeId", postUserMentee)
const postUserMentee = async (req, res, next) => {
  const { userId, menteeId } = req.params
  const { teachingSkills, notificationId } = req.body
  console.log("NOTIFICATIONID", notificationId)

  try {
    const user = await User.findOne({ _id: userId })
    // console.log("user", user)
    const mentee = await User.findOne({ _id: menteeId })

    const idx = user.mentees.findIndex((e) => e._id.toString() === menteeId)
    console.log("idx", idx)
    if (1 === 1/* idx === -1 || !user.mentees[idx].active */) {
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = mentee
      user.mentees.push({ _id, email, firstName, lastName, country, phoneNumber, languages, avatar, teachingSkills, meetings: [], objectives: [], active: true, })
      user.save()
    } else {
      return res.status(403).send({ error: "user already has an active relationship with mentee!" })
    }

    const idy = mentee.mentors.findIndex((e) => e._id.toString() === userId)
    if (1 === 1 /* idy === -1 || !mentee.mentors[idy].active */) {
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = user
      mentee.mentors.push({ _id, email, firstName, lastName, country, phoneNumber, languages, avatar, teachingSkills, meetings: [], objectives: [], active: true, })
      mentee.save()
    } else {
      return res.status(403).send({ error: "mentor already has an active relationship with user!" })
    }

    // se pasa a inactiva la notificación
    await Notification.updateOne({ _id: notificationId }, { $set: { isActive: false } })

    // se crea una nueva notificacion para el emisor original
    const notification = await Notification.create({
      type: "mentee request accepted", // EL USUARIO HA ACEPTADO UN PEDIDO DE UN APRENDIZ
      userId: menteeId,
      mentorId: userId,
      mentorName: `${user.firstName} ${user.lastName}`,
      payload: teachingSkills,
      isActive: true,
    })

    res.status(201).send({ message: "mentee added succesfully!", notification })
  } catch (error) {
    return res.status(500).send({ error })
  }
}

// /:userId/mentees/:menteeId/objectives
const postObjective = async (req, res) => {
  try {
    const { userId, menteeId } = req.params
    const { name } = req.body
    const objective = await Objective.create({
      name,
      isCompleted: false,
    }) // {name:"estudiar react", isCompleted: false}

    // posteamos el objetivo en los mentees del usuario (mentor)
    const user = await User.findOne({ _id: userId })
    try {
      const idx = user.mentees.findIndex((e) => e._id.toString() === menteeId) // busca el indice donde esta el mentee con id "menteeId"
      console.log("IDX", idx)
      if (idx === -1)
        res.status(403).send({
          error: `User does not have the mentee with id ${menteeId}, please add the mentee before adding an objective`,
        })
      user.mentees[idx].objectives.push(objective) // {name: "nombre del objetivo", isCompleted: false}
      user.save()
    } catch (error) {
      console.log("Error in user //", error)
      res.status(500).send({ error })
    }

    // posteamos el objetivo en los mentors del mentee y le agregamos notificacion
    const mentee = await User.findOne({ _id: menteeId })
    try {
      const idy = mentee.mentors.findIndex((e) => e._id.toString() === userId) // busca el indice donde esta el mentor con id "userId"
      if (idy === -1)
        res.status(403).send({
          error: `Mentee does not have the mentor with id ${userId}, please add the him or her a mentor before adding an objective`,
        })
      console.log("soy objective en la 227 de mentees", objective)
      mentee.mentors[idy].objectives.push(objective) // {name: "nombre del objetivo", isCompleted: false}


      const notification = await Notification.create({
        type: "new objective",
        userId: menteeId,
        mentorId: userId,
        mentorName: `${user.firstName} ${user.lastName}`,
        payload: name,
        isActive: true,
      })


      mentee.save()
      res.status(201).send({ objective: mentee.mentors[idy].objectives, notification })
    } catch (error) {
      console.log("Error in mentee //", error)
      res.status(500).send({ error })
    }

  } catch (error) {
    console.log("catch err", error)
    return res.status(500).send(error)
  }
}

// router.post("/:userId/mentees/:menteeId/meetings", postMeeting)
const postMeeting = async (req, res) => {
  const { userId, menteeId } = req.params
  const { text, link } = req.body
  const date = new Date(req.body.date)
  const newMeeting = { text, date, link }
  try {
    // agregamos la reunion en el usuario (mentor)
    const user = await User.findOne({ _id: userId })
    const idx = user.mentees.findIndex((e) => e._id.toString() === menteeId)
    if (idx === -1) return res.status(403).send("No user by that id found")
    user.mentees[idx].meetings.push(newMeeting)
    await user.save()
    console.log(user)

    // agregamos la reunion en el mentor también y luego la notificacion
    const mentee = await User.findOne({ _id: menteeId })
    const idy = mentee.mentors.findIndex((e) => e._id.toString() === userId)
    if (idy === -1) return res.status(403).send("No mentor by that id found")
    mentee.mentors[idy].meetings.push(newMeeting)

    const notification = await Notification.create({
      type: "new meeting",
      userId: menteeId,
      mentorId: userId,
      mentorName: `${user.firstName} ${user.lastName}`,
      payload: date,
      isActive: true,
    })

    mentee.save()

    return res.status(200).send({ meeting: user.mentees[idx].meetings, notification })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}



module.exports = { matchMentees, mentorToMenteeRequest, postUserMentee, postObjective, postMeeting }

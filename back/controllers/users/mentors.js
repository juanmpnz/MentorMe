/* eslint-disable prettier/prettier */
/* eslint-disable prefer-spread */
const _ = require("lodash")
const User = require("../../models/user")
const Notification = require("../../models/notification")

// router.get("/:userId/mentors/match", matchMentors)
const matchMentors = async (req, res) => {
  try {
    const pageOptions = { page: parseInt(req.query.page, 10) || 0, limit: parseInt(req.query.limit, 10) || 999 }
    const selectedUser = await User.findOne({ _id: req.params.userId }).select("-__v -skills").lean()

    // seleccionamos los skills y keywords a matchear
    const skillsIdsToMatch = selectedUser.skillsToLearn.map((e) => e._id)
    const skillsKeywordsToMatch = _.uniq([].concat.apply([], selectedUser.skillsToLearn.map((e) => e.keywords)))

    // excluimos al usuario mismo y a los mentores que ya tiene y cuya relación esta activa
    const mentorsIds = selectedUser.mentors.filter((e) => e.active).map((e) => e._id)
    const excludedResults = [...mentorsIds, selectedUser._id]

    // query
    const users = await User.aggregate([
      { $unwind: "$skillsToTeach" },
      { $unwind: "$skillsToTeach.keywords" },
      {
        $project: { skillsToLearn: 0 },
      },

      {
        $match: {
          _id: { $nin: excludedResults },
          $or: [
            { "skillsToTeach._id": { $in: skillsIdsToMatch } }, // [id,id,id,id]
            { "skillsToTeach.keywords": { $in: skillsKeywordsToMatch } },
          ],
        },
      },

      {
        $group: {
          _id: {
            userId: "$_id",
            skillId: "$skillsToTeach._id",
          },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          country: { $first: "$country" },
          languages: { $first: "$languages" },
          avatar: { $first: "$avatar" },
          name: { $first: "$skillsToTeach.name" },
          proficiency: { $first: "$skillsToTeach.proficiency" },
          popularity: { $first: "$skillsToTeach.popularity" },
          keywords: { $push: "$skillsToTeach.keywords" },
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

          skillsToTeach: {
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
          skillsToTeach: { $push: "$skillsToTeach" },
          languages: { $first: "$languages" },
          avatar: { $first: "$avatar" },
          skillsCount: { $sum: 1 },
          // proficiencyScore: {$sum: "$skillsToTeach.proficiency"}, TOma de todos los skills, no solo los matcheados
          keywordsScore: { $sum: "$skillsToTeach.matchedKeywordsCount" },
          directMatchScore: {
            $sum: {
              $cond: [{ $in: ["$skillsToTeach._id", skillsIdsToMatch] }, 3, 0], // peso por cada match exacto (3)
            },
          },
        },
      },

      {
        $set: {
          score: { $add: ["$keywordsScore", "$directMatchScore"] },
        },
      },

      {
        $project: {
          skillsToTeach: {
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

// router.post("/:userId/mentors/:mentorId/request, MenteeToMentorRequest)
const menteeToMentorRequest = async (req, res) => {
  const { userId, mentorId } = req.params
  const { firstName, lastName, teachingSkills } = req.body
  console.log(userId, mentorId)

  Notification.create({
    type: "mentee request",
    userId: mentorId,
    menteeId: userId,
    menteeName: `${firstName} ${lastName}`,
    payload: teachingSkills,
    isActive: true,
  })
  res.status(201).send("Request sent to mentor!")
}

// router.post("/:userId/mentors/:mentorId/add", postUserMentor)
const postUserMentor = async (req, res) => {
  console.log("ENTRA A LA RUTA")
  const { userId, mentorId } = req.params
  const { teachingSkills, notificationId } = req.body // ejemplo para mandar por axios: {"learningSkills": [{ "_id": "5fb818a7ae6e9a634901711b", "name": "mongo" }, { "_id": "5fb818a7ae6e9a634901711c", "name": "sequelize" }] }

  try {
    const user = await User.findOne({ _id: userId })
    const mentor = await User.findOne({ _id: mentorId })
    const idx = user.mentors.findIndex((e) => e._id.toString() === mentorId)
    // If the mentor is not in the users's mentors list or the teaching is inactive, we add the mentor to the user.
    if (1 === 1/* idx === -1 || !user.mentors[idx].active */) {
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = mentor
      user.mentors.push({ _id, email, firstName, lastName, country, phoneNumber, languages, avatar, teachingSkills, meetings: [], objectives: [], active: true, })
      user.save()
    } else {
      return res.status(403).send({ error: "user already has an active relationship with mentor!" })
    }

    // If the user is not in the mentor's mentees list or the teaching is inactive, we add user to the mentor.
    const idy = mentor.mentees.findIndex((e) => e._id.toString() === userId)
    if (1 === 1/* idy === -1 || !mentor.mentees[idy].active */) {
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = user
      mentor.mentees.push({ _id, email, firstName, lastName, country, phoneNumber, languages, avatar, teachingSkills, meetings: [], objectives: [], active: true, })
      mentor.save()
    } else {
      return res.status(403).send({ error: "mentor already has an active relationship with user!" })
    }

    await Notification.updateOne({ _id: notificationId }, { isActive: false })

    const notification = await Notification.create({
      type: "mentor request accepted", // EL USUARIO HA ACEPTADO SER EL APRENDIZ DEL MAESTRO
      userId: mentorId,
      menteeId: userId,
      menteeName: `${user.firstName} ${user.lastName}`,
      payload: teachingSkills,
      isActive: true,
    })

    return res.status(201).send({ message: "mentor added succesfully!", notification })
  } catch (error) {
    return res.status(500).send({ error })
  }
}
// router.post("/:userId/mentors/:mentorId/reject", rejectMentorRequest)
const rejectMentorRequest = async (req, res) => {
  const { userId, mentorId } = req.params
  const { firstName, lastName, teachingSkills } = req.body
  const notification = await Notification.create({
    type: "mentor request rejected",
    userId: mentorId,
    menteeId: userId,
    menteeName: `${firstName} ${lastName}`,
    payload: teachingSkills,
    isActive: true,
  })
  res.status(201).send({ message: "Request rejection sent to mentor!", notification })
}


// router.patch("/:userId/mentors/:mentorId/objectives/:objectiveId/changeStatus")
const patchObjectiveStatus = async (req, res) => {
  const { userId, objectiveId, mentorId, objectiveName } = req.params

  try {
    // cambiamos el objetivo en el usuario (mentee)
    const user = await User.findOne({ _id: userId })
    const idx = user.mentors.findIndex((e) => e._id.toString() === mentorId)
    if (idx === -1) return res.status(403).send("No user by that id found")
    const idy = user.mentors[idx].objectives.findIndex((e) => e._id.toString() === objectiveId)
    if (idy === -1) return res.status(403).send("No objective by that id found")
    // cambiamos el valor de true a false o de false a true
    user.mentors[idx].objectives[idy].isCompleted = !user.mentors[idx].objectives[idy].isCompleted

    // cambiamos el objetivo en el mentor tambien
    const mentor = await User.findOne({ _id: mentorId })
    const idz = mentor.mentees.findIndex((e) => e._id.toString() === userId)
    if (idz === -1) return res.status(403).send("No mentor by that id found")
    const idw = mentor.mentees[idz].objectives.findIndex((e) => e._id.toString() === objectiveId)
    if (idw === -1) return res.status(403).send("No objective by that id found in mentor's mentees")
    mentor.mentees[idz].objectives[idw].isCompleted = !mentor.mentees[idz].objectives[idw].isCompleted

    Promise.all([user.save(), mentor.save()])

    const notification = await Notification.create({
      type: "completed objective",
      userId: mentorId,
      menteeId: userId,
      menteeName: `${user.firstName} ${user.lastName}`,
      payload: objectiveName,
      isActive: true,
    })

    return res.status(200).send({ objective: user.mentors[idx].objectives[idy], notification })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const getObjectives = async (req, res) => {
  try {
    const { userId, mentorId } = req.params
    const user = await User.findOne({ _id: userId })
    const chosenMentor = user.mentors.find((e) => e._id.toString() === mentorId)
    return res.status(200).send(chosenMentor.objectives)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}



module.exports = { getObjectives, matchMentors, menteeToMentorRequest, rejectMentorRequest, postUserMentor, patchObjectiveStatus }

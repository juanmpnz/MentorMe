/* eslint-disable no-param-reassign */
const _ = require("lodash")
const User = require("../../models/user")

const getUsers = (req, res) => {
  if (!_.isEmpty(req.query)) {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    }
    User.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err))
  } else {
    User.find({})
      .lean()
      .then((data) => res.status(200).send(data))
      .catch((err) => console.log(err))
  }
}

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-_id -__v")
    .then((data) => res.status(200).send({...data._doc,_id:req.params.userId}))
    .catch((err) => console.log(err))
}

const uploadAvatar = (req, res, next) => {
  const _id = req.params.userId
  const url = `${req.protocol}://${req.get("host")}`
  User.findOne({ _id })
    .select("-__v")
    .then((user) => {
      user.avatar = `${url}/images/${req.file.filename}`
      return user
    })
    .then((user) => user.save())
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send({ error }))
}

// PUT
const putSkillsToTeach = (req, res) => {
  const _id = req.params.userId
  User.findOne({ _id })
    .then((user) => {
      user.skillsToTeach = req.body
      user.save()
      res.status(201).send(user.skillsToTeach)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error })
    })
}

const putSkillsToLearn = (req, res) => {
  const _id = req.params.userId
  User.findOne({ _id })
    .then((user) => {
      user.skillsToLearn = req.body
      user.save()
      res.status(201).send(user.skillsToLearn)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error })
    })
}

const putUser = async (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber
      user.save()
      res.status(201).send(user)
    })

    .catch((e) => {
      res.status(500).send({ e })
    })
}

module.exports = { getUsers, getUser, uploadAvatar, putSkillsToLearn, putSkillsToTeach, putUser }

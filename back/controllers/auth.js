// eslint-disable-next-line import/no-unresolved
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const register = (req, res) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({ ...req.body, password: hash })
    user
      .save()
      .then(() => res.status(201).send({ message: "User added successfully!" }))
      .catch((error) => res.status(500).send({ error }))
  })
}

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).send({ error: new Error("User not found!") })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) return res.status(401).send({ error: new Error("Incorrect password!") })
          const token = jwt.sign({ userId: user._id }, "superfluous-cat&ultra-dog", { expiresIn: "24h" })
          res.status(200).send({ user, token })
        })
        .catch((error) => res.status(500).send({ error }))
    })
    .catch((error) => res.status(500).send({ error }))
}

const me = (req, res) => {
  User.findOne({ _id: req.userId }).then((user) => {
    console.log("user a enviar", user)
    if (!user) {
      return res.status(401).send({ error: new Error("User not found!") })
    }
    res.status(200).send(user)
  })
}

module.exports = { register, login, me }

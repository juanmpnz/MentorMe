const { Skill } = require("../models/skill")

const getSkill = (req, res) => {
  const _id = req.params.skillId
  Skill.findOne({ _id })
    .select("-_id -__v")
    .lean()
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => console.log(err))
}

module.exports = { getSkill }

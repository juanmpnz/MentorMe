// const User = require("../models/user")
const express = require("express")
const _ = require("lodash")
const { Skill } = require("../models/skill")
const { getSkill } = require("../controllers/skills")

const router = express.Router()

router.get("/:skillId", getSkill)

router.get("/", (req, res) => {
  if (!_.isEmpty(req.query)) {
    const pageOptions = {
      sortBy: req.query.sortBy || "popularity",
      sortOrder: req.query.sortOrder === "desc" ? -1 : 1,
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    }

    Skill.find()
      .lean()
      .select("-__v")
      .sort({ [pageOptions.sortBy]: pageOptions.sortOrder })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err))
  } else {
    Skill.find()
      .lean()
      .select("-__v")
      .sort({ name: 1 })
      .then((data) => res.status(200).send(data))
      .catch((err) => console.log(err))
  }
})

module.exports = router

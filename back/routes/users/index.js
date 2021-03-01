/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const express = require("express")
const notificationsRouter = require("./notifications")
const mentorsRouter = require("./mentors")
const menteesRouter = require("./mentees")
const { getUsers, getUser, uploadAvatar, putSkillsToTeach, putSkillsToLearn,putUser } = require("../../controllers/users")

const router = express.Router()
const { auth } = require("../../middleware/auth")
const multer = require("../../middleware/multer-config")

router.use("/:userId/notifications", notificationsRouter)
router.use("/:userId/mentors", mentorsRouter)
router.use("/:userId/mentees", menteesRouter)

router.post("/:userId/uploadAvatar", multer, uploadAvatar)
router.put("/:userId/putSkillsToTeach", putSkillsToTeach)
router.put("/:userId/putSkillsToLearn", putSkillsToLearn)
router.get("/:userId", getUser)
router.put("/:userId", putUser )
router.get("/", getUsers)

module.exports = router





// MEETINGS

// USER MENTEES




// USER MENTORS


// router.get("/:userId/mentors", getUserMentors)

// USER



/*
/* fetch all users *
GET /users

/* fetch specific user *
GET /users/:userId

/* create new user *
POST /users

/* edit specific user
PUT /users/:userId

delete specific user
DELETE /users/:userId

convenciones de rutas
https://restfulapi.net/resource-naming/
*/

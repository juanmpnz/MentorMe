const express = require("express")
const {
  matchMentees,
  postUserMentee,
  mentorToMenteeRequest,
  postObjective,
  postMeeting,

} = require("../../controllers/users/mentees")

const router = express.Router({ mergeParams: true })

router.get("/match", matchMentees)
router.post("/:menteeId", postUserMentee)
router.post("/:menteeId/meetings", postMeeting)
router.post("/:menteeId/objectives", postObjective)

router.post("/:menteeId/request", mentorToMenteeRequest)

module.exports = router

const express = require("express")
const {
  matchMentors,
  postUserMentor,
  rejectMentorRequest,
  patchObjectiveStatus,
  menteeToMentorRequest,
  getObjectives
} = require("../../controllers/users/mentors")

const router = express.Router({ mergeParams: true })

router.post("/:mentorId/request", menteeToMentorRequest)
router.post("/:mentorId/reject", rejectMentorRequest)
router.post("/:mentorId", postUserMentor)
// match
router.get("/match", matchMentors)
// objectives
router.patch("/:mentorId/objectives/:objectiveId/changeStatus", patchObjectiveStatus)
//get
router.get("/:mentorId/objectives", getObjectives)
module.exports = router

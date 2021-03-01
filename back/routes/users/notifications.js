const express = require("express")
const { getNotifications, patchNotificationStatus } = require("../../controllers/users/notifications")

const router = express.Router({ mergeParams: true })

router.patch("/:notificationId/status", patchNotificationStatus)
router.get("/", getNotifications)

module.exports = router

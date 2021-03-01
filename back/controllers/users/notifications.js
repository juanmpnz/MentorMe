const Notification = require("../../models/notification")

const getNotifications = (req, res) => {
  console.log("ENTRO A GET NOTIFICATIONS")
  const userId = req.params.userId
  Notification.find({ userId, isActive: true })
    .lean()
    .sort([["_id", -1]])
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err))
}

// router.patch("/:userId/notifications/:notificationId/status", patchNotificationStatus)
const patchNotificationStatus = (req, res) => {
  Notification.update({ _id: req.params.notificationId }, { isActive: false })
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err))
}

module.exports = { getNotifications, patchNotificationStatus }

const mongoose = require("mongoose")

const { Schema } = mongoose

const notificationSchema = new Schema({
  type: { type: String }, // notifications types : mentorship request, menteeship request, meeting, objective,
  userId: { type: Schema.Types.ObjectId },
  mentorId: { type: Schema.Types.ObjectId },
  mentorName: { type: String },
  menteeId: { type: Schema.Types.ObjectId },
  menteeName: { type: String },
  payload: [],
  isActive: { type: Boolean }, // true
  timestamp: {
    type: Date,
    default: () => {
      return new Date()
    },
  },
})

module.exports = mongoose.model("Notification", notificationSchema)

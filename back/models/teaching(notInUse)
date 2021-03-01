const mongoose = require("mongoose")

const { Schema } = mongoose

const teachingSchema = new Schema({
  menteeId: { type: Schema.Types.ObjectId },
  menteeFirstName: { type: String, required: true },
  mentorId: { type: Schema.Types.ObjectId },
  email: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String },
  languages: [
    { type: String, enum: ["spanish", "portuguese", "english", "french", "german", "italian"], default: "spanish" },
  ],
  avatar: { type: String },

  // Relationship details
  learningSkills: [{ _id: { type: Schema.Types.ObjectId }, name: { type: String } }],
  meetings: [],
  objectives: [{ isCompleted: { type: String }, name: { type: Boolean } }],
  active: { type: Boolean, default: true },
})

// module.exports = mongoose.model("Teaching", teachingSchema)

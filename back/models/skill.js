const mongoose = require("mongoose")

const { Schema } = mongoose

const skillSchema = new Schema({
  name: { type: String, required: true },
  keywords: { type: [String] },
  popularity: {
    type: Number,
    min: 1, // low popularity
    max: 5, // high popularity
    default: 3, // medium popularity
  },
})

const Skill = mongoose.model("Skill", skillSchema)

module.exports = { Skill, skillSchema }

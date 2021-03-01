const mongoose = require("mongoose")

const { Schema } = mongoose

const objectiveSchema = new Schema({
  name: { type: String },
  isCompleted: { type: Boolean },
})

module.exports = mongoose.model("Objective", objectiveSchema)

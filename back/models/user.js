const mongoose = require("mongoose")

const { Schema } = mongoose
const uniqueValidator = require("mongoose-unique-validator")

const userSkillsSchema = new Schema({
  name: { type: String, required: true },
  keywords: { type: [String] },
  proficiency: { type: Number, min: 1, max: 5, default: 1 },
  popularity: {
    type: Number,
    min: 1, // low popularity
    max: 5, // high popularity
    default: 3, // medium popularity
  },
})

const userMenteeMentor = new Schema({
  _id: { type: Schema.Types.ObjectId },
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
  teachingSkills: [{ _id: { type: Schema.Types.ObjectId }, name: { type: String } }],
  meetings: [{ text: { type: String }, date: { type: Date }, link: { type: String } }], // se te avisa una nueva meeting
  objectives: [{ _id: { type: Schema.Types.ObjectId }, name: { type: String }, isCompleted: { type: Boolean } }], // tienes un nuevo objetivo
  active: { type: Boolean }, // se te avisa que el mentor/mentee dio por concluida la relacion
  // avance, reuniones, fecha, notificacion
  /*
    Seteo de reunión (con notificación). 
    Seteo de objetivos
    Seguimiento (notas)

  */
})

const userSchema = new Schema({
  email: { type: String, required: [true, "User email required"], unique: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true, default: "Argentina" },
  phoneNumber: { type: String },
  languages: [
    { type: String, enum: ["spanish", "portuguese", "english", "french", "german", "italian"], default: "spanish" },
  ],
  avatar: { type: String },
  skills: [{ type: userSkillsSchema, default: [] }],
  skillsToLearn: [{ type: userSkillsSchema, default: [] }],
  skillsToTeach: [{ type: userSkillsSchema, default: [] }],
  mentors: [{ type: userMenteeMentor, default: [] }],
  mentees: [{ type: userMenteeMentor, default: [] }],
  isAdmin: { type: Boolean, required: true, default: false },
})

// skillsToLearn: [{type: Schema.Types.ObjectId, ref: "Skill"}],
// skillsToTeach: [{type: Schema.Types.ObjectId, ref: "Skill"}],
// mentors: [{type: Schema.Types.ObjectId, ref: "User"}],
// mentees: [{type: Schema.Types.ObjectId, ref: "User"}],

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", userSchema)

//
/* PARA POPULAR CON CAMPOS EXTRA
const ListSchema = mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  items: [{
      type: mongoose.Schema.Types.Mixed, ref: 'Item', quantity: 'String'
  }],
});
*/

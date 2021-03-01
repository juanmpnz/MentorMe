// const chalk = require("chalk")
const mongoose = require("mongoose").set("debug", true)
// quitar .set una vez en produccion
mongoose
  .connect("mongodb://127.0.0.1:27017/mentorme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err))
mongoose.set("useCreateIndex", true)
// const db = mongoose.connection
// db.on("error", console.error.bind(console, chalk.red("connection error:")));
// db.once("open", () => console.log(chalk.magenta("Database connected")));

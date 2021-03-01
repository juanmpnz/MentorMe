require("./config/index")
const express = require("express")
const path = require("path")
const volleyball = require("volleyball")
const bodyParser = require("body-parser")
const routes = require("./routes")

const app = express()

app.use(volleyball)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/images", express.static(path.join(__dirname, "images")))
// Routes
app.use("/api", routes)

app.listen(8000, () => console.log("SERVER LISTENING AT PORT 8000"))

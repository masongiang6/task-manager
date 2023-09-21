const express = require("express")
const app = express()
const user = require("./routes/users")
const tasks = require("./routes/tasks")
const mongoose = require("mongoose")
require("dotenv").config()
const authenticateToken = require("./middleware/authenticate-token")
const cors = require("cors")
const path = require("path")

app.use(cors())
app.use(express.json())

app.use("/user", user)

app.use("/api/tasks", authenticateToken, tasks)

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected...")
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./client", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT }...`)
})

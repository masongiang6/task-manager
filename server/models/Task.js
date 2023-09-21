const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        trim: true
    },
    task: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Task", TaskSchema)
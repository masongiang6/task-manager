const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({email: req.user.email})
        return res.status(200).json(tasks)
    } catch(error) {
        return res.status(500).send("Something went wrong.")
    }
}

const getSingleTask = async (req, res) => {
    const {id} = req.params
    try {
        const task = await Task.findOne({email: req.user.email, _id: id})
        if(!task){
            return res.status(404).json({message: "No task found with that id."})
        }
        return res.status(200).json(task)
    } catch(error){
        return res.status(500).send("Something went wrong.")
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create({email: req.user.email, task: req.body.task})
        return res.status(201).json(task)
    } catch(error) {
        return res.status(500).send("Something went wrong.")
    }
}

const updateTask = async (req, res) => {
    const {id} = req.params
    try {
        const task = await Task.findOneAndUpdate({email: req.user.email, _id: id}, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).json({message: "No task found with that id."})
        }
        return res.status(200).json(task)
    } catch(error){
        return res.status(500).send("Something went wrong.")
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params
    try{
        const task = await Task.findOneAndDelete({email: req.user.email, _id: id})
        if(!task){
            return res.status(404).json({message: "No task found with that id."})
        }
        return res.status(200).json(task)
    } catch(error){
        return res.status(500).send("Something went wrong.")
    }
}

module.exports = {getAllTasks, getSingleTask, createTask, updateTask, deleteTask}
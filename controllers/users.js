const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")
require("dotenv").config({path: path.resolve(__dirname, "../.env")})

const login = async (req, res) => {
    email = req.body.email
    password = req.body.password
    
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(401).json({login: false, message: "No account exists with this email."})
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(401).json({login: false, message: "You entered an incorrect password."})
    }
        
    const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN, {expiresIn: "1800s"})
    return res.status(200).json({login: true, message: "You are now logged in!", accessToken: accessToken})
}

const register = async (req, res) => {
    const email = req.body.email.trim()
    const password = req.body.password

    if(!(email && password)){
        return res.status(400).json({registered: false, message: "Please enter an email and password."})
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.password, salt())
        const user = await User.create({email: email, password: hashPassword})
        return res.status(201).json({registered: true, message: "You are now registered!"})
    } catch(error) {
        return res.status(409).json({registered: false, message: "An account already exists with this email."})
    }
}

module.exports = {login, register}
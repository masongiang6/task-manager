import React from "react"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"

export default function Register() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [registerSuccess, setRegisterSuccess] = React.useState(false)
    const [registerStatusMessage, setRegisterStatusMessage] = React.useState("")

    function register() {
        axios.post("/user/register",
        {
            email: email,
            password: password
        }).then((response) => {
            setRegisterSuccess(true)
            localStorage.removeItem("token")
        }).catch((error) => {
            setRegisterSuccess(false)
            setRegisterStatusMessage(error.response.data.message)
        })
    }

    return (
        <div className="content-wrapper">
            {
                registerSuccess && (
                    <Navigate to="/login"/>
                )
            }
            <h1 className="page--title">Register</h1>
            <input 
                className="login-register--input"
                type="text" 
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                placeholder="Email address"
            />
            <input 
                className="login-register--input"
                type="password" 
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                placeholder="Password"
            />
            <button className="login-register--button" onClick={register}>Register</button>
            <h4 className="login-register--message">{registerStatusMessage}</h4>
            <Link to="/login">Already have an account? Login.</Link>
        </div>
    );
}
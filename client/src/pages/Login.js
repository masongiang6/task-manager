import React from "react"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [loginStatusMessage, setLoginStatusMessage] = React.useState("")

    function login() {
        axios.post("/user/login",
        {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("token", response.data.accessToken)
            setLoggedIn(true)
        }).catch((error) => {
            setLoggedIn(false)
            setLoginStatusMessage(error.response.data.message)
        })
    }

    return (
        <div className="content-wrapper">
            {
                loggedIn && (
                    <Navigate to="/dashboard"/>
                )
            }
            <h1 className="page--title">Login</h1>
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
            <button className="login-register--button" onClick={login}>Login</button>
            <h4 className="login-register--message">{loginStatusMessage}</h4>
            <Link to="/register">Don't have an account? Sign up.</Link>
        </div>
    );
}
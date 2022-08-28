import {Link} from "react-router-dom"

export default function Home() {
    return (
        <div className="content-wrapper">
            <h1 className="page--title">Task Manager</h1>
            <div className="home--buttonwrapper">
                <Link to="/login"><button className="home--button">Login</button></Link>
                <Link to="/register"><button className="home--button">Register</button></Link>
            </div>
        </div>
    );
}
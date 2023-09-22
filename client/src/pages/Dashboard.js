import React from "react"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"
import Task from "../components/Task"

export default function Dashboard() {

    const [sessionActive, setSessionActive] = React.useState(true)

    const [tasks, setTasks] = React.useState([])

    const [newTask, setNewTask] = React.useState("")

    React.useEffect(() => {
        axios.get("https://task-manager-backend-8ui7.onrender.com/api/tasks", {
            headers: {
                "Authorization": `Basic ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setTasks(response.data)
            setSessionActive(true)
        }).catch((error) => {
            setSessionActive(false)
        })
        
    }, [])

    function createTask() {

        if(!newTask){
            return
        }

        axios.post("https://task-manager-backend-8ui7.onrender.com/api/tasks", {task: newTask}, {
            headers: {
                "Authorization": `Basic ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setTasks((prevState => {
                return [...prevState, response.data]
            }))
            setNewTask("")
        }).catch((error) => {
            setSessionActive(false)
        })
    }

    function deleteTask(id) {
        axios.delete(`https://task-manager-backend-8ui7.onrender.com/api/tasks/${id}`, {
            headers: {
                "Authorization": `Basic ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setTasks((prevState => {
                return prevState.filter(task => String(task._id) !== id)
            }))
        }).catch((error) => {
            setSessionActive(false)
        })
    }

    function logout() {
        localStorage.removeItem("token")
    }

    function handleSubmit(e){
        e.preventDefault()
        createTask()
        e.target.reset()
    }

    const taskElement = tasks.map(task => <Task key={task._id} id={task._id} task={task.task} deleteTask={deleteTask}/>)

    return (
        <div className="content-wrapper">
            {
                !sessionActive && (
                    <Navigate to="/login"/>
                )
            }
            <Link to="/login"><button className="logout-button"onClick={logout}>Logout</button></Link>
            <h1 className="page--title">Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div className="new-task-form">
                    <input 
                        className="new-task-input"
                        type="text" 
                        placeholder="eg. walk the dog"
                        onChange={(e) => {
                            setNewTask(e.target.value)
                            console.log(newTask)
                        }}
                    />
                    <button className="new-task-button"type="submit">Create Task</button>
                </div>
            </form>
            {taskElement}
            {
                tasks.length === 0 && <h4 className="no-task-message">You currently do not have any tasks.</h4>
            }
        </div>
    );
}
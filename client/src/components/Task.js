import Delete from "../images/delete.png"

export default function Task({id, task, deleteTask}) {
    return (
        <div className="task-wrapper">
            <h4 className="task-text">{task}</h4>
            <img 
                alt="delete button"
                className="delete-button"
                onClick={() => {
                    deleteTask(String(id))
                }} 
                src={Delete}
            />
        </div>
    );
}
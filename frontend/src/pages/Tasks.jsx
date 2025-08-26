import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks(){

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    // Fetches list of tasks from the backend on component mount
    useEffect(() => {
        fetch("/api/tasks").then(res => res.json())
        .then((data) => { setTasks(data)})
        .catch((error) => console.error("Failed fetching tasks", error));
    }, []);
    // Toggles completion state of selected task
    const handleToggleComplete = () => {
        if (selectedTaskId === null) return;

        const taskToUpdate = tasks.find((task) => task.id === selectedTaskId);
        if(!taskToUpdate) return;

        const updatedTask = {
            ...taskToUpdate,
            completed: !taskToUpdate.completed
        };

        fetch(`/api/tasks/${selectedTaskId}`, { method: "PUT", headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedTask)
        }).then((response) => {if(!response.ok) {throw new Error("Failed to update task");

        } return response.json();
        }).then((data) => {console.log("Updated Task: ", data);
            setTasks((prevTasks) => prevTasks.map((task) =>
            task.id === selectedTaskId ? data : task));
        }).catch((error) => console.error("Failed to update task", error));
       
    };
    // Deletes a selected task
    const handleDelete = () => {
        if(selectedTaskId === null) return;

        const taskToDelete = tasks.find(task => task.id === selectedTaskId);
        if(!taskToDelete) return;

        fetch(`/api/tasks/${selectedTaskId}`, {method: "DELETE", headers: {"Content-Type": "application/json"},
        }).then((response) => {
            if(!response.ok){
                throw new Error("Failed to delete task.");
            }
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId)
            );
            setSelectedTaskId(null);
        }).catch((err) => {console.error("Error while deleting task: ", err);

        });
    }

    return(
        <div className="container d-flex flex-column align-items-center">
         <div className="container-fluid d-flex flex-column">
            {/* Header */}
            <h6 className="mx-3 mt-3 text-center">Your tasks:</h6>
                {/* Separator line */}
            <div style={{borderBottom: "1px solid rgba(255,255,255,0.3)",width: "69vw",margin: "5px auto"}} />
            <div className="flex-grow-1 overflow-auto px-3" style={{ maxHeight: "50vh", width: "100%" }}>
                    {/* List of tasks */}
                    <ul className="list-group mt-1 small mb-2">
                        {[...tasks].sort((a, b) => b.id - a.id).map((task) => (<li key={task.id} className={
                        `list-group-item bg-black text-white border-0
                        ${task.completed ? "text-decoration-line-through" : ""}`} 
                        style={{
                            wordBreak: "break-word", whiteSpace: "normal", 
                            cursor: "pointer", transform: `${selectedTaskId === task.id ? "scale(1.05)" : "none"}` }}
                        onClick={() => setSelectedTaskId(task.id)}>
                        <strong>{task.title}</strong>: {task.text}</li>
                        ))}
                    </ul>
            </div>
            {/* Separator line */}
            <div className="mt-3" style={{borderBottom: "1px solid rgba(255,255,255,0.3)",width: "69vw",margin: "5px auto"}} />
            {/* Navigation buttons */}
            <div className="row row-cols-1 row-cols-md-3 g-2 mt-3 mx-2">
                <div className="col">
                {/* Navigates to Edit page to edit a selected task */}
                <button className="btn btn-secondary btn-sm d-block mx-auto w-75" onClick={ () => {navigate(`edit/${selectedTaskId}`)}
                  }  disabled={selectedTaskId === null}>Edit</button>
                </div>
                <div className="col">
                <button className="btn btn-primary btn-sm d-block mx-auto w-75" onClick={handleToggleComplete}>Done / Undone</button>
                </div>
                <div className="col">
                <button className="btn btn-danger btn-sm d-block mx-auto w-75" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="col mt-4">
                <button className="btn btn-success btn-sm d-block mx-auto w-75" onClick={() => navigate("/new")}>Add new</button>
            </div>
         </div>   
        </div>  
    );
}

export default Tasks;
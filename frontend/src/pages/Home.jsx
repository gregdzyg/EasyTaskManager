import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Home(){

    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [tasks, setTasks] = useState([]);
    // Fetches a quote from an external API on component mount
    useEffect(() => {
        fetch("https://api.quotable.io/random").then(res => res.json()
        .then(data => {
            setQuote(data.content);
            setAuthor(data.author);
        }
        )).catch((err) => {console.error("Error fetching quote", err)});
    }, []);
    // Fetches tasks from the backend, reverses the list and selects the latest 5
    useEffect(() => {
        fetch("/tasks").then(res => res.json()
        .then(data => {
            const latestTasks = [...data].reverse().slice(0, 5);
            setTasks(latestTasks);
        }
        )).catch((err) => console.error("Failed fetching tasks", err));
    }, []);

    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            {/* Header */}
            <h5>Welcome to our task manager.</h5>
            <h6 className="mt-3">Here's your today's quote:</h6>
            {/* Blockquote with fetched quote*/}
            <blockquote className="blockquote mt-2 bg-black text-white shadow-sm w-75 px-3" 
            style={{maxWidth: "768px", fontSize: "0.9rem"}}>
                <p>{quote}</p>
                <footer className="blockquote-footer">{author}</footer>
            </blockquote>
            {/* Separator */}
            <div
                style={{
                 borderBottom: "1px solid rgba(255,255,255,0.3)",
                width: "69vw",
                margin: "5px auto 0 auto"
                }}
            ></div>
            {/* List of recent tasks */}
            <div className="d-flex flex-column mt-3  w-100 justify-content-center align-items-center">
            <h6>Recent tasks:</h6>
            <ul className="list-group mt-1 small px-3" style={{maxWidth: "768px", width: "90%"}}>
                {tasks.map((task) => (<li key={task.id} className="list-group-item bg-black text-white border-0">
                    <strong>{task.title}</strong>: {task.text}
                </li>))}
            </ul>
            </div>
            {/* Separator */}
            <div style={{
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                width: "69vw",
                margin: "5px auto 0 auto"
            }}
            ></div>
            {/* Navigation buttons */}
            <div className="d-flex flex-column w-100 justify-content-center align-items-center mt-4">
                {/*navigate to "/tasks" to see list of all tasks*/}
                <Button variant="secondary" className="mt-4 w-50" onClick={() => navigate("/tasks")}>All Tasks</Button>
                {/*navigate to "/new" to add a new task*/}
                <Button variant="success" className="mt-4 w-50" onClick={() => navigate("/new")}>New Task</Button>
             
            </div>        
        </div>
    );
}

export default Home;
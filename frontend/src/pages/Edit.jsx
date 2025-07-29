import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Edit() {
    
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams(); // Task ID from the route

    //Fetches the task data when component mounts
    useEffect(() => {
        fetch(`/tasks/${id}`).then(res => {
            if(!res.ok) {
                throw new Error("Failed fetching a task");
            }
            return res.json();
        }).then(data => {
            setTitle(data.title);
            setDescription(data.text);
        }).catch(err => {console.error("Failed fetching a task", err);
        });
    }, [id]);
    
    // Handles form submission to save updated task
    const handleSubmit = (e) => {
        e.preventDefault();

        if(title.trim() === "" || description.trim() === "") {
            alert("Please fill both fields.");
            return;
        }

        fetch(`/tasks/${id}`, {method: "PUT", headers: {"Content-Type": "application/json"},
             body: JSON.stringify({
                title: title,
                text: description,
                }),
            }).then((response) => {
                if (!response.ok) {
                throw new Error("Something went wrong");
                }
             return response.json();
            }).then((data) => {console.log("Task edited:", data);
                navigate("/tasks");
            }).catch((error) => console.error("Error", error)
        );
    }

    return (
        <div className="container-fluid d-flex flex-column bg-black text-white">
            {/* Header */}
            <h5 className="mx-3 mt-5 text-center">Edit Task</h5>
            {/* Separator */}
            <div
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    width: "69vw",
                    margin: "5px auto"
                }}
            />

            {/* Form section */}
            <div className="flex-grow-1 d-flex justify-content-center align-items-center mt-5">
                <Form className="w-75" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTaskTitle">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            className="bg-dark text-white border-0"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTaskDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder="Enter description"
                            className="bg-dark text-white border-0"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    {/* Botton for saving changes */}
                    <Button variant="success" type="submit" className="w-100 mt-5 mb-5">
                        Save
                    </Button>
                </Form>
            </div>

            {/* Bottom separator */}
            <div
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    width: "69vw",
                    margin: "5px auto"
                }}
            />
        </div>
    );
}

export default Edit;
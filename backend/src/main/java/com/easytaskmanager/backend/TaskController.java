package com.easytaskmanager.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@CrossOrigin(origins = "http://localhost:5173")
// REST controller - main backend class containing classes and methods needed for processing data
@RestController
public class TaskController {

    private final ArrayList<Task> tasks = new ArrayList<>();
    //constructor that loads data from a local .json file
    public TaskController(){

        loadTasksFromFile();
    }
    // GET method that returns the list of all tasks
    @GetMapping("/tasks")
    public ArrayList<Task> getTasks(){
        return tasks;
    }
    //method GET serving a single task by ID
    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable int id){
        return tasks.stream().filter(task -> task.getId() == id)
                .findFirst().orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Task not found"
                ));
    }
    //method POST for creating tasks
    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task){
        //generating a new ID based on the highest current one
        int newID = tasks.stream().mapToInt(Task::getId).max().orElse(0) +1;
        task.setID(newID);
        tasks.add(task);
        saveTasksToFile();
        return task;

    }
    //method DELETE for deleting tasks by id
    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable int id){

        boolean removed = tasks.removeIf(task -> task.getId() == id);
        saveTasksToFile();
        if(!removed) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }
    }
    //method PUT for updating an existing task based on its ID
    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable int id, @RequestBody Task updatedTask){

        for (Task task : tasks) {
            if (task.getId() == id) {
                task.setTitle(updatedTask.getTitle());
                task.setText(updatedTask.getText());
                task.setCompleted(updatedTask.isCompleted());
                saveTasksToFile();
                return task;
            }

        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
    }
    //reads from a .json file
    public void loadTasksFromFile(){
        ObjectMapper mapper = new ObjectMapper();
        try{
            File file  = new File("tasks.json");
            if(file.exists()){
                Task[] taskArray = mapper.readValue(file, Task[].class);
                tasks.clear();
                tasks.addAll(Arrays.asList(taskArray));

            }
        }catch(IOException e){
            throw new RuntimeException("Failed to load tasks from file", e);
        }
    }

    //saves backend data to a .json file
    public void saveTasksToFile(){
        ObjectMapper mapper = new ObjectMapper();
        try{
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File("tasks.json"), tasks);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save tasks to file", e);
        }
    }
}

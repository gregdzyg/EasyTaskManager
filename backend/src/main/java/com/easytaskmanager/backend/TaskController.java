package com.easytaskmanager.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;


// REST controller - main backend class containing classes and methods needed for processing data
@RestController
@RequestMapping("/api")
public class TaskController  {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/quote")
    public ResponseEntity<String> getQuote() {
        String url = "https://zenquotes.io/api/random";

        RestTemplate restTemplate = new RestTemplate();
        try{
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response);

        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("{\"error\":\"Failed to fetch quote\"}");
        }
    }

    // GET method that returns the list of all tasks
    @GetMapping("/tasks")
    public List<Task> getTasks(){
        return taskRepository.findAll();
    }
    //method GET serving a single task by ID
    @GetMapping("tasks/{id}")
    public Task getTaskById(@PathVariable Integer id){
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    //method POST for creating tasks
    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task){
        task.setId(null);
        return taskRepository.save(task);

    }
    //method DELETE for deleting tasks by id
    @DeleteMapping("tasks/{id}")
    public void deleteTask(@PathVariable Integer id){

       if(!taskRepository.existsById(id)) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
       }
       taskRepository.deleteById(id);

    }

    @PutMapping("tasks/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task updatedTask){

       Task existing = taskRepository.findById(id)
               .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

       existing.setTitle((updatedTask.getTitle()));
       existing.setText((updatedTask.getText()));
       existing.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(existing);

    }
}

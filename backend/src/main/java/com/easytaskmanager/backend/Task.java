package com.easytaskmanager.backend;

public class Task {

    private int id;
    private String title;
    private boolean completed;
    private String text;
    //represents a single task
    public Task( String title, String text){

        this.title = title;
        this.completed = false;
        this.text = text;
    }
    public Task(){}

    public int getId() {
        return id;
    }
    public void setID(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public boolean isCompleted() {
        return completed;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}

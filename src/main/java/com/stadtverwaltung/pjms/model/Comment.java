package com.stadtverwaltung.pjms.model;

public class Comment {
    public String commentID;
    public String content;
    public Employee employee = new Employee();
    public Report report = new Report();
    public String timestamp;
}

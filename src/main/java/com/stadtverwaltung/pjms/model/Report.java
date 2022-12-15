package com.stadtverwaltung.pjms.model;

public class Report {

    public String reportID;
    public double latitude;
    public double longitude;
    public String kindOfReport;
    public String pictureID;
    public String description;
    public String status;
    public String comment;
    public Citizen citizen = new Citizen();
    public Employee employee = new Employee();

    public Report() {}
}

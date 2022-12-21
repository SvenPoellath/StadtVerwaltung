package com.stadtverwaltung.pjms.model;

/**
 * Represents a report submitted by a citizen, combines citizen and employee model
 */
public class Report {
    /**
     * Unique ID of report, generated from persistence
     */
    public String reportID;
    /**
     * Latitude of submitted report
     */
    public double latitude;
    /**
     * Longitude of submitted report
     */
    public double longitude;
    /**
     * Type of report, example given: "Schaden", "Verunreinigung", etc.
     */
    public String kindOfReport;
    /**
     * ID of picture if picture was uploaded by citizen
     */
    public String pictureID;
    /**
     * Description given by citizen
     */
    public String description;
    /**
     * Status of report, example given: "Unbearbeitet", "In Bearbeitung"
     */
    public String status;
    /**
     * Comment if comment was added by emplyoee
     */
    public String comment;
    /**
     * Citizen who submitted the report
     */
    public Citizen citizen = new Citizen();
    /**
     * Employee who assigned the report to himself
     */
    public Employee employee = new Employee();

    /**
     * Default constructor
     */
    public Report() {}
}

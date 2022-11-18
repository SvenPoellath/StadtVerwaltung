package com.stadtverwaltung.pjms.model;

public class Session {
    public String employeeID;
    public String sessionID;

    public Session(String employeeID, String sessionID) {
        this.employeeID = employeeID;
        this.sessionID = sessionID;
    }
}

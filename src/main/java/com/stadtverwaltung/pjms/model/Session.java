package com.stadtverwaltung.pjms.model;

/**
 * Represents an active session with an authenticated user
 */
public class Session {
    /**
     * id of employee authorized
     */
    public String employeeID;
    /**
     * sessionID for authorization handling
     */
    public String sessionID;

    /**
     * Constructor to instantiate session
     * @param employeeID ID of logged in employee
     * @param sessionID Session ID for cookie
     */
    public Session(String employeeID, String sessionID) {
        this.employeeID = employeeID;
        this.sessionID = sessionID;
    }
}

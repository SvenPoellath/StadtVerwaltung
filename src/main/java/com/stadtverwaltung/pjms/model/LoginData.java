package com.stadtverwaltung.pjms.model;

/**
 * Represents login data sent by frontend for authorization handliong
 */
public class LoginData {
    /**
     * Unique ID of employee for database request
     */
    public String employeeID;
    /**
     * Password submitted by user
     */
    public String password;

    /**
     * Default constructor
     */
    public LoginData(){}
}

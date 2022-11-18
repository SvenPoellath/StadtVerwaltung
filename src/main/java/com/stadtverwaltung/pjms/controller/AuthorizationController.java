package com.stadtverwaltung.pjms.controller;

import java.util.HashMap;

public class AuthorizationController {
    private static HashMap<String,String> sessionMap = new HashMap<>();

    public boolean hasAuthorization(String employeeID, String sessionID) {
            return sessionMap.get(employeeID).equals(sessionID);
    }

    public void addSession(String employeeID, String sessionID) {
        sessionMap.put(employeeID,sessionID);
    }
}

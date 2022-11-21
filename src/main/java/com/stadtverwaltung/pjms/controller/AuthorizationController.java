package com.stadtverwaltung.pjms.controller;

import java.util.HashMap;

public class AuthorizationController {
    private static HashMap<String,String> sessionMap = new HashMap<>();

    public boolean hasAuthorization(String employeeID, String sessionID) {
            if (sessionMap.get(employeeID) != null && sessionID != null) {
                return sessionMap.get(employeeID).equals(sessionID);
            } else {
                return false;
            }
    }

    public void addSession(String employeeID, String sessionID) {
        sessionMap.put(employeeID,sessionID);
    }
}

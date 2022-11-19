package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.LoginData;
import com.stadtverwaltung.pjms.model.Session;
import com.stadtverwaltung.pjms.persistence.EmployeePersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class EmployeeController {
    private EmployeePersistence employeePersistence = new EmployeePersistence();
    private JSONController jsonController = new JSONController();
    private AuthorizationController authorizationController = new AuthorizationController();

    @PostMapping(value = "/doLogin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> doLogin(@RequestBody String json) {
        LoginData loginData = jsonController.getGson().fromJson(json, LoginData.class);
        String sessionID = null;
        try {
            sessionID = employeePersistence.checkLogin(loginData);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        if (sessionID != null) {
            authorizationController.addSession(loginData.employeeID, sessionID);
            return ResponseEntity.ok(sessionID);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}

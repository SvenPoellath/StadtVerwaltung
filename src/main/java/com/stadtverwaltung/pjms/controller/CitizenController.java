package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Citizen;
import com.stadtverwaltung.pjms.persistence.CitizenPersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@CrossOrigin
public class CitizenController {
    private final CitizenPersistence citizenPersistence = new CitizenPersistence();
    private final JSONController jsonController = new JSONController();

    @PostMapping(value = "/citizens", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> postCitizen(@RequestBody String json) {
        Citizen citizen = jsonController.getGson().fromJson(json, Citizen.class);
        String persist;
        try {
            persist = citizenPersistence.persistCitizen(citizen);
        } catch (SQLException sqle) {
            throw new RuntimeException(sqle);
        }
        if (persist != null) {
            return ResponseEntity.ok(persist);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
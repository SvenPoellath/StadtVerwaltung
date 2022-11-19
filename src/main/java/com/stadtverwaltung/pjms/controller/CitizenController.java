package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Citizen;
import com.stadtverwaltung.pjms.model.Report;
import com.stadtverwaltung.pjms.persistence.CitizenPersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
public class CitizenController {
    private CitizenPersistence citizenPersistence = new CitizenPersistence();
    private JSONController jsonController = new JSONController();

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

    @GetMapping(value = "/citizens", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Citizen>> getCitizens() {
        List<Citizen> citizens = null;
        try {
            citizens = citizenPersistence.getCitizensFromDB();
        } catch (SQLException e) {

        }
        if (citizens == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(citizens);
        }
    }
}
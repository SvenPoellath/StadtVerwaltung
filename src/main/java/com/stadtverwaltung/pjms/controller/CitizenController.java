package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.persistence.CitizenPersistence;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CitizenController {
    private CitizenPersistence citizenPersistence = new CitizenPersistence();
}

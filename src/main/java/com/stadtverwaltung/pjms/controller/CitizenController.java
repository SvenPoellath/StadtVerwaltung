package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.persistence.CitizenPersistence;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CitizenController {
    private CitizenPersistence citizenPersistence = new CitizenPersistence();
}

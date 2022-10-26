package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.persistence.CasePersistence;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CaseController {
    private CasePersistence casePersistence = new CasePersistence();
}

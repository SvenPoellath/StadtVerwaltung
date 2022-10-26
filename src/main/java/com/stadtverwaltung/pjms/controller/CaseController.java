package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Case;
import com.stadtverwaltung.pjms.persistence.CasePersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
public class CaseController {
    private CasePersistence casePersistence = new CasePersistence();

    @GetMapping(value = "/cases", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Case>> getCases() {
        List<Case> caseList = null;
        try {
            caseList = casePersistence.getCasesFromDB();
        } catch (SQLException e) {

        }
        if (caseList == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(caseList);
        }
    }

}
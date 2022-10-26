package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Report;
import com.stadtverwaltung.pjms.persistence.ReportPersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
public class ReportController {
    private ReportPersistence reportPersistence = new ReportPersistence();

    @GetMapping(value = "/reports", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Report>> getReports() {
        List<Report> reports = null;
        try {
            reports = reportPersistence.getReportsFromDB();
        } catch (SQLException e) {

        }
        if (reports == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(reports);
        }
    }

    @GetMapping(value = "/report", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> getReports(@RequestParam String id) {
        Report report;
        try {
            report = reportPersistence.getReportFromDB(id);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        if (report == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(report);
        }
    }

}
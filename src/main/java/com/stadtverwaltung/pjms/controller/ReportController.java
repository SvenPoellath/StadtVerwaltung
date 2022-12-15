package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Report;
import com.stadtverwaltung.pjms.persistence.ReportPersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
public class ReportController {
    private ReportPersistence reportPersistence = new ReportPersistence();
    private JSONController jsonController = new JSONController();
    private AuthorizationController authorizationController = new AuthorizationController();

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
    public ResponseEntity<Report> getReport(@RequestParam String id) {
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

    @PostMapping(value = "/reports", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postReport(@RequestBody String json) {
        Report report = jsonController.getGson().fromJson(json,Report.class);
        String persist;
        try {
            persist = reportPersistence.persistReport(report);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        if (persist != null) {
            return ResponseEntity.ok(persist);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping(value = "comment", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Report> postComment (@RequestParam String id, @RequestBody String comment, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            String returnID = null;
            try {
                returnID = reportPersistence.updateComment(id,comment);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

            if (returnID != null) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/comment", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Report> lupdateComment(@RequestParam String id, @RequestBody String comment, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            String returnID = null;
            try {
                returnID = reportPersistence.updateComment(id,comment);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

            if (returnID != null) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/status", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Report> putReportStatus(@RequestParam String id, @RequestBody String status, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            String returnID = null;
            try {
                returnID = reportPersistence.updateStatus(id,status);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            if (returnID != null) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
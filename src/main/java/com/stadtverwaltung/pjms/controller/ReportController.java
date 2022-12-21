package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Report;
import com.stadtverwaltung.pjms.persistence.ReportPersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
import java.util.List;

/**
 * REST Controller for Report Management
 */
@RestController
@CrossOrigin
public class ReportController {
    /**
     * Connection to Database
     */
    private final ReportPersistence reportPersistence = new ReportPersistence();
    /**
     * JSON Controller for Request body management
     */
    private final JSONController jsonController = new JSONController();
    /**
     * Authorization controller for elevated tasks
     */
    private final AuthorizationController authorizationController = new AuthorizationController();

    /**
     * Loads all reports from Persistence
     * @return JSON String containing all reports, citizen and employee info
     */
    @GetMapping(value = "/reports", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Report>> getReports() {
            List<Report> reports = null;
            try {
                reports = reportPersistence.getReportsFromDB();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            if (reports == null) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(reports);
            }
    }

    /**
     * Returns a single report, useful for report overview
     * @param id ID of requested report
     * @return Report as JSON string, with citizen and employee info
     */
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

    /**
     * Adds report to persistence, converts json to java object
     * @param json Report as JSON String
     * @return ReportID for frontend feedback
     */

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

    /**
     * Adds comment to a report (if no comment exists)
     * @param id ID of report to add comment
     * @param comment Comment to add
     * @param employeeID employeeID for authorization handling
     * @param sessionID sessionID for authorization handling
     * @return ok status if comment is published
     */
    @PostMapping(value = "comment", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Report> postComment (@RequestParam String id, @RequestBody String comment, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            String returnID;
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

    /**
     * Update comment of a report (if comment already exists)
     * @param id ID of report to update comment
     * @param comment Comment to update
     * @param employeeID employeeID for authorization handling
     * @param sessionID sessionID for authorization handling
     * @return ok status if comment is published
     */

    @PutMapping(value = "/comment", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Report> updateComment(@RequestParam String id, @RequestBody String comment, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            String returnID;
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

    /**
     * Updates status of a report
     * @param id ID of report to add status
     * @param status Status to change report to
     * @param employeeID employeeID for authorization handling
     * @param sessionID sessionID for authorization handling
     * @return ok status if status is updated
     */

    @PutMapping(value = "/status", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Report> putReportStatus(@RequestParam String id, @RequestBody String status, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            String returnID;
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

    /**
     * Request to delete a report after completion
     * @param id ID of report to delete
     * @param employeeID employeeID for authorization handling
     * @param sessionID sessionID for authorization handling
     * @return id of deleted report for confirmation
     */

    @DeleteMapping(value = "/report")
    public ResponseEntity<String> deleteReport(@RequestParam String id, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        String returnID = null;
        if (authorizationController.hasAuthorization(employeeID,sessionID)) {
            try {
                returnID= reportPersistence.deleteReport(id);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if (returnID!=null) {
            return ResponseEntity.ok(returnID);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
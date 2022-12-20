package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Citizen;
import com.stadtverwaltung.pjms.model.Report;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ReportPersistenceTest {

    private final ReportPersistence reportPersistence = new ReportPersistence();

    @Test
    void getReportsFromDB() {
        List<Report> reportList;
        try {
            reportList = reportPersistence.getReportsFromDB();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        assertFalse(reportList.isEmpty());
    }

    @Test
    void getReportFromDB() {
        Report testReport;

        try {
            testReport = reportPersistence.getReportFromDB("ePFVIVwzh3uC");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(testReport);
    }

    @Test
    void persistReport() {
        Report report = new Report();
        report.latitude = 48;
        report.longitude = 9;
        report.kindOfReport = "Defekt oder Schaden";
        report.description = "Kaputter Hydrant";
        report.citizen = new Citizen();
        report.citizen.citizenID = "kxmM5uylCW8D";
        String reportID;
        try {
            reportID = reportPersistence.persistReport(report);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(reportID);
    }

    @Test
    void updateStatus() {
        try {
            reportPersistence.updateStatus("ePFVIVwzh3uC","Bearbeitet");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        Report testReport;
        try {
            testReport = reportPersistence.getReportFromDB("ePFVIVwzh3uC");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        assertEquals("Bearbeitet", testReport.status);


    }

    @Test
    void updateComment() {
        try {
            reportPersistence.updateComment("ePFVIVwzh3uC","Updated comment");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        Report testReport;
        try {
            testReport = reportPersistence.getReportFromDB("ePFVIVwzh3uC");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        assertEquals("Updated comment", testReport.comment);

    }

    @Test
    void deleteReport() {
        try {
            reportPersistence.deleteReport("sFaSB198a5dF");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        Report deletedReport;
        try {
            deletedReport = reportPersistence.getReportFromDB("sFaSB198a5dF");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        assertNull(deletedReport);

    }
}
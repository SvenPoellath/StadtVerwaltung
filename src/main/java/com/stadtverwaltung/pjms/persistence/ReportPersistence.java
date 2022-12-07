package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Report;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ReportPersistence {
    private final SQLiteDatabase sqliteDatabase = new SQLiteDatabase();
    private Logger logger = LoggerFactory.getLogger(ReportPersistence.class);

    public List<Report> getReportsFromDB() throws SQLException {
        List<Report> reportList = new ArrayList<>();
        PreparedStatement selectStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM reports LEFT JOIN citizens USING(citizenID) LEFT JOIN employees USING(employeeID)");
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            reportList.add(mapReport(resultSet));
        }

        return reportList;
    }

    public Report getReportFromDB(String reportID) throws SQLException {
        Report returnReport;
        PreparedStatement selectReportStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM reports LEFT JOIN citizens USING(citizenID) LEFT JOIN employees USING(employeeID) WHERE reportID = ?");
        selectReportStatement.setString(1,reportID);
        ResultSet resultSet = selectReportStatement.executeQuery();
        resultSet.next();
        returnReport = mapReport(resultSet);
        return returnReport;
    }

    public String persistReport(Report report) throws SQLException {

        PreparedStatement insertStatement = sqliteDatabase.getConnection().prepareStatement("INSERT INTO reports (reportID,latitude,longitude,kindOfReport,description,citizenID,employeeID,status) VALUES (?,?,?,?,?,?,?,?)");
        String id = sqliteDatabase.generateID("report");
        insertStatement.setString(1,id);
        insertStatement.setDouble(2,report.latitude);
        insertStatement.setDouble(3,report.longitude);
        insertStatement.setString(4,report.kindOfReport);
        insertStatement.setString(5, report.description);
        insertStatement.setString(6,report.citizen.citizenID);
        insertStatement.setString(7,report.employee.employeeID);
        insertStatement.setString(8,"Unbearbeitet");
        int done = 0;
        try {
            done = insertStatement.executeUpdate();
        } catch (SQLException sqlException) {
            logger.error(sqlException.getMessage());
        }

        if (done == 1) {
            return id;
        } else {
            return null;
        }
    }

    private Report mapReport(ResultSet resultSet) throws SQLException {
        Report returnReport = new Report();
        returnReport.reportID = resultSet.getString("reportID");
        returnReport.latitude = resultSet.getDouble("latitude");
        returnReport.longitude = resultSet.getDouble("longitude");
        returnReport.kindOfReport = resultSet.getString("kindOfReport");
        returnReport.pictureID = resultSet.getString("pictureID");
        returnReport.description = resultSet.getString("description");
        returnReport.citizen.citizenID = resultSet.getString("citizenID");
        returnReport.citizen.citizenFirstName = resultSet.getString("citizenFirstName");
        returnReport.citizen.citizenLastName = resultSet.getString("citizenLastName");
        returnReport.citizen.citizenPhoneNumber = resultSet.getString("citizenPhoneNumber");
        returnReport.citizen.citizenEmailAddress = resultSet.getString("citizenEmailAddress");
        returnReport.employee.employeeID = resultSet.getString("employeeID");
        returnReport.employee.firstName = resultSet.getString("employeeFirstName");
        returnReport.employee.lastName = resultSet.getString("employeeLastName");
        returnReport.employee.phoneNumber = resultSet.getString("employeePhoneNumber");
        returnReport.employee.emailAddress = resultSet.getString("employeeEmailAddress");
        returnReport.status = resultSet.getString("status");
        return returnReport;
    }
}
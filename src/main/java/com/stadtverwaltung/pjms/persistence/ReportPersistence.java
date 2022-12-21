package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Report;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles report on database level
 */
public class ReportPersistence {
    /**
     * Instance of SQLite database
     */
    private final SQLiteDatabase sqliteDatabase = new SQLiteDatabase();
    /**
     * Instance of Global Logger for debugging purposes
     */
    private final Logger logger = LoggerFactory.getLogger(ReportPersistence.class);

    /**
     * Loads reports from the database
     * @return Reports as a List
     * @throws SQLException SQLException if anything on the database goes wrong
     */
    public List<Report> getReportsFromDB() throws SQLException {
        List<Report> reportList = new ArrayList<>();
        PreparedStatement selectStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM reports LEFT JOIN citizens USING(citizenID) LEFT JOIN employees USING(employeeID)");
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            reportList.add(mapReport(resultSet));
        }

        return reportList;
    }

    /**
     * Loads a single report from the database
     * @param reportID reportID submitted by the controller/frontend
     * @return Report from database or null if not existent
     * @throws SQLException SQLException if anything on the database goes wrong
     */
    public Report getReportFromDB(String reportID) throws SQLException {
        Report returnReport = null;
        PreparedStatement selectReportStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM reports LEFT JOIN citizens USING(citizenID) LEFT JOIN employees USING(employeeID) WHERE reportID = ?");
        selectReportStatement.setString(1,reportID);
        ResultSet resultSet = selectReportStatement.executeQuery();
        if(resultSet.next()) {
            returnReport = mapReport(resultSet);
        }
        return returnReport;
    }

    /**
     * Saves report to database
     * @param report report to be saved
     * @return Unique ReportID as a string
     * @throws SQLException SQLException if anything on the database goes wrong
     */
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

    /**
     * Updates status of a given report
     * @param id id of the report to be updated
     * @param status status to be written into database
     * @return id of updated report as a confirmation
     * @throws SQLException SQLException if anything on the database goes wrong
     */
    public String updateStatus(String id, String status) throws SQLException {
        PreparedStatement updateStatement = sqliteDatabase.getConnection().prepareStatement("UPDATE reports SET status = ? WHERE reportID = ?");
        updateStatement.setString(1,status);
        updateStatement.setString(2,id);
        int done = 0;
        try {
            done = updateStatement.executeUpdate();
        } catch (SQLException sqlException) {
            logger.error(sqlException.getMessage());
        }

        if (done == 1) {
            return id;
        } else {
            return null;
        }
    }

    /**
     * Updates comment of a given report
     * @param id id of the report to be updated
     * @param comment comment to be written into database
     * @return ID  of updated report as a confirmation
     * @throws SQLException SQLException if anything on the database goes wrong
     */
    public String updateComment(String id, String comment) throws SQLException {
        PreparedStatement updateStatement = sqliteDatabase.getConnection().prepareStatement("UPDATE reports SET comment = ? WHERE reportID = ?");
        updateStatement.setString(1,comment);
        updateStatement.setString(2,id);
        int done = 0;

        try {
            done = updateStatement.executeUpdate();
        } catch (SQLException sqlException) {
            logger.error(sqlException.getMessage());
        }

        if (done == 1) {
            return id;
        } else {
            return null;
        }
    }

    /**
     * Maps a resultset databse entry to a java report object
     * @param resultSet current resultset from database query
     * @return Report object
     * @throws SQLException SQLEcxception if anything on the database goes wrong
     */

    private Report mapReport(ResultSet resultSet) throws SQLException {
        Report returnReport = new Report();
        returnReport.reportID = resultSet.getString("reportID");
        returnReport.latitude = resultSet.getDouble("latitude");
        returnReport.longitude = resultSet.getDouble("longitude");
        returnReport.kindOfReport = resultSet.getString("kindOfReport");
        returnReport.pictureID = resultSet.getString("pictureID");
        returnReport.description = resultSet.getString("description");
        returnReport.comment = resultSet.getString("comment");
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

    /**
     * deletes a report from the database
     * @param id ID of the report to be deleted
     * @return ID of deleted report as a confirmation
     * @throws SQLException SQLException if anything on the database goes wrong
     */
    public String deleteReport(String id) throws SQLException {
        PreparedStatement deleteStatement = sqliteDatabase.getConnection().prepareStatement("DELETE FROM reports WHERE reportID = ?");
        deleteStatement.setString(1,id);
        int done = deleteStatement.executeUpdate();
        if (done == 1) {
            return id;
        } else {
            return null;
        }
    }
}
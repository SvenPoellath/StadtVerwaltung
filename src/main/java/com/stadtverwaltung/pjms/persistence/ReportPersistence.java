package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Report;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ReportPersistence {
    private final SQLiteDatabase sqliteDatabase = new SQLiteDatabase();

    public List<Report> getReportsFromDB() throws SQLException {
        List<Report> reportList = new ArrayList<>();
        PreparedStatement selectStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM reports");
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            reportList.add(mapReport(resultSet));
        }

        return reportList;
    }

    public Report getReportFromDB(String id) throws SQLException {
        Report returnReport;
        PreparedStatement selectReportStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM reports WHERE id=?");
        selectReportStatement.setString(1,id);
        ResultSet resultSet = selectReportStatement.executeQuery();
        resultSet.next();
        returnReport = mapReport(resultSet);
        return returnReport;
    }

    public String persistReport(Report report) throws SQLException {

        PreparedStatement insertStatement = sqliteDatabase.getConnection().prepareStatement("INSERT INTO reports (id,latitude,longitude,kindOfReport,description,citizenID,status) VALUES (?,?,?,?,?,?,?)");
        String id = sqliteDatabase.generateID("reports");
        insertStatement.setString(1,id);
        insertStatement.setDouble(2,report.latitude);
        insertStatement.setDouble(3,report.longitude);
        insertStatement.setString(4,report.kindOfReport);
        insertStatement.setString(5, report.description);
        insertStatement.setString(6,report.citizenID);
        insertStatement.setString(7,"Unbearbeitet");
        int done = insertStatement.executeUpdate();

        if (done == 1) {
            return id;
        } else {
            return null;
        }
    }

    private Report mapReport(ResultSet resultSet) throws SQLException {
        Report returnReport = new Report();
        returnReport.id = resultSet.getString("id");
        returnReport.latitude = resultSet.getDouble("latitude");
        returnReport.longitude = resultSet.getDouble("longitude");
        returnReport.kindOfReport = resultSet.getString("kindOfReport");
        returnReport.pictureID = resultSet.getString("pictureID");
        returnReport.description = resultSet.getString("description");
        returnReport.citizenID = resultSet.getString("citizenID");
        returnReport.status = resultSet.getString("status");
        returnReport.employeeID = resultSet.getString("employeeID");
        return returnReport;
    }
}
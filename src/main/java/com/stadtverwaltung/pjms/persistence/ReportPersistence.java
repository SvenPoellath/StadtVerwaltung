package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Report;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ReportPersistence {
    private SQLiteDatabase sqliteDatabase = new SQLiteDatabase();

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

    private Report mapReport(ResultSet resultSet) throws SQLException {
        Report returnReport = new Report();
        returnReport.id = resultSet.getString("id");
        returnReport.latitude = resultSet.getDouble("latitude");
        returnReport.longitude = resultSet.getDouble("longitude");
        returnReport.kindOfReport = resultSet.getString("kindOfReport");
        returnReport.pictureID = resultSet.getString("pictureID");
        returnReport.description = resultSet.getString("description");
        returnReport.citizenID = resultSet.getString("citizenID");
        return returnReport;
    }
}
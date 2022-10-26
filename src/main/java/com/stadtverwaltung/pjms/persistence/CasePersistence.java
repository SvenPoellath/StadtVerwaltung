package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Case;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CasePersistence {
    private SQLiteDatabase sqliteDatabase = new SQLiteDatabase();

    public List<Case> getCasesFromDB() throws SQLException {
        List<Case> caseList = new ArrayList<>();
        PreparedStatement selectStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM cases");
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            caseList.add(mapCase(resultSet));
        }

        return caseList;
    }

    public Case mapCase(ResultSet resultSet) throws SQLException {
        Case returnCase = new Case();
        returnCase.id = resultSet.getString("id");
        returnCase.latitude = resultSet.getDouble("latitude");
        returnCase.longitude = resultSet.getDouble("longitude");
        returnCase.kindOfCase = resultSet.getString("kindOfCase");
        returnCase.pictureID = resultSet.getString("pictureID");
        returnCase.description = resultSet.getString("description");
        returnCase.citizenID = resultSet.getString("citizenID");
        return returnCase;
    }
}
package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Citizen;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CitizenPersistence {
    private final SQLiteDatabase sqliteDatabase = new SQLiteDatabase();
    public String persistCitizen(Citizen citizen) throws SQLException {
        PreparedStatement insertStatement = sqliteDatabase.getConnection().prepareStatement("INSERT INTO citizens (citizenID,citizenFirstName,citizenLastName,citizenEmailAddress,citizenPhoneNumber) VALUES (?,?,?,?,?)");
        String id = sqliteDatabase.generateID("citizen");
        insertStatement.setString(1,id);
        insertStatement.setString(2, citizen.citizenFirstName);
        insertStatement.setString(3, citizen.citizenLastName);
        insertStatement.setString(4,citizen.citizenEmailAddress);
        insertStatement.setString(5, citizen.citizenPhoneNumber);
        int done = insertStatement.executeUpdate();
        if (done ==1) {
            return id;
        } else {
            return null;
        }
    }

    public List<Citizen> getCitizensFromDB() throws SQLException {
        List<Citizen> citizenList = new ArrayList<>();
        PreparedStatement selectStatement = sqliteDatabase.getConnection().prepareStatement("SELECT * FROM citizens");
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            citizenList.add(mapCitizen(resultSet));
        }

        return citizenList;
    }

    private Citizen mapCitizen(ResultSet resultSet) throws SQLException {
        Citizen returnCitizen = new Citizen();
        returnCitizen.citizenID = resultSet.getString("citizenID");
        returnCitizen.citizenFirstName =resultSet.getString("citizenFirstName");
        returnCitizen.citizenLastName =resultSet.getString("citizenLastName");
        returnCitizen.citizenEmailAddress =resultSet.getString("citizenEmailAddress");
        returnCitizen.citizenPhoneNumber =resultSet.getString("citizenPhoneNumber");
        return returnCitizen;
    }

}

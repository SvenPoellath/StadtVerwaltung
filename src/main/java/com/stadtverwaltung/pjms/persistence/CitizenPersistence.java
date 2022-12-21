package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Citizen;

import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Handles Citizen on database level
 */
public class CitizenPersistence {
    /**
     * Instance of SQLite database
     */
    private final SQLiteDatabase sqliteDatabase = new SQLiteDatabase();

    /**
     * Saves a citizen in the database
     * @param citizen citizen to be saved
     * @return Unique ID of citizen
     * @throws SQLException SQLException if there is an error saving the citizen
     */
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
}

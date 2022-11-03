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
        PreparedStatement insertStatement = sqliteDatabase.getConnection().prepareStatement("INSERT INTO citizens (id,firstName,lastName,email_address,phone_number) VALUES (?,?,?,?,?)");
        String id = sqliteDatabase.generateID("citizens");
        insertStatement.setString(1,id);
        insertStatement.setString(2, citizen.firstName);
        insertStatement.setString(3, citizen.lastName);
        insertStatement.setString(4,citizen.email_address);
        insertStatement.setString(5, citizen.phone_number);
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
        returnCitizen.id = resultSet.getString("id");
        returnCitizen.firstName=resultSet.getString("firstName");
        returnCitizen.lastName=resultSet.getString("lastName");
        returnCitizen.email_address=resultSet.getString("email_address");
        returnCitizen.phone_number=resultSet.getString("phone_number");
        return returnCitizen;
    }

}

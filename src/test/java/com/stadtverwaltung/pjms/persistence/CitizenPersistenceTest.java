package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Citizen;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

class CitizenPersistenceTest {
    private final CitizenPersistence citizenPersistence = new CitizenPersistence();
    @Test
    void persistCitizen() {
        Citizen testCitizen = new Citizen();
        testCitizen.citizenFirstName = "Max";
        testCitizen.citizenLastName = "Mustermann";
        testCitizen.citizenEmailAddress = "max.mustermann@mustermail.de";
        testCitizen.citizenPhoneNumber = "01234 567890";
        String citizenID;
        try {
            citizenID = citizenPersistence.persistCitizen(testCitizen);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        assertNotNull(citizenID);

    }
}
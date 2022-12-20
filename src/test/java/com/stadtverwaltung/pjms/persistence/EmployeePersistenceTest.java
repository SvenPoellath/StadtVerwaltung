package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.LoginData;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

class EmployeePersistenceTest {


    private final EmployeePersistence employeePersistence = new EmployeePersistence();
    @Test
    void checkLogin() {
        LoginData loginData = new LoginData();
        loginData.employeeID = "M4AlwVugvxrH";
        loginData.password = "12345678";
        String sessionID;

        try {
            sessionID = employeePersistence.checkLogin(loginData);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        assertNotNull(sessionID);

    }
}
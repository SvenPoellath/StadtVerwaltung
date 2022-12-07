package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.LoginData;
import org.apache.commons.lang3.RandomStringUtils;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class EmployeePersistence {
    private SQLiteDatabase sqLiteDatabase = new SQLiteDatabase();
    private SHA512PasswordPersistence sha512PasswordPersistence = new SHA512PasswordPersistence();

    public String checkLogin(LoginData loginData) throws SQLException {
        String securePassword = null;
        String salt = null;

        PreparedStatement preparedStatement = sqLiteDatabase.getConnection().prepareStatement("SELECT employeePassword, employeeSalt FROM employees WHERE employeeID = ?");
        preparedStatement.setString(1,loginData.employeeID);

        ResultSet resultSet = preparedStatement.executeQuery();

        while(resultSet.next()) {
            securePassword = resultSet.getString("employeePassword");
            salt = resultSet.getString("employeeSalt");
        }

        if(sha512PasswordPersistence.verifyUserPassword(loginData.password,securePassword,salt)) {
            return generateSessionID();
        } else {
            return null;
        }

    }

    private String generateSessionID() {
        String id;
        id = RandomStringUtils.randomAlphanumeric(32);
        return id;
    }


}

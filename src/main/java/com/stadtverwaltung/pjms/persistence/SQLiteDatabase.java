package com.stadtverwaltung.pjms.persistence;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class SQLiteDatabase {

    private final String URL = "jdbc:sqlite:database.sqlite";
    private Logger logger = LoggerFactory.getLogger(SQLiteDatabase.class);
    private static Connection connection;

    public SQLiteDatabase() {
        if (connection == null) {
            loadDb();
            createTables();
        }
    }

    //Initializes DB and creates tables if necessary
    public void loadDb() {
        try {
            connection = DriverManager.getConnection(URL);
            logger.info("Connection to database established");
        } catch (SQLException sqe) {
            logger.error("Failed to connect to database", sqe);
        }
    }
    //Creates table if they don't exist
    public void createTables() {
        String citizenTable = """
                CREATE TABLE IF NOT EXISTS citizens (
                 id              text(12) PRIMARY KEY,  \s
                 firstName       text     NOT NULL,     \s
                 lastName        text     NOT NULL,     \s
                 email_address   text             ,     \s
                 phone_number    text                   \s
                );""";
        executeSQL(citizenTable);

        String employeeTable = """
                CREATE TABLE IF NOT EXISTS employees (
                 id             text(12) PRIMARY KEY,
                 firstName       text     NOT NULL,     \s
                 lastName        text     NOT NULL,     \s
                 email_address   text             ,     \s
                 phone_number    text                   \s
                );""";
        executeSQL(employeeTable);

        String caseTable = """
                CREATE TABLE IF NOT EXISTS cases (
                  id  text(12) PRIMARY KEY,
                  latitude real,
                  longitude real,
                  kindOfCase text,
                  description text,
                  pictureID text(12),
                  citizenID text(12),
                  employeeID text(12)
                );""";
        executeSQL(caseTable);
    }

    //Executes generic SQL string
    public void executeSQL(String sql) {
        try {
            Statement statement = connection.createStatement();
            statement.execute(sql);
        } catch (SQLException sqe) {
            logger.error("Failed to execute SQL Statement: " + sql,sqe);
        }
    }
}
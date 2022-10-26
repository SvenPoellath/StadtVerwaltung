package com.stadtverwaltung.pjms.persistence;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.*;

public class SQLiteDatabase {

    private final String URL = "jdbc:sqlite:database.sqlite";
    private Logger logger = LoggerFactory.getLogger(SQLiteDatabase.class);
    private static Connection connection;

    public SQLiteDatabase() {
        if (connection == null) {
            loadDb();
            createTables();
            if (noData()) {
                generateSampleData();
            }
            logger.info("Database ready");
        }
    }

    //Initializes DB and creates tables if necessary
    private void loadDb() {
        try {
            connection = DriverManager.getConnection(URL);
            logger.info("Connection to database established");
        } catch (SQLException sqe) {
            logger.error("Failed to connect to database", sqe);
        }
    }
    //Creates table if they don't exist
    private void createTables() {
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
                  employeeID text(12),
                  FOREIGN KEY (citizenID) REFERENCES citizens(id),
                  FOREIGN KEY (employeeID) REFERENCES employees(id)
                );""";
        executeSQL(caseTable);
        logger.info("Tables created");
    }


    private boolean noData() {
        try {
            PreparedStatement getCases = connection.prepareStatement("SELECT * FROM cases");
            PreparedStatement getCitizens = connection.prepareStatement("SELECT * FROM citizens");
            PreparedStatement getEmployees = connection.prepareStatement("SELECT * FROM employees");

            boolean casesEmpty = !getCases.executeQuery().next();
            boolean citizensEmpty = !getCitizens.executeQuery().next();
            boolean employeesEmpty = !getEmployees.executeQuery().next();

            if (casesEmpty && citizensEmpty && employeesEmpty) {
                return true;
            } else {
                return false;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
    private void generateSampleData() {
        logger.info("Trying to insert sample data");
        String fileContent;
        try {
             fileContent =  Files.readString(Path.of("sampleData.txt"), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String[] sqlStatements = fileContent.split(System.getProperty("line.separator"));
        for (String sql : sqlStatements) {
            executeSQL(sql);
        }
        logger.info("Sample data inserted");
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

    public String generateID() {
        return RandomStringUtils.randomAlphanumeric(12);
    }

    public Connection getConnection() {
        return connection;
    }

}
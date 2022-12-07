package com.stadtverwaltung.pjms.persistence;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import javax.xml.transform.Result;
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
        String citizensTable = """
                CREATE TABLE IF NOT EXISTS citizens (
                 citizenID              text(12) PRIMARY KEY,  \s
                 citizenFirstName       text     NOT NULL,     \s
                 citizenLastName        text     NOT NULL,     \s
                 citizenEmailAddress   text             ,     \s
                 citizenPhoneNumber    text                   \s
                );""";
        executeSQL(citizensTable);




        String employeeTable = """
                CREATE TABLE IF NOT EXISTS employees (
                 employeeID              text(12) PRIMARY KEY,
                 employeePassword        text,
                 employeeSalt            text,
                 employeeFirstName       text     NOT NULL,     \s
                 employeeLastName        text     NOT NULL,     \s
                 employeeEmailAddress   text             ,     \s
                 employeePhoneNumber    text                   \s
                );""";
        executeSQL(employeeTable);

        String reportsTable = """
                CREATE TABLE IF NOT EXISTS reports (
                  reportID  text(12) PRIMARY KEY,
                  latitude real,
                  longitude real,
                  kindOfReport text,
                  description text,
                  status      text,
                  pictureID text(12),
                  citizenID text(12),
                  employeeID text(12),
                  FOREIGN KEY (citizenID) REFERENCES citizens(citizenID),
                  FOREIGN KEY (employeeID) REFERENCES employees(employeeID)
                );""";
        executeSQL(reportsTable);

        String commentsTable = """
                CREATE TABLE IF NOT EXISTS comments (
                commentID          text(12) PRIMARY KEY,
                content     text,
                timestamp   text,
                employeeID  text(12),
                reportID    text(12),
                FOREIGN KEY (employeeID) REFERENCES employees(employeeID),
                FOREIGN KEY (reportID) REFERENCES reports(reportID)
                );""";
        executeSQL(commentsTable);
        logger.info("Tables created");
    }


    private boolean noData() {
        try {
            PreparedStatement getReports = connection.prepareStatement("SELECT * FROM reports");
            PreparedStatement getCitizens = connection.prepareStatement("SELECT * FROM citizens");
            PreparedStatement getEmployees = connection.prepareStatement("SELECT * FROM employees");

            boolean reportsEmpty = !getReports.executeQuery().next();
            boolean citizensEmpty = !getCitizens.executeQuery().next();
            boolean employeesEmpty = !getEmployees.executeQuery().next();

            if (reportsEmpty && citizensEmpty && employeesEmpty) {
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

    public String generateID(String sqlSelect) {
        String id;
        do {
            id = RandomStringUtils.randomAlphanumeric(12);
        } while (checkForDouble(id,sqlSelect));
        return id;
    }

    private boolean checkForDouble(String generatedId, String sqlSelect) {
        Statement selectStatement;
        ResultSet resultSet;
        try {
            selectStatement = connection.createStatement();
            resultSet = selectStatement.executeQuery("SELECT * FROM " + sqlSelect + "s WHERE " + sqlSelect + "ID = \"" + generatedId + "\"");
            return resultSet.next();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Connection getConnection() {
        return connection;
    }

}
package com.stadtverwaltung.pjms.persistence;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.*;

/**
 * Class representing the database (SQLite)
 */
public class SQLiteDatabase {
    /**
     * instance of global logger for debugging purposes
     */
    private final Logger logger = LoggerFactory.getLogger(SQLiteDatabase.class);
    /**
     * Database connection
     */
    private static Connection connection;

    /**
     * Constructor for instantiating connection, creating tables and implementing sample data
     */
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

    /**
     * Instantiates database connection
      */
    private void loadDb() {
        try {
            String URL = "jdbc:sqlite:database.sqlite";
            connection = DriverManager.getConnection(URL);
            logger.info("Connection to database established");
        } catch (SQLException sqe) {
            logger.error("Failed to connect to database", sqe);
        }
    }

    /**
     * Creates database table if no sample data is inside.
      */
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
                  comment     text,
                  pictureID text(12),
                  citizenID text(12),
                  employeeID text(12),
                  FOREIGN KEY (citizenID) REFERENCES citizens(citizenID),
                  FOREIGN KEY (employeeID) REFERENCES employees(employeeID)
                );""";
        executeSQL(reportsTable);

        logger.info("Tables created");
    }

    /**
     * Checks if sample data is already present
     * @return true if no data is inside the tables
     */
    private boolean noData() {
        try {
            PreparedStatement getReports = connection.prepareStatement("SELECT * FROM reports");
            PreparedStatement getCitizens = connection.prepareStatement("SELECT * FROM citizens");
            PreparedStatement getEmployees = connection.prepareStatement("SELECT * FROM employees");

            boolean reportsEmpty = !getReports.executeQuery().next();
            boolean citizensEmpty = !getCitizens.executeQuery().next();
            boolean employeesEmpty = !getEmployees.executeQuery().next();

            return reportsEmpty && citizensEmpty && employeesEmpty;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     * Inserts sample data into table
     */
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

    /**
     * Executes generic sql
      * @param sql String to be executed
     */
    public void executeSQL(String sql) {
        try {
            Statement statement = connection.createStatement();
            statement.execute(sql);
        } catch (SQLException sqe) {
            logger.error("Failed to execute SQL Statement: " + sql,sqe);
        }
    }

    /**
     * Generates ID for a requested object
     * @param sqlSelect Table to create an objectID for
     * @return generated ID
     */
    public String generateID(String sqlSelect) {
        String id;
        do {
            id = RandomStringUtils.randomAlphanumeric(12);
        } while (checkForDouble(id,sqlSelect));
        return id;
    }

    /**
     * Checks if generated ID already exists for table
     * @param generatedId ID generated by method
     * @param sqlSelect table to check for doubles in
     * @return true if object already exists
     */
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

    /**
     * Provides Database connection for other persistence classes
     * @return Database connection object (needed for prepared statements)
     */
    public Connection getConnection() {
        return connection;
    }

}
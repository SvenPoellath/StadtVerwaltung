package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Comment;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CommentPersistence {
    private SQLiteDatabase sqLiteDatabase = new SQLiteDatabase();

    public List<Comment> loadCommentsFromDB(String reportID) throws SQLException {
        List<Comment> commentList = new ArrayList<>();
        PreparedStatement selectStatement = sqLiteDatabase.getConnection().prepareStatement("SELECT * FROM comments LEFT JOIN employee USING(employeeID) WHERE reportID = ? ORDER BY timestamp ASC");
        selectStatement.setString(1,reportID);
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            commentList.add(mapComment(resultSet));
        }
        return commentList;
    }

    private Comment mapComment(ResultSet resultSet) throws SQLException {
        Comment returnComment = new Comment();
        returnComment.commentID = resultSet.getString("commentID");
        returnComment.content = resultSet.getString("content");
        returnComment.timestamp = resultSet.getString("timestamp");
        returnComment.employee.employeeID = resultSet.getString("employeeID");
        returnComment.employee.firstName = resultSet.getString("employeeFirstName");
        returnComment.employee.lastName = resultSet.getString("employeeLastName");
        returnComment.report.reportID = resultSet.getString("reportID");
        return returnComment;
    }

    public String persistComment(Comment comment) throws SQLException {
        PreparedStatement insertStatement = sqLiteDatabase.getConnection().prepareStatement("INSERT INTO comments (commentID, content, timestamp, reportID, employeeID) VALUES (?,?,?,?,?)");
        String commentID = sqLiteDatabase.generateID("comment");
        insertStatement.setString(1,commentID);
        insertStatement.setString(2,comment.content);
        insertStatement.setString(3,comment.timestamp);
        insertStatement.setString(4,comment.report.reportID);
        insertStatement.setString(5,comment.employee.employeeID);

        int done = insertStatement.executeUpdate();

        if (done == 1) {
            return commentID;
        } else {
            return null;
        }


    }
}

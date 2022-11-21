package com.stadtverwaltung.pjms.persistence;

import com.stadtverwaltung.pjms.model.Comment;
import com.stadtverwaltung.pjms.model.Report;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CommentPersistence {
    private SQLiteDatabase sqLiteDatabase = new SQLiteDatabase();

    public List<Comment> loadCommentsFromDB(String reportID) throws SQLException {
        List<Comment> commentList = new ArrayList<>();
        PreparedStatement selectStatement = sqLiteDatabase.getConnection().prepareStatement("SELECT * FROM comments WHERE reportID = ? ORDER BY timestamp ASC");
        selectStatement.setString(1,reportID);
        ResultSet resultSet = selectStatement.executeQuery();

        while (resultSet.next()) {
            commentList.add(mapComment(resultSet));
        }
        return commentList;
    }

    private Comment mapComment(ResultSet resultSet) throws SQLException {
        Comment returnComment = new Comment();
        returnComment.id = resultSet.getString("id");
        returnComment.content = resultSet.getString("content");
        returnComment.timestamp = resultSet.getString("timestamp");
        returnComment.employeeID = resultSet.getString("employeeID");
        returnComment.reportID = resultSet.getString("reportID");
        return returnComment;
    }

    public String persistComment(Comment comment) throws SQLException {
        PreparedStatement insertStatement = sqLiteDatabase.getConnection().prepareStatement("INSERT INTO comments (id, content, timestamp, reportID, employeeID) VALUES (?,?,?,?,?)");
        String id = sqLiteDatabase.generateID("comments");
        insertStatement.setString(1,id);
        insertStatement.setString(2,comment.content);
        insertStatement.setString(3,comment.timestamp);
        insertStatement.setString(4,comment.reportID);
        insertStatement.setString(5,comment.employeeID);

        int done = insertStatement.executeUpdate();

        if (done == 1) {
            return id;
        } else {
            return null;
        }


    }
}

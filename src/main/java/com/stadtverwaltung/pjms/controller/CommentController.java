package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.model.Comment;
import com.stadtverwaltung.pjms.persistence.CommentPersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
public class CommentController {
    private AuthorizationController authorizationController = new AuthorizationController();
    private JSONController jsonController = new JSONController();

    private CommentPersistence commentPersistence = new CommentPersistence();

    @GetMapping(value = "/comments", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Comment>> getComments(@RequestHeader String reportID) {
        List<Comment> commentList = null;
        try {
            commentList = commentPersistence.loadCommentsFromDB(reportID);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        if (commentList != null) {
            return ResponseEntity.ok(commentList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/comment", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postComment(String json, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        if (authorizationController.hasAuthorization(employeeID, sessionID)) {
            Comment comment = jsonController.getGson().fromJson(json, Comment.class);
            String id = null;
            try {
                id = commentPersistence.persistComment(comment);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

            if (id != null) {
                return ResponseEntity.ok(id);
            } else {
                return ResponseEntity.badRequest().build();
            }

        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}

package com.stadtverwaltung.pjms.controller;


import com.stadtverwaltung.pjms.persistence.ImagePersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;

@RestController
@CrossOrigin
public class ImageController {

    private final ImagePersistence imagePersistence = new ImagePersistence();
    private final AuthorizationController authorizationController = new AuthorizationController();

    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@RequestParam String id) {
        byte[] image = null;

        try {
           image = imagePersistence.getImage(id);
        } catch(IOException ioException) {
        }

        if (image != null) {
            return ResponseEntity.ok(image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> postImage(@RequestParam MultipartFile imageFile) {
        String persist = imagePersistence.persistImage(imageFile);
        if (persist != null) {
            return ResponseEntity.ok(persist);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(value = "/image")
    public ResponseEntity<String> deleteImage(@RequestParam String id, @RequestHeader String employeeID, @RequestHeader String sessionID) {
        String returnID = null;
        try {
            returnID = imagePersistence.deleteImage(id);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (returnID!=null) {
            return ResponseEntity.ok(returnID);
        } else {
            return ResponseEntity.badRequest().build();
        } 
    }
}

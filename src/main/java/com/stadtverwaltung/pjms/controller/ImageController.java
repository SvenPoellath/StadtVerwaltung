package com.stadtverwaltung.pjms.controller;


import com.stadtverwaltung.pjms.persistence.ImagePersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * REST Controller for Image Management
 */
@RestController
@CrossOrigin

public class ImageController {
    /**
     * Connection to Databse
     */
    private final ImagePersistence imagePersistence = new ImagePersistence();

    /**
     * Sends image to frontend for display
     * @param id imageID to load picture from file
     * @return image as arraybuffer/bytestream/bytearray
     */
    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@RequestParam String id) {
        byte[] image;

        try {
           image = imagePersistence.getImage(id);
        } catch(IOException ioException) {
            throw new RuntimeException();
        }

        if (image != null) {
            return ResponseEntity.ok(image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Saves picture sent by frontend in images folder
     * @param imageFile image as an http multipartFile
     * @return String with imageID
     */

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> postImage(@RequestParam MultipartFile imageFile) {
        String persist = imagePersistence.persistImage(imageFile);
        if (persist != null) {
            return ResponseEntity.ok(persist);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}

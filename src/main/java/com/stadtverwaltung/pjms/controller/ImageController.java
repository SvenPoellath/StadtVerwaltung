package com.stadtverwaltung.pjms.controller;


import com.stadtverwaltung.pjms.persistence.ImagePersistence;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class ImageController {

    private final ImagePersistence imagePersistence = new ImagePersistence();

    @PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> postImage(@RequestParam MultipartFile imageFile) {
        String persist = imagePersistence.persistImage(imageFile);
        if (persist != null) {
            return ResponseEntity.ok(persist);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}

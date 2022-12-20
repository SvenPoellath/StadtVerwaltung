package com.stadtverwaltung.pjms.persistence;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class ImagePersistenceTest {

    private final ImagePersistence imagePersistence = new ImagePersistence();
    private String returnID;
    @Test
    void persistImage() {
        MultipartFile multipartFile = new MockMultipartFile("image", new byte[10]);
        returnID = imagePersistence.persistImage(multipartFile);
        assertNotNull(returnID);
    }

    @Test
    void getImage() {
        byte[] returnImage;
        try {
            returnImage = imagePersistence.getImage("sampleImage");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        assertNotNull(returnImage);

    }

    @Test
    void deleteImage() {
        try {
            imagePersistence.deleteImage(returnID);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        byte[] deletedImage;
        try {
            deletedImage = imagePersistence.getImage(returnID);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        assertNull(deletedImage);
    }
}
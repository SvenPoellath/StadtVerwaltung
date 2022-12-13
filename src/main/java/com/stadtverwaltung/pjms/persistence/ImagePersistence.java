package com.stadtverwaltung.pjms.persistence;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImagePersistence {



    public ImagePersistence() {
        Path path = Path.of("images");
        if (!Files.exists(path)) {
            try {
                Files.createDirectory(path);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public String persistImage(MultipartFile image) {
        String id = generateID();
        try {
            Files.copy(image.getInputStream(), Path.of("images").resolve(id + ".jpeg"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (checkIfExists(id)) {
            return id;
        } else {
            return null;
        }



    }

    public String generateID() {
        String id;
        do {
            id = RandomStringUtils.randomAlphanumeric(12);
        } while (checkIfExists(id));
        return id;
    }

    private boolean
    checkIfExists(String id) {
        return Files.exists(Path.of("images/" + id + ".jpeg"));
    }

    public byte[] getImage(String id) throws IOException {
        byte[] returnBytes = null;
        if (checkIfExists(id)) {
            returnBytes = Files.readAllBytes(Path.of("images").resolve(id + ".jpeg"));
        }
        return returnBytes;
    }
}

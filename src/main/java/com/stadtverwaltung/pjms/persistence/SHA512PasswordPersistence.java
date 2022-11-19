package com.stadtverwaltung.pjms.persistence;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Random;

public class SHA512PasswordPersistence {
    private final int LENGTH = 32;
    private final int ITERATIONS = 10000;
    private final int KEY_LENGTH = 256;
    private final Random RANDOM = new SecureRandom();
    private final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public String getSalt() {
        StringBuilder returnValue = new StringBuilder(32);

        for (int i = 0; i < LENGTH; i++)
            returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        return new String (returnValue);
    }

    private byte[] hash(char[] password, byte[] salt) {
        PBEKeySpec spec = new PBEKeySpec(password, salt, ITERATIONS, KEY_LENGTH);
        Arrays.fill(password, Character.MIN_VALUE);
        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            return skf.generateSecret(spec).getEncoded();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new AssertionError("Error while hashing the password: " + e.getMessage(), e);
        } finally {
            spec.clearPassword();
        }
    }

    public String generateSecurePassword(String password, String salt) {
        String returnValue;
        byte[] securePassword = hash(password.toCharArray(), salt.getBytes());
        returnValue = Base64.getEncoder().encodeToString(securePassword);
        return returnValue;
    }

    public boolean verifyUserPassword(String providedPassword, String securePassword, String salt) {
        boolean returnValue;
        if (salt == null)
            return false;
        String passwordToTest = generateSecurePassword(providedPassword,salt);
        returnValue = passwordToTest.equals(securePassword);
        return returnValue;
    }

}
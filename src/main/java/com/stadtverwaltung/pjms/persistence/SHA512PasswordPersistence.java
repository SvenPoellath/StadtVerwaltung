package com.stadtverwaltung.pjms.persistence;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Random;

/**
 * Persistence class for secure password management
 */
public class SHA512PasswordPersistence {
    /**
     * Used as a constant for salt creation
     */
    private final int LENGTH = 32;
    /**
     * Number of iterations for Hashing secure password
     */
    private final int ITERATIONS = 10000;
    /**
     * Length of the Key for Hashing
     */
    private final int KEY_LENGTH = 256;
    /**
     * constant for random hashing generation
     */
    private final Random RANDOM = new SecureRandom();

    /**
     * Alphanumeric String for salt generation
     */
    private final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    /**
     * Generates a random salt
     * @return salt value generated
     */
    public String getSalt() {
        StringBuilder returnValue = new StringBuilder(32);

        for (int i = 0; i < LENGTH; i++)
            returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        return new String (returnValue);
    }

    /**
     * hashes a given password+salt
     * @param password password provided
     * @param salt salt provided
     * @return secure password to be stored / loaded from the database
     */
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

    /**
     * Encodes a secure password in base64
     * @param password unsecure password
     * @param salt raw salt
     * @return base64 encoded secure password
     */
    public String generateSecurePassword(String password, String salt) {
        String returnValue;
        byte[] securePassword = hash(password.toCharArray(), salt.getBytes());
        returnValue = Base64.getEncoder().encodeToString(securePassword);
        return returnValue;
    }

    /**
     * Used for login authorization
     * @param providedPassword password given by employee
     * @param securePassword secure password loaded from database
     * @param salt salt loaded from database
     * @return true if provided data is correct
     */
    public boolean verifyUserPassword(String providedPassword, String securePassword, String salt) {
        boolean returnValue;
        if (salt == null)
            return false;
        String passwordToTest = generateSecurePassword(providedPassword,salt);
        returnValue = passwordToTest.equals(securePassword);
        return returnValue;
    }

}

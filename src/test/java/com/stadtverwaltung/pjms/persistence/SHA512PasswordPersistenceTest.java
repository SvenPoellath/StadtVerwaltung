package com.stadtverwaltung.pjms.persistence;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SHA512PasswordPersistenceTest {

    private final SHA512PasswordPersistence sha512PasswordPersistence = new SHA512PasswordPersistence();
    @Test
    void getSalt() {
        String salt = sha512PasswordPersistence.getSalt();
        assertNotNull(salt);
    }

    @Test
    void generateSecurePassword() {
        String salt = sha512PasswordPersistence.getSalt();
        String password = sha512PasswordPersistence.generateSecurePassword("12345678",salt);
        assertNotNull(password);
    }

    @Test
    void verifyUserPassword() {
        assertTrue(sha512PasswordPersistence.verifyUserPassword("12345678","3ArRDU75+Z2Um0iqlyekRQAUS0DKecjlNWtYc45DtAk=","3dlqr1yfyd5s19PjPb31dD2JRvOIQDi4"));
    }
}
package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.persistence.EmployeePersistence;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    private EmployeePersistence employeePersistence = new EmployeePersistence();
}

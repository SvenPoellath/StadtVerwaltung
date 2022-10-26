package com.stadtverwaltung.pjms.controller;

import com.stadtverwaltung.pjms.persistence.EmployeePersistence;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EmployeeController {
    private EmployeePersistence employeePersistence = new EmployeePersistence();
}

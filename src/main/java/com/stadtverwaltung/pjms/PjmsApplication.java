package com.stadtverwaltung.pjms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class PjmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PjmsApplication.class, args);
	}

}

package com.stadtverwaltung.pjms.controller;

import com.google.gson.Gson;

/**
 * Instantiates Googles GSON Library for JSON Management
 */
public class JSONController {
    /**
     * GSON Instance used by REST Controllers
     */
    private static final Gson gson = new Gson();

    /**
     * Default Constructor
     */
    public JSONController(){}

    /**
     * Method to get gson instance
     * @return gson instance to use in Controllers
     */
    public Gson getGson() {
        return gson;
    }
}

package com.stadtverwaltung.pjms.controller;

import com.google.gson.Gson;

public class JSONController {
    private static final Gson gson = new Gson();

    public JSONController(){}

    public Gson getGson() {
        return gson;
    }
}

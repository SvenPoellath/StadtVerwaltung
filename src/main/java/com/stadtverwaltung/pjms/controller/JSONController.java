package com.stadtverwaltung.pjms.controller;

import com.google.gson.Gson;

public class JSONController {
    private static Gson gson = new Gson();

    public JSONController(){}

    public static Gson getGson() {
        return gson;
    }
}

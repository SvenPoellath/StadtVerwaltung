import React from "react";
import App from "./App.js";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";

/**
 * Renders the Website
 */
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <CookiesProvider>
    <App tab="home" />
  </CookiesProvider>
);

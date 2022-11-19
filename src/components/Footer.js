import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/nutzungsbedingungen">
              <h2>Nutzungsbedingungen</h2>
            </Link>
          </div>
          <div className="footer-link-items">
            <Link to="/datenschutz">
              <h2>Datenschutz</h2>
            </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/impressum">
              <h2>Impressum</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

/**
 * Not Customizable Component which is present on every Page
 * @returns Footer Component
 */
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/nutzungsbedingungen">
              <p>Nutzungsbedingungen</p>
            </Link>
          </div>
          <div className="footer-link-items">
            <Link to="/datenschutz">
              <p>Datenschutz</p>
            </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/impressum">
              <p>Impressum</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

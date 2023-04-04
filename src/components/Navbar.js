import React, { useState, useEffect } from "react";
import { Button } from "./Button.js";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Stadt_Ludwigshafen_logo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Session from "./globalVariables/Session.js";

/**
 * Non-customizable Component which is present on every Page
 * @returns Navbar Component
 */
function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies([
    "session",
    "sessionID",
    "employeeID",
  ]);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  if (cookies.session === "true") {
    Session.isSet = true;
  }
  //Manages Employee Login Button
  const mitarbeiterLogging = () => {
    if (Session.isSet) {
      removeCookies("employeeID", { path: "/" });
      removeCookies("sessionID", { path: "/" });
      setCookie("session", false, { path: "/" });
      Session.isSet = false;
      console.log("Session Cookie: " + cookies.sessionID);
      navigate("/");
    } else {
      console.log("Session Cookie: " + cookies.sessionID);
      navigate("/login");
    }
  };
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <img src={Logo} className="logo-image" alt="Lu" />
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <h1>Ludwigshafen am Rhein</h1>
            <h3 className="stadt">Stadtverwaltung</h3>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Startseite
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/idsearch"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Fall Suchen
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/maps" className="nav-links" onClick={closeMobileMenu}>
                Problem Melden
              </Link>
            </li>
            {Session.isSet ? (
              <li className="nav-item">
                <Link
                  to="/reportOverview"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Fall Übersicht
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Mitarbeiter Anmeldung
              </Link>
            </li>
          </ul>
          {button && (
            <button
              className="btns btn--outline btn--medium"
              onClick={mitarbeiterLogging}
            >
              {Session.isSet ? "Ausloggen" : "Mitarbeiter anmeldung"}
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

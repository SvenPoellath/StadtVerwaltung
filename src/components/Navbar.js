import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Stadt_Ludwigshafen_logo.png";

function Navbar() {
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
            <h3 className="stadt">Stadt Verwaltung</h3>
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
                Probleme Melden
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Mitarbeiter anmeldung
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle="btn--outline" buttonLink="/login">
              Mitarbeiter anmeldung{" "}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

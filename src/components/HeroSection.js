import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>Willkommen in Ludwigshafen</h1>
      <p>
        Ludwigshafen am Rhein [ˈlutvɪçsˌhafn̩ ʔam ʁaɪ̯n oder ˈluːtvɪks-] ist die
        größte Stadt der Pfalz, mit rund 172.000 Einwohnern (Stand 2021) nach
        der Landeshauptstadt Mainz die zweitgrößte Stadt in Rheinland-Pfalz und
        nach Mannheim die zweitgrößte Stadt der Metropolregion Rhein-Neckar.
      </p>
      <h2>Neues Update</h2>
      <p>
        Ab sofort können Sie Defekte und Schäden, Verunreinigungen und auch
        Parkverstöße direkt bei uns auf der Seite melden und wir kümmern uns
        dann darum, dass diese so schnell wie möglich behoben werden. Sie haben
        auch gleich einen Schaden zu melden?
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          buttonLink="/maps"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

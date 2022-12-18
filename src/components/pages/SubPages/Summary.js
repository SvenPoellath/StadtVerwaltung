import React, { useState, useEffect } from "react";
import "./Form.css";
import Report from "../../globalVariables/Report";
import Citizen from "../../globalVariables/Citizen";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import File from "../../globalVariables/File";
import Description from "./Description";
import HCaptcha from "react-hcaptcha";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";

export default function Summary() {
  const navigate = useNavigate();
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });
  const onClick = () => {
    var citizenRequest = new XMLHttpRequest();
    citizenRequest.open("POST", "http://localhost:8080/citizens", false);
    citizenRequest.setRequestHeader("content-type", "application/json");
    citizenRequest.send(JSON.stringify(Citizen));
    Citizen.citizenID = citizenRequest.responseText;
    console.log(JSON.stringify(Citizen));
    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", "http://localhost:8080/reports", false);
    postRequest.setRequestHeader("content-type", "application/json");
    postRequest.send(JSON.stringify(Report));
    Report.id = postRequest.responseText;
    navigate("/idinfopage");
  };
  const print = () => {
    window.print();
  };
  const onVerifyCaptcha = (token) => {
    console.log("Verified");
  };

  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    const imageRequest = new XMLHttpRequest();
    imageRequest.onload = function () {
      console.log("Server response: " + imageRequest.response);
      setImageData(imageRequest.response);
    };
    imageRequest.responseType = "arraybuffer";
    imageRequest.open(
      "GET",
      "http://localhost:8080/image?id=" + Report.pictureID
    );
    imageRequest.send();
  }, []);
  console.log("ImageData before creating blob: " + imageData);
  const blob = new Blob([imageData], { type: "image/jpeg" });
  console.log("Created blob: " + blob);
  const imageUrl = URL.createObjectURL(blob);
  console.log("Created imageURL: " + imageUrl);

  return (
    <div className="Container">
      <img src="icons/Stage 1.png" className="img-header img-header-map" />
      <table>
        <tr>
          <th>
            <h2>Zusammenfassung Ihrer Angaben</h2>
          </th>
        </tr>
        <tr>
          <td>
            <Map
              className="summaryMap"
              center={[Report.latitude, Report.longitude]}
              zoom={13}
              style={{ height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[Report.latitude, Report.longitude]}>
                <Popup>Ihre Standort-Angabe</Popup>
              </Marker>
            </Map>
          </td>
        </tr>
        <tr>
          <td>
            <label className="label Beschreibung-Text">Beschreibung</label>
          </td>
        </tr>
        <tr>
          <td>
            <label className="dataEntry">{Report.description}</label>
          </td>
          <td>
            <img src={imageUrl} alt="img" width="600px" />
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="header">Kontaktinformation</h3>
          </td>
        </tr>
        <tr>
          <td>
            <label className="label">Vorname</label>
          </td>
          <td>
            <label className="label">Nachname</label>
          </td>
        </tr>
        <tr>
          <td>
            <label className="dataEntry">{Citizen.citizenFirstName}</label>
          </td>
          <td>
            <label className="dataEntry">{Citizen.citizenLastName}</label>
          </td>
        </tr>
        <tr>
          <td>
            <label className="label">E-Mail</label>
          </td>
          <td>
            <label className="label">Telefonnummer</label>
          </td>
        </tr>
        <tr>
          <td>
            <label className="dataEntry">{Citizen.citizenEmailAddress}</label>
          </td>
          <td>
            <label className="dataEntry">{Citizen.citizenPhoneNumber}</label>
          </td>
        </tr>
        <tr>
          <td>
            <Button buttonStyle="btn--outline" buttonLink="/maps">
              Zurück
            </Button>
          </td>
          <td>
            <button
              className="btn btn--outline"
              onClick={print}
              style={{ marginTop: "20px" }}
            >
              Seite Drucken
            </button>
          </td>
          <td>
            <button
              className="btn btn--outline"
              onClick={onClick}
              style={{ marginTop: "20px" }}
            >
              Abschicken
            </button>
          </td>
        </tr>
        <tr></tr>
      </table>
    </div>
  );
}
/* <HCaptcha sitekey='49755cd2-2c21-40c3-ab7d-fe8ba9dd0d73' onVerify={onVerifyCaptcha}/> */

import React, { useState, useEffect } from "react";
import "./Form.css";
import Report from "../../globalVariables/Report";
import Citizen from "../../globalVariables/Citizen";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import File from "../../globalVariables/File";
import Description from "./Description";
import HCaptcha from "react-hcaptcha";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import { useCookies } from "react-cookie";

export default function Summary() {
  const [imageResponseStatus, setImageResponseStatus] = useState(false);
  const [angabenVollständig, setAngebenVollständig] = useState(true);
  const [cookies, setCookie, removeCookies] = useCookies([
    "latitude",
    "longitude",
    "citizenFirstName",
    "citizenLastName",
    "citizenEmailAddress",
    "citizenPhoneNumber",
    "description",
    "kindOfReport",
    "pictureID",
  ]);
  const navigate = useNavigate();
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });
  const onClick = () => {
    removeCookies("citizenFirstName", { path: "/" });
    console.log(cookies.latitude);
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
    if (
      citizenRequest.responseText !== "" &&
      citizenRequest.responseText !== ""
    ) {
      navigate("/idinfopage");
    } else {
      alert(
        "Daten konnten nicht hochgeladen werden. Bitte versuchen Sie es erneut oder kontaktieren Sie unseren Support."
      );
    }
  };
  const onVerifyCaptcha = (token) => {
    console.log("Verified");
  };

  const [imageData, setImageData] = useState(null);

  //Loading Picture from Backend
  useEffect(() => {
    const imageRequest = new XMLHttpRequest();
    imageRequest.onload = function () {
      console.log("Server response: " + imageRequest.response);
      setImageData(imageRequest.response);
      console.log("Request Status: " + imageRequest.status);
      if (imageRequest.status === 200) {
        setImageResponseStatus(true);
      } else {
        setImageResponseStatus(false);
      }
    };
    console.log(cookies.pictureID);
    imageRequest.responseType = "arraybuffer";
    imageRequest.open(
      "GET",
      "http://localhost:8080/image?id=" + cookies.pictureID
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
              center={[cookies.latitude, cookies.longitude]}
              zoom={13}
              style={{ height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {angabenVollständig ? (
                <Marker position={[cookies.latitude, cookies.longitude]}>
                  <Popup>Ihre Standort-Angabe</Popup>
                </Marker>
              ) : (
                <Navigate to="/maps" />
              )}
            </Map>
          </td>
          <td>
            {imageResponseStatus ? (
              <img src={imageUrl} alt="img" className="summaryImage" />
            ) : (
              <label></label>
            )}
          </td>
        </tr>
        <tr>
          <td>
            <label className="label Beschreibung-Text">Beschreibung</label>
          </td>
        </tr>
        <tr>
          <td>
            <label className="dataEntry">{cookies.description}</label>
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
            <label className="dataEntry">{cookies.citizenFirstName}</label>
          </td>
          <td>
            <label className="dataEntry">{cookies.citizenLastName}</label>
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
            <label className="dataEntry">{cookies.citizenEmailAddress}</label>
          </td>
          <td>
            <label className="dataEntry">{cookies.citizenPhoneNumber}</label>
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
              className="btn btn--outline btn--medium"
              onClick={window.print()}
              style={{ marginTop: "20px" }}
            >
              Seite Drucken
            </button>
          </td>
          <td>
            <button
              className="btn btn--outline btn--medium"
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

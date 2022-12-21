import React, { useState, useEffect } from "react";
import "./Form.css";
import Report from "../../globalVariables/Report";
import Citizen from "../../globalVariables/Citizen";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import HCaptcha from "react-hcaptcha";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import { useCookies } from "react-cookie";

/**
 * Loads all previously entered Data and displays them in a Summary Page
 * @returns Summary Page
 */
export default function Summary() {
  const [imageResponseStatus, setImageResponseStatus] = useState(false);
  const [cookies, setCookie] = useCookies([
    "latitude",
    "longitude",
    "citizenFirstName",
    "citizenLastName",
    "citizenEmailAddress",
    "citizenPhoneNumber",
    "description",
    "kindOfReport",
    "pictureID",
    "captchaToken",
  ]);

  const navigate = useNavigate();

  //Creates Popup when user tries to reload the page to make the user aware that is might have consequences
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });

  //uploads new Report to Database
  const onClick = () => {
    //if(cookie.captchaToken !== undefined)
    //else{alert("Bitte füllen Sie das Captcha aus bevor Sie auf Abschicken klicken")}
    Citizen.citizenEmailAddress = cookies.citizenEmailAddress;
    Citizen.citizenFirstName = cookies.citizenFirstName;
    Citizen.citizenLastName = cookies.citizenLastName;
    Citizen.citizenPhoneNumber = cookies.citizenPhoneNumber;
    Report.latitude = cookies.latitude;
    Report.longitude = cookies.longitude;
    Report.kindOfReport = cookies.kindOfReport;
    Report.description = cookies.description;
    Report.pictureID = cookies.pictureID;

    var citizenRequest = new XMLHttpRequest();
    citizenRequest.open("POST", "http://localhost:8080/citizens", false);
    citizenRequest.setRequestHeader("content-type", "application/json");
    citizenRequest.send(JSON.stringify(Citizen));
    if (citizenRequest.status === 200) {
      Citizen.citizenID = citizenRequest.responseText;
    }

    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", "http://localhost:8080/reports", false);
    postRequest.setRequestHeader("content-type", "application/json");
    postRequest.send(JSON.stringify(Report));

    console.log(
      "Request for adding a new Citizen has been send to the Database"
    );
    console.log("CitizenID of new Citizen: " + Citizen.citizenID);
    Report.id = postRequest.responseText;
    console.log(
      "Request for adding a new Report has been send to the Database"
    );
    console.log("ReportID of the new Report: " + Report.id);
    if (citizenRequest.status === 200 && postRequest.status === 200) {
      navigate("/idinfopage");
    } else {
      alert(
        "Daten konnten nicht hochgeladen werden. Bitte versuchen Sie es erneut oder kontaktieren Sie unseren Support."
      );
    }
  };
  const onVerifyCaptcha = (token) => {
    setCookie("captchaToken", token, { path: "/" });
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
    console.log("PictureID: " + cookies.pictureID);
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
        <thead>
          <tr>
            <th>
              <h2>Zusammenfassung Ihrer Angaben</h2>
            </th>
          </tr>
        </thead>
        <tbody>
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
                <Marker position={[cookies.latitude, cookies.longitude]}>
                  <Popup>Ihre Standort-Angabe</Popup>
                </Marker>
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
                onClick={window.print}
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
          <tr>
            <td>
              {/* <HCaptcha
                sitekey="49755cd2-2c21-40c3-ab7d-fe8ba9dd0d73"
                onVerify={onVerifyCaptcha}
              /> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

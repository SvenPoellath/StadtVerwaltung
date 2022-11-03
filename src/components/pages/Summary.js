import React, {useState} from "react";
import "./Form.css";
import Report from "../globalVariables/Report";
import Citizen from "../globalVariables/Citizen";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import File from "../globalVariables/File";
import Description from "./Description";

export default function Summary() {
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });

  return (
    <div className="Container">
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
            <img src={Description.image} alt='your image' />
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="header">Kontakt Information</h3>
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
            <label className="dataEntry">{Citizen.firstName}</label>
          </td>
          <td>
            <label className="dataEntry">{Citizen.lastName}</label>
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
            <label className="dataEntry">{Citizen.mailAddress}</label>
          </td>
          <td>
            <label className="dataEntry">{Citizen.phoneNumber}</label>
          </td>
        </tr>
      </table>
    </div>
  );
}

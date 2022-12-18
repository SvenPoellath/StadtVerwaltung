import Search from "react-leaflet-search/lib";
import Report from "../../globalVariables/Report";
import Comment from "../../globalVariables/Comment";
import "./InfoPages.css";
import { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
function SearchResult() {
  const [imageResponseStatus, setImageResponseStatus] = useState(false);
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
    if (imageRequest.status != 0) {
      setImageResponseStatus(true);
    } else {
      setImageResponseStatus(false);
    }
  }, []);
  console.log("ImageData before creating blob: " + imageData);
  const blob = new Blob([imageData], { type: "image/jpeg" });
  console.log("Created blob: " + blob);
  const imageUrl = URL.createObjectURL(blob);
  console.log("Created imageURL: " + imageUrl);
  return (
    <div className="InfoPage-container">
      <div>
        <table className="InfofPage-text">
          <tr>
            <th>
              <h2 className="dataEntry">Zusammenfassung</h2>
            </th>
          </tr>
          <tr>
            <td>
              <label>Fall ID</label>
            </td>
            <td>
              <label>Status</label>
            </td>
          </tr>
          <tr>
            <td>
              <label className="dataEntry">{Report.id}</label>
            </td>
            <td>
              <label className="dataEntry">{Report.status}</label>
            </td>
          </tr>
          <tr>
            <td>
              <Map
                className="summaryMap"
                center={[Report.latitude, Report.longitude]}
                zoom={13}
                style={{ height: "200px" }}
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
            <td className="dataEntry">
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
            <td>
              <label className="label Beschreibung-Text">Kommentar</label>
            </td>
          </tr>
          <tr>
            <td>
              <label className="dataEntry">{Report.description}</label>
            </td>
            <td>
              <label className="dataEntry">{Report.comment}</label>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default SearchResult;

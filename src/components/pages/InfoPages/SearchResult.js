import Search from "react-leaflet-search/lib";
import Report from "../../globalVariables/Report";
import "./InfoPages.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
function SearchResult() {
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
            <td className="dataEntry">"(image)"</td>
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
            <td className="dataEntry">(comment)</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default SearchResult;

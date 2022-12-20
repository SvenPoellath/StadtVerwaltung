import React, { useState, useEffect, useRef } from "react";
import "./Maps.css";
import "./Products.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L, { icon, LatLng } from "leaflet";
import Search from "react-leaflet-search";
import { useNavigate } from "react-router-dom";
import Report from "../../globalVariables/Report";
import { useCookies } from "react-cookie";

/**
 * Displays Maps Page and saves coordinates of the Report Location
 * @returns Maps Page
 */
export default function Maps() {
  const navigate = useNavigate();
  const [searchMarker, setSearchMarker] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [reportDataIsLoaded, setReportDataIsLoaded] = useState(true);
  const [cookies, setCookie] = useCookies(["latitude", "longitude", "site"]);
  const mapRef = useRef();

  var loadReportsRequest = new XMLHttpRequest();
  loadReportsRequest.open("GET", "http://localhost:8080/reports", false);
  loadReportsRequest.send();
  var json;
  try {
    json = JSON.parse(loadReportsRequest.responseText);
  } catch (error) {
    console.log("report data did not load");
    setReportDataIsLoaded(false);
  }

  //useGeoLocation tries to get the current Location of the User
  const useGeoLocation = () => {
    const [location, setLocation] = useState({
      loaded: false,
      coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    };
    const onError = (error) => {
      setLocation({
        loaded: true,
        error,
      });
    };

    useEffect(() => {
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
    return location;
  };

  /*Sets the coordinates of the Report to either the current location of the user or the given location by the search field.
  When there is no location a message pops up to tell the User to provide a location*/
  const setLocation = () => {
    setCookie("site", "true", { path: "/" });
    if (isChecked) {
      if (mylocation.loaded && !mylocation.error) {
        if (
          49.438796 < mylocation.coordinates.lat < 49.563578 &&
          8.378561 < mylocation.coordinates.lng < 8.42719
        ) {
          setCookie("latitude", mylocation.coordinates.lat, { path: "/" });
          setCookie("longitude", mylocation.coordinates.lng, { path: "/" });
          Report.latitude = mylocation.coordinates.lat;
          Report.longitude = mylocation.coordinates.lng;
          console.log("Coordinates have been Saved");
          navigate("/products");
        } else {
          alert(
            "Dein Standort befindet sich leider außerhalb von Ludwigshafen. Bitte gib einen Ort innerhalb von Ludwigshafen an."
          );
        }
      } else {
        alert(mylocation.error.message);
      }
    } else if (searchMarker != null) {
      setCookie("latitude", searchMarker.lat, { path: "/" });
      setCookie("longitude", searchMarker.lng, { path: "/" });
      Report.latitude = searchMarker.lat;
      Report.longitude = searchMarker.lng;
      console.log("Coordinates have been Saved");
      navigate("/products");
    } else {
      alert(
        "Markieren Sie den Standort an dem Sie einen Mängel festgestellt haben!"
      );
    }
  };

  const mylocation = useGeoLocation();
  return (
    <div className="container">
      <img
        className="img-header img-header-map"
        src="icons/Stage 5.png"
        alt="img"
      />
      <table className="map-table">
        <thead>
          <tr>
            <td>
              <h1>Wo befindet sich der Schaden?</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Map
                className="initMap"
                center={[49.4774, 8.4452]}
                zoom={13}
                style={{ height: "400px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {reportDataIsLoaded
                  ? (Object.entries(json) || []).map(([key, data]) => {
                      return (
                        <div key={key}>
                          <Marker position={[data.latitude, data.longitude]}>
                            <Popup>
                              Schadensart: {data.kindOfReport} <br />{" "}
                              Beschreibung: {data.description} <br /> Status:{" "}
                              {data.status}
                            </Popup>
                          </Marker>
                        </div>
                      );
                    })
                  : null}
                <Search
                  className="Search-Box"
                  position="topright"
                  inputPlaceholder="Standort Suchen"
                  showMarker={false}
                  zoom={13}
                  closeResultsOnClick={true}
                  openSearchOnLoad={true}
                  bounds={[
                    [49.438796, 8.42719],
                    [49.563578, 8.274642],
                  ]}
                  providerOptions={{
                    searchBounds: [
                      new LatLng(49.542992, 8.458913),
                      new LatLng(49.445922, 8.374184),
                    ],
                  }}
                >
                  {(info) => (
                    <Marker
                      position={info?.latLng}
                      onadd={setSearchMarker(info?.latLng)}
                    ></Marker>
                  )}
                </Search>
                {mylocation.loaded && !mylocation.error && (
                  <Marker
                    position={[
                      mylocation.coordinates.lat,
                      mylocation.coordinates.lng,
                    ]}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                )}
              </Map>
            </td>
          </tr>
          <tr>
            <td>
              <label className="checkbox">
                <input
                  type="checkbox"
                  onChange={() => setIsChecked((prev) => !prev)}
                />
                Mein Standort verwenden
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btns btn-normal" onClick={setLocation}>
                Weiter
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

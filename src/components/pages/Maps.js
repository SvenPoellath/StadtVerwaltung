import React, { useState, useEffect, useRef } from 'react';
import './Maps.css';
import {
    Map,
    TileLayer,
    Marker,
    Popup
  } from 'react-leaflet'
import { Button } from '../Button';
import L, { LatLng } from 'leaflet';
import Search from 'react-leaflet-search'
import { Link } from 'react-router-dom';


 export default function Maps() {
  const mapRef = useRef();
const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation ({
    loaded: true,
    coordinates: {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    },
  });
};
const onError = (error) => {
  setLocation ({
    loaded: true, error,
  });
}
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition (onSuccess, onError);
  }, []);
  return location;
};
  const handleScrollDown = () => {
    window.scrollTo( { top: 40000, behavior: 'smooth'})
  }
  
  var loadReportsRequest = new XMLHttpRequest();
  loadReportsRequest.open("GET","http://localhost:8080/reports",false);
  loadReportsRequest.send();
  
  const json = JSON.parse(loadReportsRequest.responseText);
  const mylocation = useGeoLocation();  
  const showMyLocation = () => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const geoLocation = mylocation;
    const latlng = [geoLocation.coordinates.lat, geoLocation.coordinates.lng];
    console.log(latlng);
    if (mylocation.loaded && !mylocation.error ){
      map.flyTo(latlng, 14);
    }else{
      alert(mylocation.error.message)
    }
  }
  return (
    <div className='container'>
      <h1>
        Wo befindet sich der schaden?
      </h1>
    <Map center={[49.4774, 8.4452]} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {(Object.entries(json) || []).map(([key, data]) => {
                return(
                  <div key={key}>
                  <Marker position={[data.latitude, data.longitude]}>
                  <Popup>
                    {data.kindOfCase} <br /> {data.description}
                  </Popup>
                </Marker>
                </div>
                );
        })}
        <Search
          className='Search-Box'
          position="topright"
          inputPlaceholder="Search location"
          showMarker={false}
          zoom={13}
          closeResultsOnClick={true}
          openSearchOnLoad={true}
          bounds={[[-1,-18],[1,18]]}
          providerOptions={{
            searchBounds: [
              new LatLng(49.435146, 8.567153),
              new LatLng(49.563578, 8.274642)
            ],
          }}

        >
          {(info) => (
            <Marker position={info?.latLng}></Marker>
          )}
        </Search>
        {mylocation.loaded && !mylocation.error && (
          <Marker position={[mylocation.coordinates.lat, mylocation.coordinates.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
    </Map>
    <button
      className='btns btn-locate'
      buttonStyle='btn--outline'
      buttonSize='btn--medium'
      onClick={showMyLocation}
    >
      My Location
    </button>
    <Link to='/form'>
      <button
          className='btns btn-normal'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleScrollDown}
        >
          Weiter
      </button>
    </Link>
    
    <div className='form-box'>
    <form className='Description-Form'>
      <label>
        Description
        
      </label>
      <input type='text' placeholder='Enter Description'/>
    </form>
    </div>


    </div>
  );
}
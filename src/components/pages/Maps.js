import React from 'react';
import useEffect from 'react'
import useMap from 'react'
import './Maps.css';
import {
    Map,
    TileLayer,
    Marker,
    Popup
  } from 'react-leaflet'
import { Button } from '../Button';
import jsondataa from '/Users/svenpoellath/VS Code Libary/Melcher SE/StadtVerwaltung/src/components/pages/data.json'
import { LatLng } from 'leaflet';
import Search from 'react-leaflet-search'


 export default function Maps() {
  const handleScrollDown = () => {
    window.scrollTo( { top: 40000, behavior: 'smooth'})
  }
  
  var loadReportsRequest = new XMLHttpRequest();
  loadReportsRequest.open("GET","http://localhost:8080/reports",false);
  loadReportsRequest.send();
  
  const json = loadReportsRequest.responseText;
  console.log("Done");

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
          closeResultsOnClick={false}
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
    </Map>
    <button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleScrollDown}
        >
          Weiter
        </button>
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
import React from 'react';
import './Maps.css';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } from 'react-leaflet'
import { Button } from '../Button';
import json from '/Users/svenpoellath/VS Code Libary/Melcher SE/StadtVerwaltung/src/components/pages/data.json'



export default function Map() {
  const handleScrollDown = () => {
    window.scrollTo( { top: 40000, behavior: 'smooth'})
  }

  return (
    <div className='container'>
      <h1>
        Wo befindet sich der schaden?
      </h1>
    <MapContainer center={[49.4774, 8.4452]} zoom={13} style={{ height: "400px" }}>
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

    </MapContainer>
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
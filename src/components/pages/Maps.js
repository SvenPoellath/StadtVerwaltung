import React from 'react';
import './Maps.css';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } from 'react-leaflet'




export default function Map() {
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
      <Marker position={[49.4774, 8.4452]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
}
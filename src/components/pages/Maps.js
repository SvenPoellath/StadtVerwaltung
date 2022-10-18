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
    <MapContainer center={[59.91, 10.75]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[59.91, 10.75]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
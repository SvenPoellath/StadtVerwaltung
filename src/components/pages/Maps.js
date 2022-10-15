import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import '../../App.css';
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup
  } from 'react-leaflet'
  import L from "leaflet";
import { render } from '@testing-library/react';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const position = [51.505, -0.09]
export default function maps({ coords, display_name }) {
    const { latitude, longitude } = coords;
    function MapView() {
      let map = useMap();
      map.setView([latitude, longitude], map.getZoom());
       //Sets geographical center and zoom for the view of the map
      return null;
    }
  
    return (
      <MapContainer
        classsName="map"
        center={[latitude, longitude]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
          contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{display_name}</Popup>
        </Marker>
        <MapView />
      </MapContainer>
    );
  }
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

const AnimalHabitat = ({ animal }) => {
  if (!animal) {
    return null;
  }

  const { nom = 'Inconnu', decouverte = {}, habitatCoords = [] } = animal;

  const defaultPosition = [51.505, -0.09];
  const discoveryPosition = decouverte.coords || defaultPosition;

  if (habitatCoords.length === 0) {
    return (
      <div>
        <h2>Habitat de {nom}</h2>
        <p>Aucune information d'habitat disponible pour cet animal.</p>
        <MapContainer center={discoveryPosition} zoom={5} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {discoveryPosition && (
            <Marker position={discoveryPosition}>
              <Popup>Lieu de découverte de {nom}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Habitat de {nom} : {animal.habitat}
      </h2>
      <MapContainer center={discoveryPosition} zoom={5} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {discoveryPosition && (
          <Marker position={discoveryPosition}>
            <Popup>Lieu de découverte de {nom}</Popup>
          </Marker>
        )}
        {habitatCoords.length > 0 && <Polygon positions={habitatCoords}></Polygon>}
      </MapContainer>
    </div>
  );
};

export default AnimalHabitat;

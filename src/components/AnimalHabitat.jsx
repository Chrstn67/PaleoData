'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import '../styles/AnimalHabitat.css';

const AnimalHabitat = ({ animal }) => {
  const defaultPosition = [51.505, -0.09];
  const discoveryPosition = animal.decouverte.coords || defaultPosition;

  const [mapCenter, setMapCenter] = useState(defaultPosition);

  useEffect(() => {
    if (animal) {
      setMapCenter(discoveryPosition);
    }
  }, [animal, discoveryPosition]);

  if (!animal) {
    return null;
  }

  const { nom = 'Inconnu', decouverte = {}, habitatCoords = [], geologie = {} } = animal;

  const isMultiPolygon = habitatCoords.length > 0 && Array.isArray(habitatCoords[0][0]);

  const renderPolygons = () => {
    if (isMultiPolygon) {
      return habitatCoords.map((coords, index) => (
        <Polygon key={index} positions={coords}>
          <Popup>Zone d&#39;habitat de {nom}</Popup>
        </Polygon>
      ));
    }
    return (
      <Polygon positions={habitatCoords}>
        <Popup>Zone d&#39;habitat de {nom}</Popup>
      </Polygon>
    );
  };

  return (
    <section className="habitat-section">
      <div className="habitat-content">
        <div className="habitat-header">
          <h2>Habitat de {nom}</h2>
          <Link to="https://dinosaurpictures.org/ancient-earth#260" target="blank" className="link-terre">
            🌍 Découvre la Terre d'autrefois
          </Link>
        </div>

        <div className="habitat-info">
          <div className="info-card">
            <h4>🌋 Contexte géologique</h4>
            <p>
              Durant la période <strong>{geologie.periode || 'préhistorique'}</strong>, notre planète ne ressemblait pas
              à ce que nous connaissons aujourd'hui. Les continents étaient disposés différemment et le climat était
              unique.
            </p>
          </div>
          <div className="info-card">
            <h4>🏞️ Description de l'habitat</h4>
            <p>
              {animal.habitat ||
                "Un peu de patience... Des informations détaillées sur l'habitat naturel de cette créature préhistorique arriveront bientôt !"}
            </p>
          </div>
        </div>

        <div className="map-container">
          <div className="map-title">
            🗺️ Localisation géographique {habitatCoords.length > 0 ? "et zones d'habitat" : 'de découverte'}
          </div>
          <div className="map-wrapper">
            <MapContainer
              key={JSON.stringify(mapCenter)}
              center={mapCenter}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {discoveryPosition && (
                <Marker position={discoveryPosition}>
                  <Popup>🦕 Lieu de la première découverte de {nom}</Popup>
                </Marker>
              )}
              {habitatCoords.length > 0 && renderPolygons()}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimalHabitat;

AnimalHabitat.propTypes = {
  animal: PropTypes.shape({
    nom: PropTypes.string,
    decouverte: PropTypes.shape({
      coords: PropTypes.arrayOf(PropTypes.number),
    }),
    habitatCoords: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
    geologie: PropTypes.shape({
      periode: PropTypes.string,
    }),
    habitat: PropTypes.string,
  }).isRequired,
};

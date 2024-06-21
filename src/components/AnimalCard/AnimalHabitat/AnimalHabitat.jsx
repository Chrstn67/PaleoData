import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import './AnimalHabitat.scss';

const AnimalHabitat = ({ animal }) => {
  if (!animal) {
    return null;
  }

  const { nom = 'Inconnu', decouverte = {}, habitatCoords = [], geologie = {} } = animal;

  const defaultPosition = [51.505, -0.09];
  const discoveryPosition = decouverte.coords || defaultPosition;

  // State pour gérer la position de la carte
  const [mapCenter, setMapCenter] = useState(discoveryPosition);

  useEffect(() => {
    setMapCenter(discoveryPosition);
  }, [discoveryPosition]);

  // Vérification si habitatCoords est un tableau de tableaux
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

  if (habitatCoords.length === 0) {
    return (
      <div>
        <h2>Zone d&#39;habitat de {nom}</h2>
        <p>Un peu de patience... Des informations arriveront bientôt !!</p>

        <MapContainer
          key={JSON.stringify(mapCenter)}
          center={mapCenter}
          zoom={5}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    );
  }

  return (
    <section>
      <h2>Habitat de {nom}</h2>
      <Link to="https://dinosaurpictures.org/ancient-earth#260" target="blank" className="link-terre">
        Découvre la Terre d&#39;autrefois
      </Link>
      <p>{animal.habitat}</p>
      <h5>
        Il est important de noter que durant la période {geologie.periode}, notre planète ne ressemblait pas à ce que
        nous connaissons aujourd&#39;hui...
      </h5>

      <MapContainer
        key={JSON.stringify(mapCenter)}
        center={mapCenter}
        zoom={5}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {discoveryPosition && (
          <Marker position={discoveryPosition}>
            <Popup>Lieu de la première découverte de {nom}</Popup>
          </Marker>
        )}
        {renderPolygons()}
      </MapContainer>
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

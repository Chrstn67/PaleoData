import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { iconMappings } from './constantes';
import gisementsData from './gisementsData';
import GisementDetails from './GisementDetails/GisementDetails';

const Gisements = () => {
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const zoomLevel = 2;
  const [selectedGisement, setSelectedGisement] = useState(null);
  const [selectedNotion, setSelectedNotion] = useState('');

  const getCustomIcon = (type) => {
    return new Icon(iconMappings[type] || iconMappings.Gisement);
  };

  const handleMarkerClick = (gisement) => {
    setSelectedGisement(gisement);
  };

  const handleNotionChange = (event) => {
    setSelectedNotion(event.target.value);
    const selectedCity = gisementsData.find((city) => city.notion === event.target.value);
    setSelectedGisement(selectedCity);
  };

  const sortedNotions = gisementsData
    .map((city) => city.notion)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();

  return (
    <>
      <section className="options-sites">
        <select value={selectedNotion} onChange={handleNotionChange}>
          <option value="">Choisir un site fossilifère</option>
          {sortedNotions.map((notion, index) => (
            <option key={index} value={notion}>
              {notion}
            </option>
          ))}
        </select>
      </section>
      <section className="info-carte" style={{ zIndex: -20 }}>
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {gisementsData.map((city, index) => (
              <Marker
                key={index}
                position={city.coordinates}
                icon={getCustomIcon(city.type)}
                eventHandlers={{ click: () => handleMarkerClick(city) }}
              >
                <Popup>{city.notion}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </section>

      <GisementDetails gisement={selectedGisement} />
    </>
  );
};

export default Gisements;

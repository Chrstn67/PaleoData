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

  const getCustomIcon = (type) => {
    return new Icon(iconMappings[type] || iconMappings.Gisement);
  };

  const handleMarkerClick = (gisement) => {
    setSelectedGisement(gisement);
  };

  return (
    <>
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

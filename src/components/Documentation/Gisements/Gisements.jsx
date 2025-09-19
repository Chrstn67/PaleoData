'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BiShareAlt } from 'react-icons/bi';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { iconMappings } from './constantes';
import gisementsData from './gisementsData';
import GisementDetails from './GisementDetails/GisementDetails';
import './Gisements.css';

const Gisements = () => {
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const zoomLevel = 2;
  const [selectedGisement, setSelectedGisement] = useState(null);
  const [selectedNotion, setSelectedNotion] = useState('');

  const navigate = useNavigate();

  // Function to share the entire page
  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Découvrez les sites fossilifères remarquables',
          text: 'Explorez les gisements paléontologiques les plus importants du monde',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    }
  };

  // Function to share specific gisement
  const shareGisement = async (gisement) => {
    if (navigator.share) {
      try {
        const gisementUrl = `${window.location.origin}${window.location.pathname}#/documentation/gisements-fossiliferes?site=${gisement.slug}`;
        await navigator.share({
          title: `Découvre le site fossilifère de ${gisement.notion}`,
          text: `Découvre des informations sur le site fossilifère de ${gisement.notion}.`,
          url: gisementUrl,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    }
  };

  // Handle URL parameters on component mount
  useEffect(() => {
    // Récupérer la partie hash après #
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const searchParams = new URLSearchParams(queryString);

    const siteSlug = searchParams.get('site');
    if (siteSlug) {
      const gisement = gisementsData.find((g) => g.slug === siteSlug);
      if (gisement) {
        setSelectedGisement(gisement);
        setSelectedNotion(gisement.notion);
        setMapCenter(gisement.coordinates);
      }
    }
  }, []);

  const getCustomIcon = (type) => {
    return new Icon(iconMappings[type] || iconMappings.Gisement);
  };

  const handleMarkerClick = (gisement) => {
    setSelectedGisement(gisement);
    setSelectedNotion(gisement.notion);
    // Update URL with site slug (correct route with hash)
    navigate(`/documentation/gisements-fossiliferes?site=${gisement.slug}`);
  };

  const handleNotionChange = (event) => {
    const notion = event.target.value;
    setSelectedNotion(notion);
    const selectedGisement = gisementsData.find((city) => city.notion === notion);
    setSelectedGisement(selectedGisement);
    if (selectedGisement) {
      setMapCenter(selectedGisement.coordinates);
      // Update URL with site slug (correct route with hash)
      navigate(`/documentation/gisements-fossiliferes?site=${selectedGisement.slug}`);
    } else {
      // Clear URL if no selection
      navigate(window.location.pathname);
    }
  };

  const sortedNotions = gisementsData
    .map((city) => city.notion)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();

  return (
    <div className="gisements-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="title-section">
            <h1 className="main-title">Sites Fossilifères</h1>
            <p className="subtitle">Découvrez les gisements paléontologiques les plus remarquables du monde</p>
          </div>

          <div className="selection-section">
            <div className="selector-wrapper">
              <select value={selectedNotion} onChange={handleNotionChange} className="site-selector">
                <option value="">Choisir un site fossilifère</option>
                {sortedNotions.map((notion, index) => (
                  <option key={index} value={notion}>
                    {notion}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="map-section">
        <div className="map-container">
          <MapContainer
            center={mapCenter}
            zoom={zoomLevel}
            style={{ height: '500px', width: '100%', borderRadius: '12px' }}
          >
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
                  <Popup>
                    <div className="popup-content">
                      <h3>{city.notion}</h3>
                      <p>Clique pour plus de détails</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>

      {selectedGisement && (
        <div className="details-section">
          <GisementDetails gisement={selectedGisement} onShare={() => shareGisement(selectedGisement)} />
        </div>
      )}
    </div>
  );
};

export default Gisements;

import React from 'react';
import './GisementDetails.scss';

const GisementDetails = ({ gisement }) => {
  if (!gisement) return null;

  return (
    <div className="gisement-details-comic">
      <div className="gisement-details-header">
        <h3>{gisement.notion}</h3>
      </div>
      <div className="gisement-details-content">
        <div className="gisement-details-illustrations">
          {gisement.illustration.map((img, index) => (
            <img key={index} src={img} alt={gisement.alt} />
          ))}
        </div>
        <div className="gisement-details-speech-bubble">
          <div className="gisement-details-speech-bubble-content">
            <p>{gisement.explications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GisementDetails;

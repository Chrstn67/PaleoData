import React from 'react';
import './GisementDetails.scss';

const GisementDetails = ({ gisement }) => {
  if (!gisement) return null;

  return (
    <section className="gisement-details-comic">
      <header className="gisement-details-header">
        <h3>{gisement.notion}</h3>
      </header>
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
    </section>
  );
};

export default GisementDetails;

import React from 'react';
import decouvertesRecentesData from './decouvertesRecentesData';
import './DecouvertesRecentes.scss';

const sortedDecouvertesRecentesData = [...decouvertesRecentesData].sort((a, b) => a.notion.localeCompare(b.notion));

const DecouvertesRecentes = () => {
  return (
    <div className="decouvertes-container">
      {sortedDecouvertesRecentesData.map((decouverte, index) => (
        <div className="decouverte-comic" key={index}>
          <div className="decouverte-header">
            <h2>{decouverte.notion}</h2>
          </div>
          <div className="decouverte-content">
            <div className="decouverte-illustrations">
              {decouverte.illustrations?.map((illustration, index) => (
                <img src={illustration} alt={`Illustration ${index}`} key={index} />
              ))}
            </div>
            <div className="decouverte-speech-bubble">
              <div className="decouverte-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: decouverte.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DecouvertesRecentes;

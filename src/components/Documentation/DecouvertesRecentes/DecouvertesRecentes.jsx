import React from 'react';
import decouvertesRecentesData from './decouvertesRecentesData';
import './DecouvertesRecentes.css';

const sortedDecouvertesRecentesData = [...decouvertesRecentesData].sort((a, b) => a.notion.localeCompare(b.notion));

const DecouvertesRecentes = () => {
  return (
    <section className="decouverte-container">
      {sortedDecouvertesRecentesData.map((decouverte, index) => (
        <div className="decouverte-comic" key={index}>
          <header className="decouverte-header">
            <h2>{decouverte.notion}</h2>
          </header>
          <div className="decouverte-illustrations">
            {decouverte.illustrations?.map((illustration, index) => (
              <img src={illustration} alt={`Illustration ${index}`} key={index} />
            ))}
          </div>
          <div className="decouverte-content">
            <div className="decouverte-speech-bubble">
              <div className="decouverte-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: decouverte.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DecouvertesRecentes;

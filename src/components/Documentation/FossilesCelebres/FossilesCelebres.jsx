import React from 'react';
import fossilesData from './fossilesData';
import './FossilesCelebres.scss';

const sortedFossilesData = [...fossilesData].sort((a, b) => a.notion.localeCompare(b.notion));

const FossilesCelebres = () => {
  return (
    <section className="fossiles-container">
      {sortedFossilesData.map((fossile, index) => (
        <div className="fossile-comic" key={index}>
          <header className="fossile-header">
            <h2>{fossile.notion}</h2>
          </header>
          <div className="fossile-content">
            <div className="fossile-illustrations">
              {fossile.illustrations?.map((illustration, index) => (
                <img src={illustration} alt={fossile.alt} key={index} />
              ))}
            </div>
            <div className="fossile-speech-bubble">
              <div className="fossile-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: fossile.explications }}></p>
                {fossile.video && (
                  <a href={fossile.video} target="_blank" rel="noopener noreferrer">
                    Plus d'infos en vidéo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FossilesCelebres;

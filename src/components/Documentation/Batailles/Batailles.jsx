import React from 'react';
import bataillesData from './bataillesData';
import './Batailles.scss';

const sortedBataillesData = [...bataillesData].sort((a, b) => a.notion.localeCompare(b.notion));

const Batailles = () => {
  return (
    <section className="bataille-container">
      {sortedBataillesData.map((bataille, index) => (
        <div className="bataille-comic" key={index}>
          <header className="bataille-header">
            <h2>{bataille.notion}</h2>
          </header>
          <div className="bataille-illustrations">
            <img src={bataille.illustrations[0]} alt={bataille.illustrations[0].alt} />
            <span className="vs-text">VS</span>
            <img src={bataille.illustrations[1]} alt={bataille.illustrations[1].alt} />
          </div>
          <div className="bataille-content">
            <div className="bataille-speech-bubble">
              <div className="bataille-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: bataille.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Batailles;

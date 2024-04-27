import React from 'react';
import bataillesData from './bataillesData';
import './Batailles.scss';

const sortedBataillesData = [...bataillesData].sort((a, b) => a.notion.localeCompare(b.notion));

const Batailles = () => {
  return (
    <div className="bataille-container">
      {sortedBataillesData.map((bataille, index) => (
        <div className="bataille-comic" key={index}>
          <div className="bataille-header">
            <h2>{bataille.notion}</h2>
          </div>
          <div className="bataille-content">
            <div className="bataille-illustrations">
              {bataille.illustrations.map((illustration, index) => (
                <img src={illustration} alt={illustration.alt} key={index} />
              ))}
            </div>
            <div className="bataille-speech-bubble">
              <div className="bataille-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: bataille.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Batailles;

import React from 'react';
import paleontologuesData from './paleotologuesData';
import './Paleontologues.scss';

const sortedPaleontologuesData = [...paleontologuesData].sort((a, b) => a.notion.localeCompare(b.notion));

const Paleontologues = () => {
  return (
    <div className="paleontologues-container">
      {sortedPaleontologuesData.map((paleontologue, index) => (
        <div className="paleontologue-comic" key={index}>
          <div className="paleontologue-header">
            <h2>{paleontologue.notion}</h2>
          </div>
          <div className="paleontologue-content">
            <div className="paleontologue-illustrations">
              {paleontologue.illustrations?.map((illustration, index) => (
                <img src={illustration} alt={paleontologue.alt} key={index} />
              ))}
            </div>
            <div className="paleontologue-speech-bubble">
              <div className="paleontologue-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: paleontologue.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Paleontologues;

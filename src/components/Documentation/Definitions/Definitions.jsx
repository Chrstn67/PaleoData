import React from 'react';
import definitionsData from './definitionsData';
import './Definitions.scss';

const sortedDefinitionsData = [...definitionsData].sort((a, b) => a.notion.localeCompare(b.notion));

const Definitions = () => {
  return (
    <div className="definitions-container">
      {sortedDefinitionsData.map((definition, index) => (
        <div className="definition-comic" key={index}>
          <div className="definition-header">
            <h2>{definition.notion}</h2>
          </div>
          <div className="definition-content">
            <div className="definition-illustrations">
              {definition.illustrations?.map((illustration, index) => (
                <img src={illustration} alt={`Illustration ${index}`} key={index} />
              ))}
            </div>
            <div className="definition-speech-bubble">
              <div className="definition-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: definition.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Definitions;

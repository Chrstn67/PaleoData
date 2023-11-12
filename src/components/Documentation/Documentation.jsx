import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Documentation.scss';

const Documentation = ({ documentationData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedDocumentationData = JSON.parse(JSON.stringify(documentationData));

  sortedDocumentationData.sort((a, b) => a.section.localeCompare(b.section));

  sortedDocumentationData.forEach((section) => {
    section.data.sort((a, b) => a.notion.localeCompare(b.notion));
  });

  const filteredSections = sortedDocumentationData.filter((section) => {
    return section.data.some(
      (item) =>
        item.notion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.explications.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  return (
    <section>
      <div className="search-notions">
        <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={handleSearch} />
      </div>
      {filteredSections.length === 0 ? (
        <p>Aucun résultat trouvé.</p>
      ) : (
        filteredSections.map((section, sectionIndex) => (
          <section className="notions" key={sectionIndex}>
            <h3>{section.section}</h3>
            {section.data
              .filter(
                (item) =>
                  item.notion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.explications.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((item, index) => (
                <details key={index}>
                  <summary>{item.notion}</summary>
                  <p dangerouslySetInnerHTML={{ __html: item.explications.replace(/<br\s*[/]?>/gi, '<br />') }} />
                  <img src={item.illustration} alt={item.alt} />

                  {item.video && (
                    <div className="video-container">
                      <iframe
                        title="Title"
                        width="560"
                        height="315"
                        src={item.video.replace('watch?v=', 'embed/')}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  )}
                </details>
              ))}
          </section>
        ))
      )}
    </section>
  );
};

Documentation.propTypes = {
  documentationData: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          notion: PropTypes.string.isRequired,
          explications: PropTypes.string.isRequired,
          illustration: PropTypes.string.isRequired,
          alt: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default Documentation;

import React from 'react';
import PropTypes from 'prop-types';
import './Documentation.scss';

const Documentation = ({ documentationData }) => {
  const sortedDocumentationData = JSON.parse(JSON.stringify(documentationData));

  sortedDocumentationData.sort((a, b) => a.section.localeCompare(b.section));

  sortedDocumentationData.forEach((section) => {
    section.data.sort((a, b) => a.notion.localeCompare(b.notion));
  });

  return (
    <section>
      {sortedDocumentationData.length === 0 ? (
        <p>Aucun résultat trouvé.</p>
      ) : (
        sortedDocumentationData.map((section, sectionIndex) => (
          <section className="notions" key={sectionIndex}>
            <h3>{section.section}</h3>
            {section.data.map((item, index) => (
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

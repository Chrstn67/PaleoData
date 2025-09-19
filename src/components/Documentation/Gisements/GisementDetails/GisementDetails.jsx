import { BiShareAlt } from 'react-icons/bi';
import './GisementDetails.css';

const GisementDetails = ({ gisement, onShare }) => {
  if (!gisement) return null;

  return (
    <article className="gisement-details">
      <div className="share-section">
        <button type="button" className="share-btn" onClick={onShare}>
          <BiShareAlt size={20} className="share-icon" />
        </button>
      </div>
      <div className="hero-content">
        <div className="title-image-section">
          <div className="text-content">
            <h2 className="gisement-title">{gisement.notion}</h2>
          </div>

          {gisement.illustration && gisement.illustration.length > 0 && (
            <div className="image-gallery">
              {gisement.illustration.map((img, index) => (
                <div key={index} className="illustration-item">
                  <div className="image-container">
                    <img src={img || '/placeholder.svg'} alt={gisement.alt} className="gisement-image" />
                  </div>
                  {gisement.alt && <p className="illustration-caption">{gisement.alt}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-section">
          <div className="description-bubble">
            <div className="bubble-content">
              <p dangerouslySetInnerHTML={{ __html: gisement.explications }}></p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GisementDetails;

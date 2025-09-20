import { useState } from 'react';
import { BiShareAlt, BiX } from 'react-icons/bi';
import './GisementDetails.css';

const GisementDetails = ({ gisement, onShare }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gisement) return null;

  const openImageModal = (img) => {
    setSelectedImage(img);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

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
                  <div
                    className="image-container"
                    onClick={() => openImageModal(img)}
                    style={{ cursor: 'pointer' }}
                    title="Cliquer pour agrandir"
                  >
                    <img
                      src={img || '/placeholder.svg'}
                      alt={gisement.alt || `Illustration ${index + 1}`}
                      className="gisement-image"
                    />
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

      {/* Modal image */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={handleModalClick}>
          <div className="image-modal-content">
            <button className="image-modal-close" onClick={closeImageModal}>
              <BiX size={24} />
            </button>
            <img src={selectedImage} alt={gisement.alt || 'Illustration agrandie'} className="image-modal-img" />
            {gisement.alt && (
              <div className="image-modal-caption">
                <p>{gisement.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default GisementDetails;

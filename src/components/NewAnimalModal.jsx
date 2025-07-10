'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AnimalSlide from './AnimalSlide';
import '../styles/NewAnimalModal.css';

const NewAnimalModal = ({ isOpen, onClose, animals }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !animals || animals.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % animals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>🎉 Nouveaux animaux</h2>
          <button className="close-button" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <div className="slides-container">
          <div className="slide-counter">
            {currentSlide + 1} / {animals.length}
          </div>

          <AnimalSlide animal={animals[currentSlide]} onClose={onClose} />

          {animals.length > 1 && (
            <>
              <div className="slide-navigation">
                <button className="nav-button prev" onClick={prevSlide} type="button">
                  ‹
                </button>
                <button className="nav-button next" onClick={nextSlide} type="button">
                  ›
                </button>
              </div>

              <div className="slide-indicators">
                {animals.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    type="button"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

NewAnimalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      date_ajout: PropTypes.string.isRequired,
      regime_alimentaire: PropTypes.string,
      taille: PropTypes.string,
      geologie: PropTypes.shape({
        periode: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default NewAnimalModal;

'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AnimalSlide from './AnimalSlide';
import '../styles/NewAnimalModal.css';

const NewAnimalModal = ({ isOpen, onClose, animals }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Trier les animaux par ordre alphabétique
  const sortedAnimals = animals ? [...animals].sort((a, b) => a.nom.localeCompare(b.nom)) : [];

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

  if (!isOpen || !sortedAnimals || sortedAnimals.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sortedAnimals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sortedAnimals.length) % sortedAnimals.length);
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
    <dialog className="modal-overlay" onClick={handleOverlayClick}>
      <section className="modal-content">
        <section className="modal-header">
          <h2>🎉 Nouveaux animaux</h2>
          <button className="close-button" onClick={onClose} type="button">
            ✕
          </button>
        </section>

        <div className="slides-container">
          <section className="slide-counter">
            {currentSlide + 1} / {sortedAnimals.length}
          </section>

          <AnimalSlide animal={sortedAnimals[currentSlide]} onClose={onClose} />

          {sortedAnimals.length > 1 && (
            <>
              <section className="slide-navigation">
                <button className="nav-button prev" onClick={prevSlide} type="button">
                  ‹
                </button>
                <button className="nav-button next" onClick={nextSlide} type="button">
                  ›
                </button>
              </section>

              <section className="slide-indicators">
                {sortedAnimals.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    type="button"
                  />
                ))}
              </section>
            </>
          )}
        </div>
      </section>
    </dialog>
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

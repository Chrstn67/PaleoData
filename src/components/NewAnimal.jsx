'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NewAnimal.css';

const NewAnimal = ({ animals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const newAnimals = animals.filter((animal) => {
    const dateAjoutee = new Date(animal.date_ajout);
    const dateActuelle = new Date();
    const uneSemaine = 7 * 24 * 60 * 60 * 1000; // 4 jours en millisecondes

    return dateActuelle - dateAjoutee <= uneSemaine;
  });

  if (newAnimals.length === 0) {
    return null;
  }

  const handleClick = () => {
    setIsModalOpen(true);
    setCurrentSlide(0);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentSlide(0);
    document.body.style.overflow = 'unset';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newAnimals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newAnimals.length) % newAnimals.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleLinkClick = () => {
    handleClose(); // Fermer la modale quand on clique sur le lien
  };

  const currentAnimal = newAnimals[currentSlide];

  return (
    <>
      {/* Icône clignotante */}
      <div className="new-animal-notification" onClick={handleClick}>
        <div className="notification-icon">
          <span className="icon">🦕</span>
          <span className="badge">{newAnimals.length}</span>
        </div>
        <span className="notification-text">Nouveaux animaux !</span>
      </div>

      {/* Belle modale */}
      {isModalOpen && (
        <div className="new-animal-modal-overlay" onClick={handleOverlayClick}>
          <div className="new-animal-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h2>🎉 Nouveaux animaux</h2>
              {newAnimals.length > 1 && (
                <div className="slide-counter">
                  {currentSlide + 1} / {newAnimals.length}
                </div>
              )}
              <button className="close-button" onClick={handleClose} type="button">
                ✕
              </button>
            </div>

            {/* Contenu principal */}
            <div className="modal-body">
              <div className="animal-showcase">
                {/* Image */}
                <h3 className="animal-name">{currentAnimal.nom}</h3>
                <div className="animal-image-container">
                  <img
                    src={currentAnimal.image_url || '/placeholder.svg?height=300&width=400'}
                    alt={currentAnimal.nom}
                    className="animal-image"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=300&width=400';
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>

                {/* Informations */}
                <div className="animal-info">
                  {/* Bouton vers la page de l'animal */}
                  <Link
                    to={`/animal/${encodeURIComponent(currentAnimal.nom)}`}
                    className="view-animal-button"
                    onClick={handleLinkClick}
                  >
                    <span className="button-icon">🔍</span>
                    Découvrir cet animal
                    <span className="button-arrow">→</span>
                  </Link>
                </div>
              </div>

              {/* Navigation pour plusieurs animaux */}
              {newAnimals.length > 1 && (
                <>
                  <div className="slide-navigation">
                    <button className="nav-button prev" onClick={prevSlide} type="button" aria-label="Animal précédent">
                      ‹
                    </button>
                    <button className="nav-button next" onClick={nextSlide} type="button" aria-label="Animal suivant">
                      ›
                    </button>
                  </div>

                  {/* Indicateurs */}
                  <div className="slide-indicators">
                    {newAnimals.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        type="button"
                        aria-label={`Aller à l'animal ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

NewAnimal.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      regime_alimentaire: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      geologie: PropTypes.shape({
        ere: PropTypes.string,
        periode: PropTypes.string,
        epoque: PropTypes.string,
        stage: PropTypes.string,
      }),
      // Changez cette ligne pour rendre date_ajout optionnel
      date_ajout: PropTypes.string, // Retirez .isRequired
    }),
  ).isRequired,
};

export default NewAnimal;

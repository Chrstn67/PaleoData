'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NewAnimal.css';

const NewAnimal = ({ animals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const newAnimals = animals
    .filter((animal) => {
      const dateAjoutee = new Date(animal.date_ajout);
      const dateActuelle = new Date();
      const uneSemaine = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes

      return dateActuelle - dateAjoutee <= uneSemaine;
    })
    .sort((a, b) => a.nom.localeCompare(b.nom)); // Tri alphabétique par nom

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
      {/* Notification améliorée */}
      <aside className="new-animal-notification" onClick={handleClick}>
        <div className="notification-icon">
          <span className="icon">🦕</span>
          <span className="badge">{newAnimals.length}</span>
          <div className="pulse-ring"></div>
        </div>
        <div className="notification-tooltip">
          {newAnimals.length === 1
            ? '1 nouvel animal découvert !'
            : `${newAnimals.length} nouveaux animaux découverts !`}
        </div>
      </aside>

      {/* Modale améliorée */}
      {isModalOpen && (
        <dialog className="new-animal-modal-overlay" onClick={handleOverlayClick}>
          <div className="new-animal-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header amélioré */}
            <div className="modal-header">
              <div className="header-content">
                <div className="header-icon">🎉</div>
                <div className="header-text">
                  <h2>Nouvelles découvertes</h2>
                  <p className="header-subtitle">
                    {newAnimals.length === 1
                      ? 'Un nouveau spécimen a été ajouté'
                      : `${newAnimals.length} nouveaux spécimens ont été ajoutés`}
                  </p>
                </div>
              </div>
              {newAnimals.length > 1 && (
                <section className="slide-counter">
                  <span className="counter-current">{currentSlide + 1}</span>
                  <span className="counter-separator">/</span>
                  <span className="counter-total">{newAnimals.length}</span>
                </section>
              )}
              <button className="close-button" onClick={handleClose} type="button" aria-label="Fermer">
                <span className="close-icon">✕</span>
              </button>
            </div>

            {/* Contenu principal amélioré */}
            <section className="modal-body">
              <div className="animal-showcase">
                {/* Nom avec badge "NOUVEAU" intégré */}
                <div className="animal-name-container">
                  <h3 className="animal-name">{currentAnimal.nom}</h3>
                  <span className="new-badge">NOUVEAU</span>
                </div>

                {/* Image améliorée */}
                <section className="animal-image-container">
                  <img
                    src={currentAnimal.image_url || '/placeholder.svg?height=300&width=400'}
                    alt={currentAnimal.nom}
                    className="animal-image"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=300&width=400';
                    }}
                  />
                  <div className="image-frame"></div>
                </section>

                {/* Informations améliorées */}
                <section className="animal-info">
                  <Link
                    to={`/animal/${encodeURIComponent(currentAnimal.nom)}`}
                    className="view-animal-button"
                    onClick={handleLinkClick}
                  >
                    <span className="button-icon">🔍</span>
                    <span className="button-text">Découvrir cet animal</span>
                    <span className="button-arrow">→</span>
                  </Link>
                </section>
              </div>

              {/* Navigation améliorée pour plusieurs animaux */}
              {newAnimals.length > 1 && (
                <>
                  <section className="slide-navigation">
                    <button
                      className="nav-button prev"
                      onClick={prevSlide}
                      type="button"
                      aria-label="Animal précédent"
                      disabled={currentSlide === 0}
                    >
                      <span className="nav-icon">‹</span>
                    </button>
                    <button
                      className="nav-button next"
                      onClick={nextSlide}
                      type="button"
                      aria-label="Animal suivant"
                      disabled={currentSlide === newAnimals.length - 1}
                    >
                      <span className="nav-icon">›</span>
                    </button>
                  </section>

                  {/* Indicateurs améliorés */}
                  <section className="slide-indicators">
                    {newAnimals.map((animal, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        type="button"
                        aria-label={`Voir ${animal.nom}`}
                        title={animal.nom}
                      >
                        <span className="indicator-dot"></span>
                      </button>
                    ))}
                  </section>

                  {/* Aperçu des autres animaux */}
                  <section className="other-animals-preview">
                    <p className="preview-title">Autres nouveaux animaux :</p>
                    <div className="preview-list">
                      {newAnimals.map(
                        (animal, index) =>
                          index !== currentSlide && (
                            <button key={index} className="preview-item" onClick={() => goToSlide(index)} type="button">
                              <img
                                src={animal.image_url || '/placeholder.svg?height=40&width=40'}
                                alt={animal.nom}
                                className="preview-image"
                                onError={(e) => {
                                  e.target.src = '/placeholder.svg?height=40&width=40';
                                }}
                              />
                              <span className="preview-name">{animal.nom}</span>
                            </button>
                          ),
                      )}
                    </div>
                  </section>
                </>
              )}
            </section>
          </div>
        </dialog>
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
      date_ajout: PropTypes.string,
    }),
  ).isRequired,
};

export default NewAnimal;

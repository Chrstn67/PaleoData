'use client';

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiShareAlt, BiX } from 'react-icons/bi';
import GeoInfo from './GeoInfo';
import Taxonomie from './Taxonomie';
import AnimalHabitat from './AnimalHabitat';
import '../styles/AnimalCard.css';

const AnimalCard = ({ data }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { nom } = useParams();

  PropTypes.checkPropTypes({ data: PropTypes.array.isRequired }, { data }, 'prop', 'AnimalCard');

  const animal = data.find((animal) => animal.nom === decodeURIComponent(nom));

  if (!animal) {
    return <div>Animal non trouvé</div>;
  }

  const formatDiets = (regimeAlimentaire) => {
    if (!regimeAlimentaire) return 'Informations à venir...';

    if (Array.isArray(regimeAlimentaire)) {
      return regimeAlimentaire.join(', ');
    }

    if (typeof regimeAlimentaire === 'string') {
      const cleaned = regimeAlimentaire.replace(/[\[\]]/g, '').trim();
      if (cleaned.includes(',')) {
        return cleaned
          .split(',')
          .map((diet) => diet.trim())
          .join(', ');
      }
      return cleaned;
    }

    return 'Informations à venir...';
  };

  const imageUrl = `${animal.image_url}`;

  const shareLink = async (animal) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Découvre des informations sur ${animal.nom}.`,
          text: `Découvre des informations sur ${animal.nom}.`,
          url: `${window.location.origin}/PaleoData/#/animal/${encodeURIComponent(animal.nom)}`,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    }
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  const sortedData = [...data].sort((a, b) => a.nom.localeCompare(b.nom));
  const currentAnimalIndex = sortedData.findIndex((animal) => animal.nom === decodeURIComponent(nom));
  const previousAnimal = currentAnimalIndex > 0 ? sortedData[currentAnimalIndex - 1] : null;
  const nextAnimal = currentAnimalIndex < sortedData.length - 1 ? sortedData[currentAnimalIndex + 1] : null;

  return (
    <main className="animal-card">
      <header className="hero-section">
        <div className="hero-content-wrapper">
          <section className="title-image-section">
            <h2 className="animal-name">{animal.nom}</h2>
            <div className="image-wrapper">
              <img
                src={imageUrl}
                alt={animal.nom}
                className="hero-image"
                onClick={openImageModal}
                style={{ cursor: 'pointer' }}
                title="Cliquer pour agrandir"
                loading="eager"
              />
              <div className="image-overlay">
                <span className="zoom-hint">🔍 Agrandir</span>
              </div>
            </div>
          </section>
          <button
            aria-label="Partager"
            type="button"
            className="share-btn"
            onClick={() => {
              shareLink(animal);
            }}
          >
            <BiShareAlt size={20} />
          </button>
        </div>
      </header>

      {/* Modal pour l'image agrandie */}
      {isImageModalOpen && (
        <section className="image-modal-overlay" onClick={handleModalClick}>
          <div className="image-modal-content">
            <button className="image-modal-close" onClick={closeImageModal} aria-label="Fermer">
              <BiX size={24} />
            </button>
            <img src={imageUrl} alt={animal.nom} className="image-modal-img" />
            <div className="image-modal-caption">
              <h3>{animal.nom}</h3>
              {animal.etymologie && <p>{animal.etymologie}</p>}
            </div>
          </div>
        </section>
      )}

      <section className="main-container">
        <section className="etymology-content">
          <h3 className="etymology-title">Étymologie</h3>
          <p className="etymology-text">
            {animal.etymologie || 'Les origines du nom de cette créature fascinante restent à découvrir...'}
          </p>
        </section>

        <section className="content-section">
          <section className="content-card description-card">
            <h3>Description</h3>
            <div className="description-content">
              {animal.description ? (
                <div dangerouslySetInnerHTML={{ __html: animal.description }} />
              ) : (
                <p>Description détaillée à venir...</p>
              )}
            </div>
          </section>

          <section className="info-grid">
            <section className="content-card">
              <h3>Régime alimentaire</h3>
              <p>{formatDiets(animal.regime_alimentaire)}</p>
            </section>

            <section className="content-card">
              <h3>Morphologie</h3>
              {animal.autres_infos && animal.autres_infos.taille ? (
                <>
                  {animal.autres_infos.taille.longueur && <p>{animal.autres_infos.taille.longueur} de long</p>}
                  {animal.autres_infos.taille.hauteur && <p>{animal.autres_infos.taille.hauteur} de haut</p>}
                  {animal.autres_infos.taille.envergure && <p>{animal.autres_infos.taille.envergure} d'envergure</p>}
                  {animal.autres_infos.poids && <p>{animal.autres_infos.poids}</p>}
                </>
              ) : (
                <p>Informations morphologiques à venir...</p>
              )}
            </section>

            <section className="content-card">
              <h3>Découverte</h3>
              {animal.decouverte ? (
                <>
                  {animal.decouverte.date && <p>Date : {animal.decouverte.date}</p>}
                  {animal.decouverte.lieu && <p>Lieu : {animal.decouverte.lieu}</p>}
                </>
              ) : (
                <p>Informations sur la découverte à venir...</p>
              )}
            </section>
          </section>

          {/* GeoInfo placé ici, sous Régime / Morphologie / Découverte */}
          <GeoInfo key={animal.nom} geologie={animal.geologie} animalNom={animal.nom} />
        </section>

        <section className="habitat-section-wrapper">
          <AnimalHabitat animal={animal} />
        </section>

        <section className="taxonomy-section-wrapper">
          {Object.entries(animal.taxonomie).length > 0 && <Taxonomie taxonomie={animal.taxonomie} />}
        </section>
      </section>

      <section className="navigation-section">
        <section className="navigation-links">
          {previousAnimal && (
            <Link
              to={`/animal/${encodeURIComponent(previousAnimal.nom)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              ← {previousAnimal.nom}
            </Link>
          )}

          {nextAnimal && (
            <Link
              to={`/animal/${encodeURIComponent(nextAnimal.nom)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              {nextAnimal.nom} →
            </Link>
          )}
        </section>
      </section>
    </main>
  );
};

AnimalCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AnimalCard;

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

  // Fonction pour parser et formater les régimes alimentaires
  const formatDiets = (regimeAlimentaire) => {
    if (!regimeAlimentaire) return 'Informations à venir...';

    // Si c'est déjà un tableau, le joindre
    if (Array.isArray(regimeAlimentaire)) {
      return regimeAlimentaire.join(', ');
    }

    // Si c'est une chaîne qui ressemble à un tableau : '[Carnivore, insectivore, piscivore]'
    if (typeof regimeAlimentaire === 'string') {
      // Nettoyer la chaîne et la diviser
      const cleaned = regimeAlimentaire.replace(/[\[\]]/g, '').trim();
      if (cleaned.includes(',')) {
        return cleaned
          .split(',')
          .map((diet) => diet.trim())
          .join(', ');
      }
      // Si pas de virgule, c'est un seul régime
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
    <div className="animal-card">
      <div className="hero-section">
        <div className="hero-content">
          <div className="title-image-section">
            <h1>{animal.nom}</h1>
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={animal.nom}
              className="hero-image"
              onClick={openImageModal}
              style={{ cursor: 'pointer' }}
              title="Cliquer pour agrandir"
            />
          </div>
          <button
            type="button"
            className="share-btn"
            onClick={() => {
              shareLink(animal);
            }}
          >
            <BiShareAlt size={20} />
          </button>
        </div>
      </div>

      {/* Modal pour l'image agrandie */}
      {isImageModalOpen && (
        <div className="image-modal-overlay" onClick={handleModalClick}>
          <div className="image-modal-content">
            <button className="image-modal-close" onClick={closeImageModal}>
              <BiX size={24} />
            </button>
            <img src={imageUrl || '/placeholder.svg'} alt={animal.nom} className="image-modal-img" />
            <div className="image-modal-caption">
              <h3>{animal.nom}</h3>
              {animal.etymologie && <p>{animal.etymologie}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        <div className="etymology-section">
          <div className="etymology-content">
            <h3 className="etymology-title">Étymologie</h3>
            <p className="etymology-text">
              {animal.etymologie || 'Les origines du nom de cette créature fascinante restent à découvrir...'}
            </p>
          </div>
        </div>

        <div className="geology-section">
          <GeoInfo geologie={animal.geologie} />
        </div>

        <div className="content-section">
          <div className="content-card description-card">
            <h3>Description</h3>
            <div className="description-content">
              {animal.description ? (
                <div dangerouslySetInnerHTML={{ __html: animal.description }} />
              ) : (
                <p>Description détaillée à venir...</p>
              )}
            </div>
          </div>

          <div className="info-grid">
            <div className="content-card">
              <h3>Régime alimentaire</h3>
              <p>{formatDiets(animal.regime_alimentaire)}</p>
            </div>

            <div className="content-card">
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
            </div>

            <div className="content-card">
              <h3>Découverte</h3>
              {animal.decouverte ? (
                <>
                  {animal.decouverte.date && <p>Date : {animal.decouverte.date}</p>}
                  {animal.decouverte.lieu && <p>Lieu : {animal.decouverte.lieu}</p>}
                </>
              ) : (
                <p>Informations sur la découverte à venir...</p>
              )}
            </div>
          </div>
        </div>

        <div className="habitat-section-wrapper">
          <AnimalHabitat animal={animal} />
        </div>

        <div className="taxonomy-section-wrapper">
          {Object.entries(animal.taxonomie).length > 0 && <Taxonomie taxonomie={animal.taxonomie} />}
        </div>
      </div>

      <div className="navigation-section">
        <div className="navigation-links">
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
        </div>
      </div>
    </div>
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

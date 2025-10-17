'use client';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/AnimalSlide.css';

const AnimalSlide = ({ animal, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <aside className="animal-slide">
      <img
        src={animal.image_url || '/placeholder.svg?height=250&width=300'}
        alt={animal.nom}
        onError={(e) => {
          e.target.src = '/placeholder.svg?height=250&width=300';
        }}
      />

      <dialog className="animal-info">
        <h3>{animal.nom}</h3>
        <section className="animal-details">
          {animal.regime_alimentaire && (
            <p>
              <strong>🍽️ Régime :</strong> {animal.regime_alimentaire}
            </p>
          )}
          {animal.geologie?.periode && (
            <p>
              <strong>⏰ Période :</strong> {animal.geologie.periode}
            </p>
          )}
          {animal.taille && (
            <p>
              <strong>📏 Taille :</strong> {animal.taille}
            </p>
          )}
          {animal.date_ajout && (
            <p>
              <strong>📅 Ajouté le :</strong> {new Date(animal.date_ajout).toLocaleDateString('fr-FR')}
            </p>
          )}
        </section>
        <Link to={`/animal/${encodeURIComponent(animal.nom)}`} className="view-animal-btn" onClick={handleLinkClick}>
          Voir la fiche complète 🔍
        </Link>
      </dialog>
    </aside>
  );
};

AnimalSlide.propTypes = {
  animal: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    date_ajout: PropTypes.string.isRequired,
    regime_alimentaire: PropTypes.string,
    taille: PropTypes.string,
    geologie: PropTypes.shape({
      periode: PropTypes.string,
    }),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnimalSlide;

import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './AnimalListingSection.scss';

const AnimalListingSection = ({ animals }) => {
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

  return (
    <section className="animal-listing">
      <ul>
        {animals.map((animal) => (
          <li key={animal.nom}>
            <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
              <img src={animal.image_url} alt={animal.nom} />
              <h3>{animal.nom}</h3>
            </Link>
            <button
              type="button"
              onClick={() => {
                shareLink(animal);
              }}
            >
              <BiShareAlt size={20} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AnimalListingSection;

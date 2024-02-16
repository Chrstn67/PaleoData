import React, { useRef } from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './AnimalListingSection.scss';

const AnimalCard = ({ animal }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    cardRef.current.style.transform = `perspective(500px) rotateX(${y * 20}deg) rotateY(${x * 20}deg)`;
  };

  const resetCardTransform = () => {
    cardRef.current.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  };

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
    <li ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetCardTransform}>
      <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
        <img src={animal.image_url} alt={animal.nom} />
        <h3>{animal.nom}</h3>
      </Link>
      <button type="button" onClick={shareLink}>
        <BiShareAlt size={20} />
      </button>
    </li>
  );
};

const AnimalListingSection = ({ animals }) => {
  return (
    <section className="animal-listing">
      <ul>
        {animals.map((animal) => (
          <AnimalCard key={animal.nom} animal={animal} />
        ))}
      </ul>
    </section>
  );
};

export default AnimalListingSection;

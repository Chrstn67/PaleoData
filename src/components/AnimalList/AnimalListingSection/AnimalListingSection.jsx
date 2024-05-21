import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NewAnimal from './NewAnimal/NewAnimal';
import './AnimalListingSection.scss';

const AnimalCard = ({ animal }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    cardRef.current.style.transform = `perspective(500px) rotateX(${y * -20}deg) rotateY(${x * 20}deg)`;
  };

  const resetCardTransform = () => {
    cardRef.current.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <li ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetCardTransform}>
      <div className="image-container">
        <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
          <img src={animal.image_url} alt={animal.nom} />
          <h3>{animal.nom}</h3>
        </Link>
      </div>
    </li>
  );
};

AnimalCard.propTypes = {
  animal: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

const AnimalListingSection = ({ animals }) => {
  return (
    <>
      <NewAnimal animals={animals} />
      <section className="animal-listing">
        <h3 className="h3-title">Liste : {animals.length} animaux</h3>

        <ul>
          {animals.length > 0 ? (
            animals.map((animal) => <AnimalCard key={animal.nom} animal={animal} />)
          ) : (
            <h5>Aucun animal ne correspond aux critères choisis.</h5>
          )}
        </ul>
      </section>
    </>
  );
};

AnimalListingSection.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AnimalListingSection;

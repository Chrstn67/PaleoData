import PropTypes from 'prop-types';
import { BiShareAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// import './NewAnimal.scss';

const NewAnimal = ({ animals }) => {
  const newAnimals = animals.filter((animal) => {
    const dateAjoutee = new Date(animal.date_ajout);
    const dateActuelle = new Date();
    const uneSemaine = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes

    return dateActuelle - dateAjoutee <= uneSemaine;
  });

  if (newAnimals.length === 0) {
    return <p>De nouveaux animaux seront bientôt mis en ligne</p>;
  }

  return (
    <section className="new-animal">
      <ul>
        {newAnimals.map((animal) => (
          <li key={animal.nom}>
            <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
              <img src={animal.image_url} alt={animal.nom} />
              <h3>{animal.nom}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

NewAnimal.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      dateAjoutée: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default NewAnimal;

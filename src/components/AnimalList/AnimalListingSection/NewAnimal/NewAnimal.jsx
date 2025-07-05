import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NewAnimal.css';

const NewAnimal = ({ animals }) => {
  const newAnimals = animals.filter((animal) => {
    const dateAjoutee = new Date(animal.date_ajout);
    const dateActuelle = new Date();
    const uneSemaine = 4 * 24 * 60 * 60 * 1000; // 4 jours en millisecondes

    return dateActuelle - dateAjoutee <= uneSemaine;
  });

  if (newAnimals.length === 0) {
    return <h5>De nouveaux animaux seront bientôt mis en ligne. Contacte-nous pour proposer tes idées !</h5>;
  }

  return (
    <section className="new-animal">
      <h3 className="h3-title">Nouveaux animaux</h3>
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

import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import NewAnimal from './NewAnimal';
import '../styles/AnimalListingSection.css';

const AnimalCard = ({ animal }) => {
  const cardRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);

  // Vérifier si l'animal a des médias (image et/ou vidéo)
  useEffect(() => {
    if (animal.image_url) {
      if (Array.isArray(animal.image_url) && animal.image_url.length > 0) {
        // Si c'est un tableau, utiliser le premier élément comme média initial
        setMediaUrl(animal.image_url[0]);
        setIsVideo(animal.image_url[0]?.endsWith('.mp4') || animal.image_url[0]?.endsWith('.webm'));
      } else if (typeof animal.image_url === 'string') {
        // Si c'est une chaîne, vérifier si c'est une vidéo
        setMediaUrl(animal.image_url);
        setIsVideo(animal.image_url.endsWith('.mp4') || animal.image_url.endsWith('.webm'));
      }
    }
  }, [animal.image_url]);

  // Alterner entre image et vidéo toutes les 5 secondes
  useEffect(() => {
    // Vérifier si nous avons un tableau avec au moins 2 éléments
    if (!Array.isArray(animal.image_url) || animal.image_url.length < 2) {
      return;
    }

    const interval = setInterval(() => {
      setIsVideo((prev) => {
        const newIsVideo = !prev;
        // Sélectionner le média approprié en fonction du type
        const mediaToShow = newIsVideo
          ? animal.image_url.find((url) => url.endsWith('.mp4') || url.endsWith('.webm'))
          : animal.image_url.find((url) => !url.endsWith('.mp4') && !url.endsWith('.webm'));

        if (mediaToShow) {
          setMediaUrl(mediaToShow);
        }
        return newIsVideo;
      });
    }, 3000); // 3000ms = 3 secondes

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [animal.image_url]);

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

  // Si aucun média n'est disponible, ne rien afficher
  if (!mediaUrl) {
    return null;
  }

  const isVideoMedia = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm');

  return (
    <li ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetCardTransform}>
      <div className="image-container">
        <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
          {isVideoMedia ? (
            <video src={mediaUrl} alt={animal.nom} muted loop autoPlay playsInline className="animal-media" />
          ) : (
            <img src={mediaUrl} alt={animal.nom} className="animal-media" />
          )}
          <h3>{animal.nom}</h3>
        </Link>
      </div>
    </li>
  );
};

AnimalCard.propTypes = {
  animal: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    image_url: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  }).isRequired,
};

const AnimalListingSection = ({ animals, onAnimalCount }) => {
  const animalCount = animals.length;

  useEffect(() => {
    onAnimalCount(animalCount);
  }, [animalCount, onAnimalCount]);

  return (
    <>
      <NewAnimal animals={animals} />
      <section className="animal-listing">
        <section className="footer-suggest">
          <a href="https://tally.so/r/ODdyV7" target="_blank" rel="noopener noreferrer" className="suggest-animal-btn">
            <FaPaw className="suggest-icon" />
            <div className="suggest-text">
              <span className="suggest-title">Proposer un animal</span>
              <span className="suggest-subtitle">Tes animaux préférés ne sont pas listés ? Alors propose-les !</span>
            </div>
            <span className="suggest-arrow">→</span>
          </a>
        </section>
        <h3 className="h3-title">Animaux</h3>
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
      image_url: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
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
  onAnimalCount: PropTypes.func.isRequired,
};

export default AnimalListingSection;

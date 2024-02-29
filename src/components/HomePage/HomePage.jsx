import { useRef } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/data';
import './HomePage.scss';

const HomePage = () => {
  const getRandomAnimal = (animalData) => {
    const randomIndex = Math.floor(Math.random() * animalData.length);
    return animalData[randomIndex];
  };

  const randomAnimal = getRandomAnimal(data);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    cardRef.current.style.transform = `perspective(500px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
  };

  const resetCardTransform = () => {
    cardRef.current.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div className="home-page">
      <section className="about-section">
        <p>
          PaleoData est votre source ultime d&apos;informations sur la paléontologie, offrant des données sur les
          créatures étonnantes du Paléozoïque jusqu&apos;à nos jours.
        </p>
        <br />

        {randomAnimal && (
          <div className="random-animal-section">
            <ul>
              <li key={randomAnimal.nom} ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetCardTransform}>
                <Link to={`/animal/${encodeURIComponent(randomAnimal.nom)}`}>
                  <img src={randomAnimal.image_url} alt={randomAnimal.nom} />
                  <h3>{randomAnimal.nom}</h3>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

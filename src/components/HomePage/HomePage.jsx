import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/data';
import './HomePage.scss';

const HomePage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h2>PaleoData</h2>
          <p>Découvrez le monde fascinant des créatures anciennes.</p>
          <Link to="/animaux" className="explore-btn" onClick={scrollToTop}>
            Voir les animaux
          </Link>
        </div>
        <img src="/images/dino-fossil.jpg" alt="Fossile de dinosaure" className="hero-image" />
      </section>

      <section className="about-section">
        <h2>À Propos du site</h2>
        <p>
          Vous avez la possibilité d'obtenir des informations sur les animaux ayant peuplés notre belle planète. Voyagez
          dans le temps, et recherchez toutes les informations dont vous avez besoin pour satisfaire votre curiosité !
        </p>
        <Link to="/documentation" className="learn-more-btn" onClick={scrollToTop}>
          En savoir plus
        </Link>
      </section>

      <section className="contact-section">
        <h2>Contactez-nous</h2>
        <p>Pour toutes questions ou remarques, contactez-nous !</p>
        <Link to="/nous-contacter" className="contact-btn" onClick={scrollToTop}>
          Nous contacter
        </Link>
      </section>
    </div>
  );
};

export default HomePage;

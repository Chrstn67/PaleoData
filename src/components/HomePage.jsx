'use client';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaBook, FaInfoCircle } from 'react-icons/fa';
import { GiDinosaurRex } from 'react-icons/gi';
import PropTypes from 'prop-types';
import NewAnimal from './NewAnimal';
import '../styles/HomePage.css';

const HomePage = ({ animals }) => {
  const ref = useRef(null);

  const scrollToTop = () => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className="home-page" ref={ref}>
      {/* Passer la prop animals au composant NewAnimal */}
      <NewAnimal animals={animals} />

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <GiDinosaurRex />
          </div>
          <h1 className="hero-title">PaleoData</h1>
          <p className="hero-subtitle">Explorez la fascinante histoire de la vie sur Terre</p>
          <div className="hero-description">
            <p>
              Découvrez des centaines d'animaux préhistoriques, imaginez leur mode de vie et leur environnement en
              voyageant dans le temps, dans cet univers passé qui émerveille petits et grands.
            </p>
          </div>
          <div className="stats-badge">
            <span className="stats-number">{animals.length}</span>
            <span className="stats-label">animaux disponibles</span>
          </div>
        </div>
        <div className="hero-background">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Explorez nos collections</h2>
          <p>Plongez dans l'univers fascinant de la paléontologie</p>
        </div>
        <div className="features-grid">
          <article className="feature-card primary">
            <div className="card-icon">
              <GiDinosaurRex />
            </div>
            <div className="card-content">
              <h3>Animaux Préhistoriques</h3>
              <p>
                Découvrez les dernières informations sur vos animaux favoris. Une collection complète avec{' '}
                <strong>{animals.length} espèces</strong>
                documentées.
              </p>
              <Link to="/animaux" onClick={scrollToTop} className="card-link">
                Explorer les animaux
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </article>

          <article className="feature-card">
            <div className="card-icon">
              <FaHistory />
            </div>
            <div className="card-content">
              <h3>Échelle Géologique</h3>
              <p>Voyagez à travers les ères géologiques et découvrez l'évolution de la vie sur notre planète.</p>
              <Link to="/echelle-des-temps-geologiques" onClick={scrollToTop} className="card-link">
                Voyager dans le temps
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </article>

          <article className="feature-card">
            <div className="card-icon">
              <FaBook />
            </div>
            <div className="card-content">
              <h3>Étymologie</h3>
              <p>Apprenez l'origine fascinante des noms des animaux préhistoriques et leur signification.</p>
              <Link to="/liste-etymologique" onClick={scrollToTop} className="card-link">
                Découvrir les origines
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </article>

          <article className="feature-card">
            <div className="card-icon">
              <FaInfoCircle />
            </div>
            <div className="card-content">
              <h3>Documentation</h3>
              <p>
                Les dernières découvertes paléontologiques, les paléontologues célèbres, et bien d'autres informations
                passionnantes.
              </p>
              <Link to="/documentation" onClick={scrollToTop} className="card-link">
                Lire la documentation
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

HomePage.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      // Changez cette ligne pour accepter string OU array
      regime_alimentaire: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      geologie: PropTypes.shape({
        ere: PropTypes.string,
        periode: PropTypes.string,
        epoque: PropTypes.string,
        stage: PropTypes.string,
      }),
      date_ajout: PropTypes.string, // Retirez .isRequired si ce champ est optionnel
    }),
  ).isRequired,
};
export default HomePage;

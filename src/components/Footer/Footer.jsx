import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Liens</h3>
          <ul className="footer-links">
            <li>
              <Link className="footer-link" to="/">
                Accueil
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/animaux">
                Animaux
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/echelle-des-temps-geologiques">
                Échelle des temps
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/liste-etymologique">
                Etymologie
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/documentation">
                Documentation
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Contactez-nous</h3>
          <Link to="https://discord.gg/fT97dr49Tv" target="_blank" rel="noopener noreferrer" title="Discord">
            <FaDiscord className="footer-discord-icon" />
          </Link>{' '}
          <Link href="mailto:paleodata@outlook.com" target="_blank" rel="noopener noreferrer" title="Mail">
            <FaEnvelope className="footer-email-icon" />
          </Link>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">À propos</h3>
          <p className="footer-text">
            PaleoData est votre porte d'entrée dans le monde de la vie ancienne. Notre mission est de fournir un accès
            aux données et aux informations paléontologiques aux données et informations paléontologiques de manière
            ouverte et conviviale.
          </p>
        </div>
        <div className="footer-section">
          <img src="Logo.jpg" alt="Logo développeur" className="footer-logo" />
          <p className="footer-copyright">
            &copy; {currentYear} PaleoData. Tous droits réservés. <br />{' '}
            <Link className="footer-link" to="/mentions-legales">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

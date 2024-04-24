import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <section className="footer-content">
        <section className="footer-section">
          <h3 className="footer-title">Viens discuter !</h3>
          <div>
            <Link to="https://discord.gg/fT97dr49Tv" target="_blank" rel="noopener noreferrer" title="Discord">
              <FaDiscord className="footer-discord-icon" />
            </Link>{' '}
            <Link href="mailto:paleodata@outlook.com" target="_blank" rel="noopener noreferrer" title="Mail">
              <FaEnvelope className="footer-email-icon" />
            </Link>{' '}
            <br />
            <i>
              Nous nous engageons résolument à observer rigoureusement les dispositions du RGPD en matière de protection
              des données, et nous nous assurons ainsi de n&apos;utiliser tes coordonnées que dans le cadre des échanges
              liés au sujet principal du site.
            </i>
          </div>
        </section>
        <section className="footer-section">
          <h3 className="footer-title">À propos</h3>
          <p className="footer-text">
            PaleoData est ta porte d'entrée dans le monde de la vie ancienne. Notre mission est de fournir un accès aux
            données et aux informations paléontologiques aux données et informations paléontologiques de manière ouverte
            et conviviale.
          </p>
        </section>
        <section className="footer-section">
          <img src="Logo.jpg" alt="Logo développeur" className="footer-logo" />
          <p className="footer-copyright">
            &copy; {currentYear} PaleoData. Tous droits réservés. <br />{' '}
            <Link className="footer-link" to="/mentions-legales">
              Mentions légales
            </Link>
          </p>
        </section>
      </section>
    </footer>
  );
};

export default Footer;

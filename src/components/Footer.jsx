import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaEnvelope, FaLinkedin, FaWhatsapp, FaArrowUp, FaPaw } from 'react-icons/fa';

import EmailModal from './EmailModal';

import '../styles/Footer.css';

const Footer = () => {
  const ref = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Retour en haut">
        <FaArrowUp />
      </button>

      <section className="footer-container">
        {/* Section principale */}
        <section className="footer-main">
          {/* Logo et description */}
          <section className="footer-brand">
            <div className="brand-logo">
              <img src="Logo.jpg" alt="Logo PaleoData" className="logo-image" />
              <h2 className="brand-name">PaleoData</h2>
            </div>
            <p className="brand-description">
              Ta porte d'entrée dans le monde de la vie ancienne. Notre mission est de fournir un accès aux données et
              aux informations paléontologiques de manière ouverte et conviviale.
            </p>
          </section>

          {/* Section Contact */}
          <section className="footer-contact">
            <h3 className="section-title">Viens discuter !</h3>
            <div className="social-grid">
              <a
                href="https://discord.gg/EeWKWF3cf5"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link discord"
                title="Discord"
              >
                <FaDiscord className="social-icon" />
                <span>Discord</span>
              </a>

              <EmailModal />

              <a
                href="https://www.linkedin.com/in/christian-humbert-developpeur-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                title="LinkedIn"
              >
                <FaLinkedin className="social-icon" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://whatsapp.com/channel/0029VaZGxMGAYlUSTOaYGn2T"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                title="WhatsApp"
              >
                <FaWhatsapp className="social-icon" />
                <span>WhatsApp</span>
              </a>
            </div>
          </section>
        </section>

        {/* Section Proposer un animal */}
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

        {/* Section RGPD */}
        <section className="footer-privacy">
          <div className="privacy-card">
            <h4 className="privacy-title">Protection des données</h4>
            <p className="privacy-text">
              Nous nous engageons résolument à observer rigoureusement les dispositions du RGPD en matière de protection
              des données, et nous nous assurons ainsi de n'utiliser tes coordonnées que dans le cadre des échanges liés
              au sujet principal du site.
            </p>
          </div>
        </section>

        {/* Section Copyright */}
        <section className="footer-bottom">
          <div className="copyright-info">
            <p>&copy; {currentYear} PaleoData. Tous droits réservés.</p>
            <Link to="/mentions-legales" onClick={scrollToTop} className="legal-link">
              Mentions légales
            </Link>
          </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaEnvelope, FaLinkedin, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const ref = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section principale */}
        <div className="footer-main">
          {/* Logo et description */}
          <div className="footer-brand">
            <div className="brand-logo">
              <img src="Logo.jpg" alt="Logo PaleoData" className="logo-image" />
              <h2 className="brand-name">PaleoData</h2>
            </div>
            <p className="brand-description">
              Ta porte d'entrée dans le monde de la vie ancienne. Notre mission est de fournir un accès aux données et
              aux informations paléontologiques de manière ouverte et conviviale.
            </p>
          </div>

          {/* Section Contact */}
          <div className="footer-contact">
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
              <a
                href="mailto:paleodata@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link email"
                title="Email"
              >
                <FaEnvelope className="social-icon" />
                <span>Email</span>
              </a>
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
          </div>
        </div>

        {/* Section RGPD */}
        <div className="footer-privacy">
          <div className="privacy-card">
            <h4 className="privacy-title">Protection des données</h4>
            <p className="privacy-text">
              Nous nous engageons résolument à observer rigoureusement les dispositions du RGPD en matière de protection
              des données, et nous nous assurons ainsi de n'utiliser tes coordonnées que dans le cadre des échanges liés
              au sujet principal du site.
            </p>
          </div>
        </div>

        {/* Section Copyright */}
        <div className="footer-bottom">
          <div className="copyright-info">
            <p>&copy; {currentYear} PaleoData. Tous droits réservés.</p>
            <Link to="/mentions-legales" onClick={scrollToTop} className="legal-link">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

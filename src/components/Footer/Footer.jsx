import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {currentYear} PaleoData. Tous droits réservés. <Link to="/mentions-legales">Mentions légales</Link>
        </p>
        <img src="Logo.jpg" alt="Logo développeur" />
      </div>
    </footer>
  );
};

export default Footer;

import { FaHome, FaHistory, FaBook, FaQuestionCircle } from 'react-icons/fa';
import { GiDinosaurBones } from 'react-icons/gi';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-burger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar-list ${isMenuOpen ? 'show' : ''}`}>
        <li className="navbar-item">
          <NavLink exact to="/" onClick={toggleMenu}>
            <FaHome />
            <span>Accueil</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/animaux" onClick={toggleMenu}>
            <GiDinosaurBones />
            <span>Animaux</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/echelle-des-temps-geologiques" onClick={toggleMenu}>
            <FaHistory />
            <span>Échelle des temps</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/liste-etymologique" onClick={toggleMenu}>
            <FaBook />
            <span>Étymologie</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/documentation" onClick={toggleMenu}>
            <FaQuestionCircle />
            <span>Documentation</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

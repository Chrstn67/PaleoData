import { FaHome, FaHistory, FaBook, FaInfoCircle } from 'react-icons/fa';
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
      <ul className={`navbar-list ${isMenuOpen ? 'show' : ''}`}>
        <li className="navbar-item">
          <NavLink exact to="/" onClick={toggleMenu}>
            <FaHome size={20} />
            <span>Accueil</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/animaux" onClick={toggleMenu}>
            <GiDinosaurBones size={20} />
            <span>Animaux</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/echelle-des-temps-geologiques" onClick={toggleMenu}>
            <FaHistory size={20} />
            <span>Échelle des temps</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/liste-etymologique" onClick={toggleMenu}>
            <FaBook size={20} />
            <span>Étymologie</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/documentation" onClick={toggleMenu}>
            <FaInfoCircle size={20} />
            <span>Documentation</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

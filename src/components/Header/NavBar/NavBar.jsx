/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
      {' '}
      <div className="navbar-burger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar-list ${isMenuOpen ? 'show' : ''}`}>
        <li className="navbar-item">
          <NavLink exact to="/" onClick={toggleMenu}>
            Accueil
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/animaux" onClick={toggleMenu}>
            Animaux
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/frise-chronologique" onClick={toggleMenu}>
            Chronologie
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/liste-etymologique" onClick={toggleMenu}>
            Etymologie
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/documentation" onClick={toggleMenu}>
            Documentation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

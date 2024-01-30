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
      <div className={`navbar__burger`} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar__list ${isMenuOpen ? 'show' : ''}`}>
        <li className="navbar__item">
          <NavLink exact to="/" onClick={toggleMenu}>
            Accueil
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/animaux" onClick={toggleMenu}>
            Animaux
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/frise-chronologique" onClick={toggleMenu}>
            Chronologie
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/liste-etymologique" onClick={toggleMenu}>
            Etymologie
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/documentation" onClick={toggleMenu}>
            Documentation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

import { FaHome, FaHistory, FaBook, FaInfoCircle } from 'react-icons/fa';
import { GiDinosaurRex } from 'react-icons/gi';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  return (
    <nav className="navbar">
      <ul className={`navbar-list ${isMenuOpen ? 'show' : ''}`}>
        <li className="navbar-item">
          <NavLink
            exact
            to="/"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            <FaHome size={20} />
            <span>Accueil</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/animaux"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            <GiDinosaurRex size={20} />
            <span>Animaux</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/echelle-des-temps-geologiques"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            <FaHistory size={20} />
            <span>Échelle des temps</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/liste-etymologique"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            <FaBook size={20} />
            <span>Étymologie</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/documentation"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            <FaInfoCircle size={20} />
            <span>Documentation</span>
          </NavLink>
          <ul className={`navbar-sublist ${isSubMenuOpen ? 'show' : ''} mobile-hidden`}>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/batailles"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Batailles
              </NavLink>
            </li>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/decouvertes-recentes"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Découvertes récentes
              </NavLink>
            </li>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/definitions"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Définitions
              </NavLink>
            </li>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/fossiles-celebres"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Fossiles Célèbres
              </NavLink>
            </li>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/gisements-fossiliferes"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Gisements fossilifères
              </NavLink>
            </li>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/paleontologues"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Paléontologues
              </NavLink>
            </li>
            <li className="navbar-subitem">
              <NavLink
                to="/documentation/questions"
                onClick={() => {
                  toggleSubMenu();
                  scrollToTop();
                }}
              >
                Questions
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

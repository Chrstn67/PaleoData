import React from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <section className="homePage">
      <section className="homePage__section homePage__section--gray">
        <div className="homePage__container">
          <div className="homePage__featured">
            <h1 className="homePage__title">PaleoData</h1>
            <p className="homePage__text">
              Ta source de documentaion en matière de paléontologie ! Le lieu où tu peux partir faire un safari
              préhistorique à la rencontre d'animaux insoupçonnés !
            </p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Hero" className="homePage__image" />
          </div>
        </div>
      </section>
      <section className="homePage__section">
        <div className="homePage__container homePage__container--reverse">
          <div className="homePage__featured">
            <h2 className="homePage__title">Des centaines d'animaux</h2>
            <p className="homePage__text">Des centaines d'animaux t'attendent. Viens découvrir leur mode de vie !</p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/animaux" onClick={handleClick} className="homePage__link">
              Voir les animaux
            </Link>
          </div>
        </div>
      </section>

      <section className="homePage__section homePage__section--gray">
        <div className="homePage__container">
          <div className="homePage__featured">
            <h2 className="homePage__title">Échelle des temps</h2>
            <p className="homePage__text">
              Voyage dans le temps et essaie d'imaginer le monde tel qu'il était aux temps de ces monstres disparus !
            </p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/echelle-des-temps-geologiques" onClick={handleClick} className="homePage__link">
              Voir l'échelle du temps
            </Link>
          </div>
        </div>
      </section>

      <section className="homePage__section">
        <div className="homePage__container homePage__container--reverse">
          <div className="homePage__featured">
            <h2 className="homePage__title">Étymologie</h2>
            <p className="homePage__text">
              Les noms des animaux ne sont pas donnés au hasard... Découvre les racines qui ont données vie aux bêtes !
            </p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/liste-etymologique" onClick={handleClick} className="homePage__link">
              Voir les étymologies
            </Link>
          </div>
        </div>
      </section>

      <section className="homePage__section homePage__section--gray">
        <div className="homePage__container">
          <div className="homePage__featured">
            <h2 className="homePage__title">Documentation</h2>
            <p className="homePage__text">
              Par à la conquête des dernières découvertes, de l'Histoire de la paléontologie et fais le plein de
              connaissances !
            </p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/documentation" onClick={handleClick} className="homePage__link">
              Voir la documentation
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomePage;

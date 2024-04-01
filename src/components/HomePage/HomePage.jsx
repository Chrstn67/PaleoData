import React from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="homePage">
      <section className="homePage__section homePage__section--gray">
        <div className="homePage__container">
          <div className="homePage__featured">
            <h1 className="homePage__title">Welcome to PaleoData</h1>
            <p className="homePage__text">
              Your source for paleontological data. Explore the ancient world and learn about prehistoric life.
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
            <h2 className="homePage__title">Featured Animal</h2>
            <p className="homePage__text">
              Meet the featured animal of the day. Each time you visit, you'll discover a new creature from the ancient
              world.
            </p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/" className="homePage__link">
              Read about this animal
            </Link>
          </div>
        </div>
      </section>

      <section className="homePage__section homePage__section--gray">
        <div className="homePage__container">
          <div className="homePage__featured">
            <h2 className="homePage__title">Echelle des temps</h2>
            <p className="homePage__text">Lorem impsum etc</p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/" className="homePage__link">
              Voir l'échelle du temps
            </Link>
          </div>
        </div>
      </section>

      <section className="homePage__section">
        <div className="homePage__container homePage__container--reverse">
          <div className="homePage__featured">
            <h2 className="homePage__title">Etymologie</h2>
            <p className="homePage__text">Lorem impsum etc</p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/" className="homePage__link">
              Voir Etymologie
            </Link>
          </div>
        </div>
      </section>

      <section className="homePage__section homePage__section--gray">
        <div className="homePage__container">
          <div className="homePage__featured">
            <h2 className="homePage__title">Documentation</h2>
            <p className="homePage__text">Lorem impsum etc</p>
          </div>
          <div className="homePage__image-wrapper">
            <img src="/placeholder.svg" alt="Featured Animal" className="homePage__image" />
          </div>
          <div className="homePage__link-wrapper">
            <Link to="/" className="homePage__link">
              Voir la documentation
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomePage;

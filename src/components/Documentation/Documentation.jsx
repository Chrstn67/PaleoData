'use client';

import { NavLink } from 'react-router-dom';
import { GiDinosaurBones, GiSwordClash, GiDinosaurEgg, GiChampions } from 'react-icons/gi';
import { RiListIndefinite, RiCompassDiscoverFill } from 'react-icons/ri';
import { FaQuestion, FaFilm } from 'react-icons/fa';
import './Documentation.css';

const Documentation = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  return (
    <div className="documentation-page">
      <section className="documentation-header">
        <h1>Documentation</h1>
        <p>Explorez l'univers fascinant de la paléontologie</p>
      </section>

      <section className="documentation-grid">
        <article className="documentation-card">
          <div className="card-icon">
            <GiSwordClash />
          </div>
          <div className="card-content">
            <h3>Batailles</h3>
            <p>Découvrez les débats les plus épiques entre scientifiques renommés</p>
            <NavLink to="/documentation/batailles" activeClassName="active" onClick={scrollToTop} className="card-link">
              Batailles
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <RiCompassDiscoverFill />
          </div>
          <div className="card-content">
            <h3>Découvertes récentes</h3>
            <p>Restez informé des dernières découvertes paléontologiques</p>
            <NavLink
              to="/documentation/decouvertes-recentes"
              activeClassName="active"
              onClick={scrollToTop}
              className="card-link"
            >
              Découvertes récentes
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <RiListIndefinite />
          </div>
          <div className="card-content">
            <h3>Définitions</h3>
            <p>La paléontologie est un langage riche et complexe à découvrir</p>
            <NavLink
              to="/documentation/definitions"
              activeClassName="active"
              onClick={scrollToTop}
              className="card-link"
            >
              Définitions
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <FaFilm />
          </div>
          <div className="card-content">
            <h3>Les monstres du passé dans la fiction</h3>
            <p>Pour les amoureux de fictions et d'aventures préhistoriques</p>
            <NavLink to="/documentation/fiction" activeClassName="active" onClick={scrollToTop} className="card-link">
              Dans la fiction
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <GiDinosaurBones />
          </div>
          <div className="card-content">
            <h3>Fossiles célèbres</h3>
            <p>Il existe des fossiles qui sont une mine d'or d'informations. Venez les examiner !</p>
            <NavLink
              to="/documentation/fossiles-celebres"
              activeClassName="active"
              onClick={scrollToTop}
              className="card-link"
            >
              Fossiles célèbres
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <GiDinosaurEgg />
          </div>
          <div className="card-content">
            <h3>Gisements fossilifères</h3>
            <p>Situez les gisements de fossiles à travers la planète</p>
            <NavLink
              to="/documentation/gisements-fossiliferes"
              activeClassName="active"
              onClick={scrollToTop}
              className="card-link"
            >
              Gisements de fossiles
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <GiChampions />
          </div>
          <div className="card-content">
            <h3>Paléontologues</h3>
            <p>Découvrez les plus grands paléontologues de l'histoire et leurs découvertes</p>
            <NavLink
              to="/documentation/paleontologues"
              activeClassName="active"
              onClick={scrollToTop}
              className="card-link"
            >
              Paléontologues
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <FaQuestion />
          </div>
          <div className="card-content">
            <h3>Questions</h3>
            <p>Trouvez les réponses aux questions les plus fréquemment posées sur la paléontologie en général</p>
            <NavLink to="/documentation/questions" activeClassName="active" onClick={scrollToTop} className="card-link">
              Questions
              <span className="link-arrow">→</span>
            </NavLink>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Documentation;

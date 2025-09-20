import { Link } from 'react-router-dom';
import '../../styles/docsStyles/Documentation.css';

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
        <p>Explore l'univers fascinant de la paléontologie</p>
      </section>

      <section className="documentation-grid">
        <article className="documentation-card">
          <div className="card-icon">
            <span>⚔️</span>
          </div>
          <div className="card-content">
            <h3>Batailles</h3>
            <p>Découvre les débats les plus épiques entre scientifiques renommés</p>
            <Link to="/documentation/batailles" onClick={scrollToTop} className="card-link">
              Batailles
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>🔍</span>
          </div>
          <div className="card-content">
            <h3>Découvertes récentes</h3>
            <p>Reste informé des dernières découvertes paléontologiques</p>
            <Link to="/documentation/decouvertes-recentes" onClick={scrollToTop} className="card-link">
              Découvertes récentes
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>📚</span>
          </div>
          <div className="card-content">
            <h3>Définitions</h3>
            <p>La paléontologie est un langage riche et complexe à découvrir</p>
            <Link to="/documentation/definitions" onClick={scrollToTop} className="card-link">
              Définitions
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>🎬</span>
          </div>
          <div className="card-content">
            <h3>Les monstres du passé dans la fiction</h3>
            <p>Pour les amoureux de fictions et d'aventures préhistoriques</p>
            <Link to="/documentation/fiction" onClick={scrollToTop} className="card-link">
              Dans la fiction
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>🦴</span>
          </div>
          <div className="card-content">
            <h3>Fossiles célèbres</h3>
            <p>Il existe des fossiles qui sont une mine d'or d'informations. Viens les examiner !</p>
            <Link to="/documentation/fossiles-celebres" onClick={scrollToTop} className="card-link">
              Fossiles célèbres
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>🥚</span>
          </div>
          <div className="card-content">
            <h3>Gisements fossilifères</h3>
            <p>Situe les gisements de fossiles à travers la planète</p>
            <Link to="/documentation/gisements-fossiliferes" onClick={scrollToTop} className="card-link">
              Gisements de fossiles
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>👨‍🔬</span>
          </div>
          <div className="card-content">
            <h3>Paléontologues</h3>
            <p>Découvre les plus grands paléontologues de l'histoire et leurs découvertes</p>
            <Link to="/documentation/paleontologues" onClick={scrollToTop} className="card-link">
              Paléontologues
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>

        <article className="documentation-card">
          <div className="card-icon">
            <span>❓</span>
          </div>
          <div className="card-content">
            <h3>Questions</h3>
            <p>Trouve les réponses aux questions les plus fréquemment posées sur la paléontologie en général</p>
            <Link to="/documentation/questions" onClick={scrollToTop} className="card-link">
              Questions
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Documentation;

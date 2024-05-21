import { NavLink } from 'react-router-dom';

import { GiDinosaurBones, GiSwordClash, GiDinosaurEgg, GiChampions } from 'react-icons/gi';
import { RiListIndefinite, RiCompassDiscoverFill } from 'react-icons/ri';
import { FaQuestion, FaFilm } from 'react-icons/fa';

const Documentation = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  return (
    <section className="sections">
      <div className="section">
        <GiSwordClash size={50} />
        <h2>Batailles</h2>
        <p>Découvre les débats les plus épiques entre scientifiques renommés</p>
        <NavLink to="/documentation/batailles" activeClassName="active" onClick={scrollToTop}>
          Batailles
        </NavLink>
      </div>
      <div className="section">
        <RiCompassDiscoverFill size={50} />
        <h2>Découvertes récentes</h2>
        <p>Reste informé des dernières découvertes paléontologiques</p>
        <NavLink to="/documentation/decouvertes-recentes" activeClassName="active" onClick={scrollToTop}>
          Découvertes récentes
        </NavLink>
      </div>
      <div className="section">
        <RiListIndefinite size={50} />
        <h2>Définitions</h2>
        <p>La paléontologie est langage riche...</p>
        <NavLink to="/documentation/definitions" activeClassName="active" onClick={scrollToTop}>
          Définitions
        </NavLink>
      </div>

      <div className="section">
        <FaFilm size={50} />
        <h2>Les monstres du passé dans la fiction</h2>
        <p>Pour les amoureux de fictions...</p>
        <NavLink to="/documentation/fiction" activeClassName="active" onClick={scrollToTop}>
          Dans la fiction
        </NavLink>
      </div>
      <div className="section">
        <GiDinosaurBones size={50} />
        <h2>Fossiles célèbres</h2>
        <p>Il existe des fossiles qui sont une mine d&#39;or d&#39;informations. Viens les examiner !</p>
        <NavLink to="/documentation/fossiles-celebres" activeClassName="active" onClick={scrollToTop}>
          Fossiles célèbres
        </NavLink>
      </div>
      <div className="section">
        <GiDinosaurEgg size={50} />
        <h2>Gisements fossilifères</h2>
        <p>Situe les gisements de fossiles à travers la planète</p>
        <NavLink to="/documentation/gisements-fossiliferes" activeClassName="active" onClick={scrollToTop}>
          Gisements de fossiles
        </NavLink>
      </div>
      <div className="section">
        <GiChampions size={50} />
        <h2>Paléontologues</h2>
        <p>Découvre les plus grands paléontologues de l'histoire et leurs découvertes</p>
        <NavLink to="/documentation/paleontologues" activeClassName="active" onClick={scrollToTop}>
          Paléontologues
        </NavLink>
      </div>
      <div className="section">
        <FaQuestion size={50} />
        <h2>Questions</h2>
        <p>Trouve les réponses aux questions les plus fréquemment posées sur la paléontologie en général</p>
        <NavLink to="/documentation/questions" activeClassName="active" onClick={scrollToTop}>
          Questions
        </NavLink>
      </div>
    </section>
  );
};

export default Documentation;

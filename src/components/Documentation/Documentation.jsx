import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
// import { GiDinoEgg, GiDinoBones, GiDinoFootprint, GiDinoHead, GiDinoTail, GiDinoTorso } from 'react-icons/gi';
import { GiDinosaurBones, GiSwordClash, GiDinosaurEgg, GiChampions } from 'react-icons/gi';
import { RiListIndefinite } from 'react-icons/ri';
import { FaQuestion } from 'react-icons/fa';
import { RiCompassDiscoverFill } from 'react-icons/ri';

const Documentation = () => {
  const ref = useRef(null);

  const scrollToTop = () => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className="sections">
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
        <GiDinosaurBones size={50} />
        <h2>Fossiles célèbres</h2>
        <p>Il existe des fossiles qui sont une mine d'or d'informations. Viens les examiner !</p>
        <NavLink to="/documentation/fossiles-celebres" activeClassName="active" onClick={scrollToTop}>
          Fossiles célèbres
        </NavLink>
      </div>
      <div className="section">
        <GiDinosaurEgg size={50} />
        <h2>Gisements de fossiles</h2>
        <p>Situe les plus gros gisements de fossiles à travers la planète</p>
        <NavLink to="/documentation/gisements-de-fossiles" activeClassName="active" onClick={scrollToTop}>
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
    </div>
  );
};

export default Documentation;

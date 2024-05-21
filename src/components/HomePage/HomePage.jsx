import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaBook, FaInfoCircle } from 'react-icons/fa';
import { GiDinosaurRex } from 'react-icons/gi';
import PropTypes from 'prop-types';
import './HomePage.scss';

const HomePage = ({ animals }) => {
  const ref = useRef(null);

  const scrollToTop = () => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  };
  return (
    <div className="home-page" ref={ref}>
      <div className="banner">
        <h1>Bienvenue sur PaleoData</h1>
        <div className="introduction">
          <p>
            Viens explorer la fascinante histoire de la vie sur Terre. Découvre des centaines d&#39;animaux
            préhistoriques, imagine leur mode de vie et leur environnement en voyageant dans le temps, dans cet univers
            passé qui émerveille petits et grands.
          </p>
        </div>
      </div>
      <div className="sections">
        <div className="section">
          <GiDinosaurRex size={50} />
          <h2>Animaux</h2>
          <p>
            Découvre les dernières informations sur tes animaux favoris. Il y a actuellement <b>{animals.length} </b>
            animaux disponibles.
          </p>
          <Link to="/animaux" onClick={scrollToTop}>
            Animaux
          </Link>
        </div>
        <div className="section">
          <FaHistory size={50} />
          <h2>Échelle des temps géologique</h2>
          <p>Voyage dans le temps</p>
          <Link to="/echelle-des-temps-geologiques" onClick={scrollToTop}>
            Échelle des temps
          </Link>
        </div>
        <div className="section">
          <FaBook size={50} />
          <h2>Étymologie</h2>
          <p>Apprend l&#39;origine des noms des animaux</p>
          <Link to="/liste-etymologique" onClick={scrollToTop}>
            Étymologie
          </Link>
        </div>
        <div className="section">
          <FaInfoCircle size={50} />
          <h2>Documentation</h2>
          <p>
            Les dernières découvertes paléontologiques, les paléontologues célèbres, et bien d&#39;autres infos
            n&#39;attendent qu&#39;à être lues !
          </p>
          <Link to="/documentation" onClick={scrollToTop}>
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default HomePage;

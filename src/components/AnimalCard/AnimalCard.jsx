import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiShareAlt } from 'react-icons/bi';
import GeoInfo from './GeoInfo/GeoInfo';
import Taxonomie from './Taxonomie/Taxonomie';
import './AnimalCard.scss';

const AnimalCard = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { nom } = useParams();

  PropTypes.checkPropTypes({ data: PropTypes.array.isRequired }, { data }, 'prop', 'AnimalCard');

  const animal = data.find((animal) => animal.nom === decodeURIComponent(nom));

  if (!animal) {
    return <div>Animal non trouvé</div>;
  }

  const imageUrl = `${animal.image_url}`;

  const shareLink = async (animal) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Découvre des informations sur ${animal.nom}.`,
          text: `Découvre des informations sur ${animal.nom}.`,
          url: `${window.location.origin}/PaleoData/#/animal/${encodeURIComponent(animal.nom)}`,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    }
  };

  return (
    <div className="animal-card">
      <h2>
        {animal.nom}
        <button
          type="button"
          onClick={() => {
            shareLink(animal);
          }}
        >
          <BiShareAlt size={20} />
        </button>
      </h2>

      <div className="top-part">
        <section className="animal-generalites">
          {' '}
          <img src={imageUrl} alt={animal.nom} />
          <div>
            <h3>Etymologie</h3>
            {animal.etymologie && <p>{animal.etymologie}</p>}
          </div>
        </section>
        <div className="animal-geologie-container">
          <GeoInfo geologie={animal.geologie} />
        </div>
      </div>
      <div className="middle-top-part">
        <section className="animal-description">
          <h3>Description</h3>
          {animal.description && (
            <div className="description">
              <p dangerouslySetInnerHTML={{ __html: animal.description }} />
            </div>
          )}
        </section>
      </div>
      <div className="middle-bottom-part">
        <section className="animal-regime">
          {animal.regime_alimentaire && (
            <div>
              <h3>Régime alimentaire</h3>
              <p>{animal.regime_alimentaire}</p>
            </div>
          )}
        </section>

        <section className="animal-habitat">
          {animal.habitat && (
            <div>
              <h3>Habitat</h3>
              <p>{animal.habitat}</p>
            </div>
          )}
        </section>

        <section className="animal-autresInfos">
          {animal.autres_infos && (
            <div>
              <h3>Morphologie</h3>
              {animal.autres_infos.taille && (
                <>
                  {animal.autres_infos.taille.longueur && <p>{animal.autres_infos.taille.longueur} de long</p>}
                  {animal.autres_infos.taille.hauteur && <p>{animal.autres_infos.taille.hauteur} de haut</p>}
                  {animal.autres_infos.taille.envergure && <p>{animal.autres_infos.taille.envergure} d'envergure</p>}
                </>
              )}
              {animal.autres_infos.poids && <p>{animal.autres_infos.poids}</p>}
            </div>
          )}
        </section>

        <section className="animal-decouverte">
          {animal.decouverte && (
            <div>
              <h3>Découverte</h3>
              {animal.decouverte.date && <p>{animal.decouverte.date}</p>}
              {animal.decouverte.lieu && <p>{animal.decouverte.lieu}</p>}
            </div>
          )}
        </section>
      </div>
      <section className="bottom-section">
        {Object.entries(animal.taxonomie).length > 0 && <Taxonomie taxonomie={animal.taxonomie} />}
      </section>
    </div>
  );
};

AnimalCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AnimalCard;

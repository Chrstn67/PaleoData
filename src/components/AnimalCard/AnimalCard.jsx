import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiShareAlt } from 'react-icons/bi';
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

  const formatTaxonName = (taxon) => {
    if (taxon) {
      return taxon
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return '';
  };

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
      <section className="left-section">
        <button
          type="button"
          onClick={() => {
            shareLink(animal);
          }}
        >
          <BiShareAlt size={20} />
        </button>
        <section className="animal-generalites">
          <h2>{animal.nom}</h2>
          <img src={imageUrl} alt={animal.nom} />

          <div>
            <h3>Etymologie</h3>
            {animal.etymologie && <p>{animal.etymologie}</p>}
          </div>
        </section>
        <section className="animal-geologie">
          {animal.geologie && (
            <div>
              <h3>Géologie</h3>
              {animal.geologie.apparition && (
                <p>
                  <span>Apparition:</span> {animal.geologie.apparition} Ma
                </p>
              )}
              {animal.geologie.ere && (
                <p>
                  <span>Ère:</span> {animal.geologie.ere}
                </p>
              )}
              {animal.geologie.periode && (
                <p>
                  <span>Période:</span> {animal.geologie.periode}
                </p>
              )}
              {animal.geologie.epoque && (
                <p>
                  <span>Époque:</span> {animal.geologie.epoque}
                </p>
              )}
              {animal.geologie.etage && (
                <p>
                  <span>Étage:</span> {animal.geologie.etage}
                </p>
              )}

              {animal.geologie.extinction && (
                <p>
                  <span>Extinction:</span> {animal.geologie.extinction} Ma
                </p>
              )}
            </div>
          )}
        </section>
      </section>

      <section className="right-section">
        <section className="animal-description">
          {animal.description && (
            <div>
              <h3>Description</h3>
              <p>{animal.description}</p>
            </div>
          )}

          {animal.regime_alimentaire && (
            <div>
              <h3>Régime alimentaire</h3>
              <p>{animal.regime_alimentaire}</p>
            </div>
          )}

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
              <h3>Autres informations</h3>
              {animal.autres_infos.taille && (
                <>
                  <p>
                    <span>Taille (Longueur): </span> <br />
                    {animal.autres_infos.taille.longueur}
                  </p>
                  {animal.autres_infos.taille.hauteur && (
                    <p>
                      <span>Taille (Hauteur): </span> <br />
                      {animal.autres_infos.taille.hauteur}
                    </p>
                  )}
                  {animal.autres_infos.taille.envergure && (
                    <p>
                      <span>Taille (Envergure): </span> <br />
                      {animal.autres_infos.taille.envergure}
                    </p>
                  )}
                </>
              )}
              {animal.autres_infos.poids && (
                <p>
                  <span>Poids:</span> <br />
                  {animal.autres_infos.poids}
                </p>
              )}
            </div>
          )}
          {animal.decouverte && (
            <div>
              <h3>Découverte</h3>
              {animal.decouverte.date && (
                <p>
                  <span>Date:</span> {animal.decouverte.date}
                </p>
              )}
              {animal.decouverte.lieu && (
                <p>
                  <span>Lieu: </span>
                  {animal.decouverte.lieu}
                </p>
              )}
            </div>
          )}
        </section>
      </section>

      <section className="bottom-section">
        {Object.entries(animal.taxonomie).length > 0 && (
          <section className="taxonomy">
            <h3>Taxonomie</h3>
            <table>
              <tbody>
                {Object.entries(animal.taxonomie).map(
                  ([key, value]) =>
                    value && (
                      <tr key={key}>
                        <td>
                          <span>{formatTaxonName(key)}:</span>
                        </td>
                        <td>{value}</td>
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </section>
        )}
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

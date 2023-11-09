import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnimalCard.scss';

const AnimalCard = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { nom } = useParams();

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

  return (
    <div className="animal-card">
      <h2>{animal.nom}</h2>
      <img src={imageUrl} alt={animal.nom} />

      <div>
        <h3>Etymologie</h3>
        {animal.etymologie && <p>{animal.etymologie}</p>}
      </div>

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
      {animal.geologie && (
        <div>
          <h3>Geologie</h3>
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
      {animal.autres_infos && (
        <div>
          <h3>Autres informations</h3>
          {animal.autres_infos.taille && (
            <>
              <p>
                <span>Taille (Longueur): </span>
                {animal.autres_infos.taille.longueur}
              </p>
              {animal.autres_infos.taille.hauteur && (
                <p>
                  <span>Taille (Hauteur): </span>
                  {animal.autres_infos.taille.hauteur}
                </p>
              )}
              {animal.autres_infos.taille.envergure && (
                <p>
                  <span>Taille (Envergure): </span>
                  {animal.autres_infos.taille.envergure}
                </p>
              )}
            </>
          )}
          {animal.autres_infos.poids && (
            <p>
              <span>Poids:</span> {animal.autres_infos.poids}
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

      {Object.entries(animal.taxonomie).length > 0 && (
        <div className="taxon">
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
        </div>
      )}
    </div>
  );
};

export default AnimalCard;

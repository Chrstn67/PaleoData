import PropTypes from 'prop-types';
import '../styles/Taxonomie.css';

const Taxonomie = ({ taxonomie }) => {
  const formatTaxonName = (taxon) => {
    if (taxon) {
      return taxon
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return '';
  };

  // Ordre de priorité pour l'affichage hiérarchique
  const hierarchyOrder = [
    'règne',
    'regne',
    'sous_règne',
    'sous_regne',
    'rameau',
    'infra_règne',
    'infra_regne',
    'super_embranchement',
    'embranchement',
    'sous_embranchement',
    'infra_embranchement',
    'micro_embranchement',
    'super_classe',
    'classe',
    'sous_classe',
    'division',
    'super_ordre',
    'ordre',
    'sous_ordre',
    'infra_ordre',
    'micro_ordre',
    'super_famille',
    'famille',
    'sous_famille',
    'tribu',
    'sous_tribu',
    'genre',
    'espèce',
    'espèces',
  ];

  // Récupérer TOUS les champs remplis de l'objet taxonomie
  const allFilledFields = Object.entries(taxonomie)
    .filter(([key, value]) => value && value.toString().trim() !== '')
    .map(([key, value]) => ({
      key,
      value: value.toString().trim(),
      displayName: formatTaxonName(key),
      order: hierarchyOrder.indexOf(key) !== -1 ? hierarchyOrder.indexOf(key) : 999,
    }))
    // Trier par ordre hiérarchique (les champs connus en premier, puis alphabétique pour les autres)
    .sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.displayName.localeCompare(b.displayName);
    });

  return (
    <section className="taxonomy">
      <h3>Classification Taxonomique</h3>

      <table className="taxonomy-table">
        <thead>
          <tr>
            <th>Rang Taxonomique</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {allFilledFields.map(({ key, value, displayName }) => (
            <tr key={key}>
              <td className="rank-cell">{displayName}</td>
              <td className="value-cell">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

Taxonomie.propTypes = {
  taxonomie: PropTypes.object.isRequired,
};

export default Taxonomie;

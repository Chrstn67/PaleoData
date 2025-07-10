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

  const taxonomyOrder = ['regne', 'embranchement', 'classe', 'ordre', 'famille', 'genre', 'espece'];
  const orderedTaxonomy = taxonomyOrder.filter((key) => taxonomie[key]).map((key) => ({ key, value: taxonomie[key] }));

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
          {orderedTaxonomy.map(({ key, value }) => (
            <tr key={key}>
              <td className="rank-cell">{formatTaxonName(key)}</td>
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

import PropTypes from 'prop-types';
import './Taxonomie.scss';

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

  return (
    <section className="taxonomy">
      <h3>Taxonomie</h3>
      <table>
        <tbody>
          {Object.entries(taxonomie).map(
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
  );
};

export default Taxonomie;

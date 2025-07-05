import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './AnimalFiltrer.css';

const AnimalFiltrer = ({ data, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    firstLetter: '',
    diet: '',
    geologyEra: '',
    geologyPeriod: '',
    geologyEpoch: '',
    geologyStage: '',
  });

  const uniqueDiets = new Set(data.map((animal) => animal.regime_alimentaire));
  const uniqueGeologyEras = new Set(data.map((animal) => animal.geologie.ere));
  const uniqueGeologyPeriods = new Set(data.map((animal) => animal.geologie.periode));
  const uniqueGeologyEpochs = new Set(data.map((animal) => animal.geologie.epoque));
  const uniqueGeologyStages = new Set(data.map((animal) => animal.geologie.stage));

  const firstLetters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ', (letter) => {
    const animalWithLetter = data.find((animal) => animal.nom[0].toUpperCase() === letter);
    return animalWithLetter ? letter : null;
  }).filter(Boolean);

  useEffect(() => {
    let filteredAnimals = data.filter((animal) => {
      return (
        animal.nom &&
        animal.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filters.firstLetter === '' || (animal.nom && animal.nom[0].toUpperCase() === filters.firstLetter)) &&
        (filters.diet === '' ||
          (animal.regime_alimentaire && animal.regime_alimentaire.toLowerCase() === filters.diet.toLowerCase())) &&
        (filters.geologyEra === '' ||
          (animal.geologie &&
            animal.geologie.ere &&
            animal.geologie.ere.toLowerCase() === filters.geologyEra.toLowerCase())) &&
        (filters.geologyPeriod === '' ||
          (animal.geologie &&
            animal.geologie.periode &&
            animal.geologie.periode.toLowerCase() === filters.geologyPeriod.toLowerCase())) &&
        (filters.geologyEpoch === '' ||
          (animal.geologie &&
            animal.geologie.epoque &&
            animal.geologie.epoque.toLowerCase() === filters.geologyEpoch.toLowerCase())) &&
        (filters.geologyStage === '' ||
          (animal.geologie &&
            animal.geologie.stage &&
            animal.geologie.stage.toLowerCase() === filters.geologyStage.toLowerCase()))
      );
    });

    filteredAnimals = filteredAnimals.sort((a, b) => a.nom.localeCompare(b.nom));

    onFilterChange(filteredAnimals);
  }, [data, searchQuery, filters, onFilterChange]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      firstLetter: '',
      diet: '',
      geologyEra: '',
      geologyPeriod: '',
      geologyEpoch: '',
      geologyStage: '',
    });
    setSearchQuery('');
  };

  return (
    <section className="search-option">
      <input
        htmlFor="searchQuery"
        id="searchQuery"
        type="text"
        placeholder="Rechercher par nom"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <section className="more-filter">
        <div>
          <label htmlFor="firstLetter">Première lettre :</label>
          <select
            id="firstLetter"
            onChange={(e) => handleFilterChange('firstLetter', e.target.value)}
            value={filters.firstLetter}
          >
            <option value="">Tous</option>
            {firstLetters.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="diet">Régime alimentaire :</label>
          <select id="diet" onChange={(e) => handleFilterChange('diet', e.target.value)} value={filters.diet}>
            <option value="">Tous</option>
            {[...uniqueDiets].sort().map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="geologyEra">Ère :</label>
          <select
            id="geologyEra"
            onChange={(e) => handleFilterChange('geologyEra', e.target.value)}
            value={filters.geologyEra}
          >
            <option value="">Tous</option>
            {[...uniqueGeologyEras].sort().map((era) => (
              <option key={era} value={era}>
                {era}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="geologyPeriod">Période : </label>
          <select
            id="geologyPeriod"
            onChange={(e) => handleFilterChange('geologyPeriod', e.target.value)}
            value={filters.geologyPeriod}
          >
            <option value="">Tous</option>
            {[...uniqueGeologyPeriods].sort().map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="geologyEpoch">Époque : </label>
          <select
            id="geologyEpoch"
            onChange={(e) => handleFilterChange('geologyEpoch', e.target.value)}
            value={filters.geologyEpoch}
          >
            <option value="">Tous</option>
            {[...uniqueGeologyEpochs].sort().map((epoch) => (
              <option key={epoch} value={epoch}>
                {epoch}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="geologyStage">Étage : </label>
          <select
            id="geologyStage"
            onChange={(e) => handleFilterChange('geologyStage', e.target.value)}
            value={filters.geologyStage}
          >
            <option value="">Tous</option>
            {[...uniqueGeologyStages].sort().map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
      </section>

      <button onClick={resetFilters} type="button">
        Réinitialiser
      </button>
    </section>
  );
};

AnimalFiltrer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string,
      regime_alimentaire: PropTypes.string,
      geologie: PropTypes.shape({
        ere: PropTypes.string,
        periode: PropTypes.string,
        epoque: PropTypes.string,
        etage: PropTypes.string,
      }),
    }),
  ),
  onFilterChange: PropTypes.func.isRequired,
};

AnimalFiltrer.defaultProps = {
  data: [],
};

export default AnimalFiltrer;

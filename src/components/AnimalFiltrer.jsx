'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/AnimalFiltrer.css';

const AnimalFiltrer = ({ data, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    firstLetter: '',
    diet: '',
    geologyEra: '',
    geologyPeriod: '',
    geologyEpoch: '',
    geologyStage: '',
  });

  // Fonction pour parser les régimes alimentaires
  const parseDiets = (regimeAlimentaire) => {
    if (!regimeAlimentaire) return [];

    // Si c'est déjà un tableau, le retourner
    if (Array.isArray(regimeAlimentaire)) {
      return regimeAlimentaire;
    }

    // Si c'est une chaîne qui ressemble à un tableau : '[Carnivore, insectivore, piscivore]'
    if (typeof regimeAlimentaire === 'string') {
      // Nettoyer la chaîne et la diviser
      const cleaned = regimeAlimentaire.replace(/[\[\]]/g, '').trim();
      if (cleaned.includes(',')) {
        return cleaned.split(',').map((diet) => diet.trim());
      }
      // Si pas de virgule, c'est un seul régime
      return [cleaned];
    }

    return [];
  };

  // Créer un Set de tous les régimes alimentaires uniques
  const uniqueDiets = new Set();
  data.forEach((animal) => {
    const diets = parseDiets(animal.regime_alimentaire);
    diets.forEach((diet) => {
      if (diet) uniqueDiets.add(diet);
    });
  });

  const uniqueGeologyEras = new Set(data.map((animal) => animal.geologie.ere));
  const uniqueGeologyPeriods = new Set(data.map((animal) => animal.geologie.periode));
  const uniqueGeologyEpochs = new Set(data.map((animal) => animal.geologie.epoque));
  const uniqueGeologyStages = new Set(data.map((animal) => animal.geologie.stage));

  const firstLetters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ', (letter) => {
    const animalWithLetter = data.find((animal) => animal.nom[0].toUpperCase() === letter);
    return animalWithLetter ? letter : null;
  }).filter(Boolean);

  // useEffect corrigé : onFilterChange retiré des dépendances
  useEffect(() => {
    let filteredAnimals = data.filter((animal) => {
      // Filtrage par nom
      const matchesName = animal.nom && animal.nom.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtrage par première lettre
      const matchesFirstLetter =
        filters.firstLetter === '' || (animal.nom && animal.nom[0].toUpperCase() === filters.firstLetter);

      // Filtrage par régime alimentaire (nouveau logic)
      let matchesDiet = true;
      if (filters.diet !== '') {
        const animalDiets = parseDiets(animal.regime_alimentaire);
        matchesDiet = animalDiets.some((diet) => diet.toLowerCase() === filters.diet.toLowerCase());
      }

      // Filtrage par géologie
      const matchesGeologyEra =
        filters.geologyEra === '' ||
        (animal.geologie &&
          animal.geologie.ere &&
          animal.geologie.ere.toLowerCase() === filters.geologyEra.toLowerCase());

      const matchesGeologyPeriod =
        filters.geologyPeriod === '' ||
        (animal.geologie &&
          animal.geologie.periode &&
          animal.geologie.periode.toLowerCase() === filters.geologyPeriod.toLowerCase());

      const matchesGeologyEpoch =
        filters.geologyEpoch === '' ||
        (animal.geologie &&
          animal.geologie.epoque &&
          animal.geologie.epoque.toLowerCase() === filters.geologyEpoch.toLowerCase());

      const matchesGeologyStage =
        filters.geologyStage === '' ||
        (animal.geologie &&
          animal.geologie.stage &&
          animal.geologie.stage.toLowerCase() === filters.geologyStage.toLowerCase());

      return (
        matchesName &&
        matchesFirstLetter &&
        matchesDiet &&
        matchesGeologyEra &&
        matchesGeologyPeriod &&
        matchesGeologyEpoch &&
        matchesGeologyStage
      );
    });

    filteredAnimals = filteredAnimals.sort((a, b) => a.nom.localeCompare(b.nom));
    onFilterChange(filteredAnimals);
  }, [data, searchQuery, filters]); // onFilterChange retiré des dépendances

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

  const hasActiveFilters = Object.values(filters).some((filter) => filter !== '') || searchQuery !== '';

  return (
    <section className="search-option">
      <div className="search-header">
        <div className="search-main">
          <input
            htmlFor="searchQuery"
            id="searchQuery"
            type="text"
            placeholder="🔍 Rechercher un animal..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="filter-toggle" onClick={() => setIsExpanded(!isExpanded)} type="button">
            <span className="filter-icon">⚙️</span>
            Filtres avancés
            <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
            {hasActiveFilters && <span className="active-indicator">●</span>}
          </button>
        </div>
        {hasActiveFilters && (
          <button onClick={resetFilters} type="button" className="reset-button">
            🗑️ Réinitialiser
          </button>
        )}
      </div>

      <div className={`filters-container ${isExpanded ? 'expanded' : ''}`}>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="firstLetter">
              <span className="filter-icon">🔤</span>
              Première lettre
            </label>
            <select
              id="firstLetter"
              onChange={(e) => handleFilterChange('firstLetter', e.target.value)}
              value={filters.firstLetter}
            >
              <option value="">Toutes</option>
              {firstLetters.map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="diet">
              <span className="filter-icon">🍽️</span>
              Régime alimentaire
            </label>
            <select id="diet" onChange={(e) => handleFilterChange('diet', e.target.value)} value={filters.diet}>
              <option value="">Tous</option>
              {[...uniqueDiets].sort().map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="geologyEra">
              <span className="filter-icon">🌍</span>
              Ère géologique
            </label>
            <select
              id="geologyEra"
              onChange={(e) => handleFilterChange('geologyEra', e.target.value)}
              value={filters.geologyEra}
            >
              <option value="">Toutes</option>
              {[...uniqueGeologyEras].sort().map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="geologyPeriod">
              <span className="filter-icon">⏰</span>
              Période
            </label>
            <select
              id="geologyPeriod"
              onChange={(e) => handleFilterChange('geologyPeriod', e.target.value)}
              value={filters.geologyPeriod}
            >
              <option value="">Toutes</option>
              {[...uniqueGeologyPeriods].sort().map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="geologyEpoch">
              <span className="filter-icon">📅</span>
              Époque
            </label>
            <select
              id="geologyEpoch"
              onChange={(e) => handleFilterChange('geologyEpoch', e.target.value)}
              value={filters.geologyEpoch}
            >
              <option value="">Toutes</option>
              {[...uniqueGeologyEpochs].sort().map((epoch) => (
                <option key={epoch} value={epoch}>
                  {epoch}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="geologyStage">
              <span className="filter-icon">🏔️</span>
              Étage
            </label>
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
        </div>
      </div>
    </section>
  );
};

AnimalFiltrer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string,
      regime_alimentaire: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
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

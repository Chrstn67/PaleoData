import { useState, useEffect } from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './AnimalList.scss';

const AnimalList = ({ data }) => {
  const [animals, setAnimals] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    diet: '',
    habitat: '',
    geologyEra: '',
    geologyPeriod: '',
    geologyEpoch: '',
    geologyStage: '',
  });

  const uniqueDiets = new Set(data.map((animal) => animal.regime_alimentaire));
  const uniqueHabitats = new Set(data.map((animal) => animal.habitat));
  const uniqueGeologyEras = new Set(data.map((animal) => animal.geologie.ere));
  const uniqueGeologyPeriods = new Set(data.map((animal) => animal.geologie.periode));
  const uniqueGeologyEpochs = new Set(data.map((animal) => animal.geologie.epoque));
  const uniqueGeologyStages = new Set(data.map((animal) => animal.geologie.etage));

  useEffect(() => {
    let filteredAnimals = data.filter((animal) => {
      return (
        animal.nom &&
        animal.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filters.diet === '' ||
          (animal.regime_alimentaire && animal.regime_alimentaire.toLowerCase() === filters.diet.toLowerCase())) &&
        // (filters.habitat === '' ||
        //   (animal.habitat && animal.habitat.toLowerCase() === filters.habitat.toLowerCase())) &&
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
            animal.geologie.etage &&
            animal.geologie.etage.toLowerCase() === filters.geologyStage.toLowerCase()))
      );
    });

    filteredAnimals = filteredAnimals.sort((a, b) => a.nom.localeCompare(b.nom));

    setAnimals(filteredAnimals);
  }, [data, searchQuery, filters]);

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
      diet: '',
      // habitat: '',
      geologyEra: '',
      geologyPeriod: '',
      geologyEpoch: '',
      geologyStage: '',
    });
  };

  const noMatchingAnimals = animals.length === 0;

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

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
    <>
      <section className="search-option">
        <input type="text" placeholder="Rechercher par nom" value={searchQuery} onChange={handleSearchChange} />

        <button onClick={toggleMoreFilters} type="button">
          {showMoreFilters ? 'Masquer les filtres avancés' : 'Afficher les filtres avancés'}
        </button>
        {showMoreFilters && (
          <section className="more-filter">
            <div>
              <label>Filtrer par régime alimentaire: </label>
              <select onChange={(e) => handleFilterChange('diet', e.target.value)} value={filters.diet}>
                <option value="">Tous</option>

                {[...uniqueDiets].sort().map((diet) => (
                  <option key={diet} value={diet}>
                    {diet}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <label>Filtrer par habitat: </label>
              <select onChange={(e) => handleFilterChange('habitat', e.target.value)} value={filters.habitat}>
                <option value="">Tous</option>

                {[...uniqueHabitats].sort().map((habitat) => (
                  <option key={habitat} value={habitat}>
                    {habitat}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <label>Filtrer par ère géologique: </label>
              <select onChange={(e) => handleFilterChange('geologyEra', e.target.value)} value={filters.geologyEra}>
                <option value="">Tous</option>

                {[...uniqueGeologyEras].sort().map((era) => (
                  <option key={era} value={era}>
                    {era}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Filtrer par période géologique: </label>
              <select
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
              <label>Filtrer par époque géologique: </label>
              <select onChange={(e) => handleFilterChange('geologyEpoch', e.target.value)} value={filters.geologyEpoch}>
                <option value="">Tous</option>

                {[...uniqueGeologyEpochs].sort().map((epoch) => (
                  <option key={epoch} value={epoch}>
                    {epoch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Filtrer par étage géologique: </label>
              <select onChange={(e) => handleFilterChange('geologyStage', e.target.value)} value={filters.geologyStage}>
                <option value="">Tous</option>

                {[...uniqueGeologyStages].sort().map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </section>
        )}
        <button onClick={resetFilters} type="button">
          Réinitialiser les filtres
        </button>
        {noMatchingAnimals && <p>Aucun animal ne correspond aux critères sélectionnés.</p>}
      </section>
      <section className="animal-listing">
        <ul>
          {animals.map((animal) => (
            <li key={animal.nom}>
              <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
                <img src={animal.image_url} alt={animal.nom} />
                <h3>{animal.nom}</h3>
              </Link>
              <button
                type="button"
                onClick={() => {
                  shareLink(animal);
                }}
              >
                <BiShareAlt size={20} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AnimalList;

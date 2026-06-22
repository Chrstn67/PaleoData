import { useState, useCallback, useEffect } from 'react';
import AnimalFiltrer from './AnimalFiltrer';
import AnimalListingSection from './AnimalListingSection';
import '../styles/AnimalList.css';

const AnimalList = ({ data }) => {
  const [filteredAnimals, setFilteredAnimals] = useState(data);

  useEffect(() => {
    const nomsAnimaux = data.map((animal) => animal.nom);
    console.log('Liste des animaux :', nomsAnimaux);
  }, [data]);

  const handleFilterChange = useCallback((filteredData) => {
    setFilteredAnimals(filteredData);
  }, []);

  const handleAnimalCount = (count) => {
    console.log(`Nombre d'animaux : ${count}`);
  };

  return (
    <>
      <section className="AnimalFiltrer-Component">
        <AnimalFiltrer data={data} onFilterChange={handleFilterChange} />
      </section>

      <section className="AnimalListingSection-Component">
        <AnimalListingSection animals={filteredAnimals} onAnimalCount={handleAnimalCount} />
      </section>
    </>
  );
};

export default AnimalList;

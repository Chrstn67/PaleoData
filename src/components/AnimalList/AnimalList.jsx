import { useState } from 'react';
import AnimalFiltrer from './AnimalFiltrer/AnimalFiltrer';
import AnimalListingSection from './AnimalListingSection/AnimalListingSection';
import './AnimalList.scss';

const AnimalList = ({ data }) => {
  const [filteredAnimals, setFilteredAnimals] = useState(data);
  const handleFilterChange = (filteredData) => {
    setFilteredAnimals(filteredData);
  };

  const handleAnimalCount = (count) => {
    // Vous pouvez utiliser cette fonction pour faire quelque chose avec le nombre d'animaux, par exemple, l'afficher dans la console
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

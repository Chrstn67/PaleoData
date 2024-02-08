import React, { useState } from 'react';
import AnimalFiltrer from './AnimalFiltrer/AnimalFiltrer';
import AnimalListingSection from './AnimalListingSection/AnimalListingSection';

const AnimalList = ({ data }) => {
  const [filteredAnimals, setFilteredAnimals] = useState(data);

  const handleFilterChange = (filteredData) => {
    setFilteredAnimals(filteredData);
  };

  return (
    <>
      <AnimalFiltrer data={data} onFilterChange={handleFilterChange} />
      <AnimalListingSection animals={filteredAnimals} />
    </>
  );
};

export default AnimalList;

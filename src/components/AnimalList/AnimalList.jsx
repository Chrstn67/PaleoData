import React, { useState } from 'react';
import AnimalFiltrer from './AnimalFiltrer/AnimalFiltrer';
import AnimalListingSection from './AnimalListingSection/AnimalListingSection';
import './AnimalList.scss';

const AnimalList = ({ data }) => {
  const [filteredAnimals, setFilteredAnimals] = useState(data);

  const handleFilterChange = (filteredData) => {
    setFilteredAnimals(filteredData);
  };

  return (
    <>
      <div className="AnimalFiltrer-Component">
        <AnimalFiltrer data={data} onFilterChange={handleFilterChange} />
      </div>
      <div className="AnimalListingSection-Component">
        <AnimalListingSection animals={filteredAnimals} />{' '}
      </div>
    </>
  );
};

export default AnimalList;

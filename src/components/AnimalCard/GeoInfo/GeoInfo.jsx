import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './GeoInfo.scss';

const GeoInfo = ({ geologie }) => {
  const formatMillionsYears = (number) => {
    if (number > 0) {
      return number;
    }

    const absNumber = Math.abs(number);
    const million = 1000000;

    if (absNumber >= 1) {
      const formattedNumber = absNumber * million;
      const numberString = formattedNumber.toString();
      const lastIndex = numberString.length - 6;
      const formattedString =
        numberString.slice(0, lastIndex) +
        ' ' +
        numberString.slice(lastIndex, lastIndex + 3) +
        ' ' +
        numberString.slice(lastIndex + 3);
      return `${formattedString} d'années`;
    }

    const formattedNumber = absNumber * million;
    const formattedString = Math.floor(formattedNumber).toString();
    const lastIndex = formattedString.length - 3;
    const finalFormattedString = formattedString.slice(0, lastIndex) + ' ' + formattedString.slice(lastIndex);
    return `${finalFormattedString} ans`;
  };

  const geoInfoArray = [
    geologie.apparition && `${formatMillionsYears(geologie.apparition)}<br />`,
    geologie.ere && `${geologie.ere}`,
    geologie.periode && `${geologie.periode}`,
    geologie.epoque && `${geologie.epoque}`,
    geologie.stage && `${geologie.stage}`,
    geologie.extinction && `${formatMillionsYears(geologie.extinction)}<br />`,
  ].filter(Boolean);

  const geoInfoTypes = [
    geologie.apparition && 'Apparition',
    geologie.ere && 'Ère',
    geologie.periode && 'Période',
    geologie.epoque && 'Époque',
    geologie.stage && 'Étage',
    geologie.extinction && 'Disparition',
  ].filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % geoInfoArray.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [geoInfoArray]);

  return (
    <section className="animal-geologie">
      <h3>Géologie</h3>
      <div className="geo-info-container">
        <p className="geo-info-type">{geoInfoTypes[currentIndex]}</p>
        <p className="time-info" dangerouslySetInnerHTML={{ __html: geoInfoArray[currentIndex] }}></p>
      </div>
    </section>
  );
};

GeoInfo.propTypes = {
  geologie: PropTypes.object,
};

export default GeoInfo;

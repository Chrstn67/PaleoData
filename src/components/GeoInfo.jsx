'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../styles/GeoInfo.css';

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
      const formattedString = `${numberString.slice(0, lastIndex)} ${numberString.slice(
        lastIndex,
        lastIndex + 3,
      )} ${numberString.slice(lastIndex + 3)}`;
      return `${formattedString} d'années`;
    }

    const formattedNumber = absNumber * million;
    const formattedString = Math.floor(formattedNumber).toString();
    const lastIndex = formattedString.length - 3;
    const finalFormattedString = `${formattedString.slice(0, lastIndex)} ${formattedString.slice(lastIndex)}`;
    return `${finalFormattedString} ans`;
  };

  const geoData = [
    { label: 'Apparition', value: geologie.apparition ? formatMillionsYears(geologie.apparition) : null },
    { label: 'Ère', value: geologie.ere },
    { label: 'Période', value: geologie.periode },
    { label: 'Époque', value: geologie.epoque },
    { label: 'Étage', value: geologie.stage },
    { label: 'Disparition', value: geologie.extinction ? formatMillionsYears(geologie.extinction) : null },
  ].filter((item) => item.value);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (geoData.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % geoData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [geoData.length]);

  if (geoData.length === 0) {
    return (
      <section className="animal-geologie">
        <h3>Géologie</h3>
        <div className="geo-display">
          <div className="geo-item active">
            <div className="geo-label">Information</div>
            <div className="geo-value">À venir...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="animal-geologie">
      <h3>Géologie</h3>

      <div className="geo-display">
        {geoData.map((item, index) => (
          <section key={index} className={`geo-item ${index === currentIndex ? 'active' : ''}`}>
            <div className="geo-label">{item.label}</div>
            <div className="geo-value">{item.value}</div>
          </section>
        ))}
      </div>

      {geoData.length > 1 && (
        <>
          <section className="geo-progress">
            {geoData.map((_, index) => (
              <button
                key={index}
                className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Voir ${geoData[index].label}`}
              />
            ))}
          </section>

          <div className="geo-timeline-bar">
            <div className="timeline-progress" style={{ width: `${((currentIndex + 1) / geoData.length) * 100}%` }} />
          </div>
        </>
      )}
    </section>
  );
};

GeoInfo.propTypes = {
  geologie: PropTypes.object,
};

export default GeoInfo;

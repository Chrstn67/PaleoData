// BackButton.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BackButton.scss';

const BackButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;

    const progress = (scrollY / (bodyHeight - windowHeight)) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`back-button ${location.pathname !== '/' ? 'visible' : ''}`}>
      <div
        className="progress-circle"
        style={{ background: `conic-gradient(#ff66007a ${scrollProgress}%, transparent 0%)` }}
      >
        <button type="button" className="arrow-left" onClick={() => window.history.back()}></button>
      </div>
    </div>
  );
};

export default BackButton;

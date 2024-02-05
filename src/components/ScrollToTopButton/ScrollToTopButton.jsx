// ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;

    const progress = (scrollY / (bodyHeight - windowHeight)) * 100;
    setScrollProgress(progress);

    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top-button ${isVisible ? 'show' : 'hide'}`}>
      <div
        className="progress-circle"
        style={{ background: `conic-gradient(#E7AD25 ${scrollProgress}%, transparent 0%)` }}
        onClick={scrollToTop}
      >
        <button type="button" className="arrow-up"></button>
      </div>
    </div>
  );
};

export default ScrollToTopButton;

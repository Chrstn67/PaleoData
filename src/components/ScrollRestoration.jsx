import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const STORAGE_KEY = 'paleodata_scroll_positions';

const ScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positionsRef = useRef({});

  // Charge les positions sauvegardées au montage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) positionsRef.current = JSON.parse(saved);
    } catch {
      positionsRef.current = {};
    }
  }, []);

  // Sauvegarde la position à chaque scroll (throttlé via rAF)
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        positionsRef.current[location.key] = window.scrollY;
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positionsRef.current));
        } catch {
          /* ignore */
        }
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.key]);

  // Restaure la position après navigation
  useEffect(() => {
    if (navigationType === 'POP') {
      const savedY = positionsRef.current[location.key];
      if (typeof savedY === 'number') {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, savedY);
          });
        });
        return;
      }
    }
    // PUSH ou REPLACE : on remonte en haut
    window.scrollTo(0, 0);
  }, [location.key, navigationType]);

  return null;
};

export default ScrollRestoration;

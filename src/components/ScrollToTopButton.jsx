import { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/ScrollToTopButton.css';

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const RADIUS_MOBILE = 13;
const CIRCUMFERENCE_MOBILE = 2 * Math.PI * RADIUS_MOBILE;
const SHOW_THRESHOLD = 120;
const SCROLL_DURATION = 600;

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(p);
      setVisible(scrollTop > SHOW_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { progress, visible };
}

function useScrollToTop() {
  const rafRef = useRef(null);

  const scrollToTop = useCallback(() => {
    const startY = window.scrollY;
    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min((now - startTime) / SCROLL_DURATION, 1);
      window.scrollTo(0, startY * (1 - easeOutCubic(t)));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);
  return scrollToTop;
}

export default function ScrollToTopSand() {
  const { progress, visible } = useScrollProgress();
  const scrollToTop = useScrollToTop();

  const offset = CIRCUMFERENCE * (1 - progress);
  const offsetMobile = CIRCUMFERENCE_MOBILE * (1 - progress);
  const pct = Math.round(progress * 100);
  const cx = 34,
    cy = 34;

  return (
    <>
      {/* ── VERSION DESKTOP : bouton rond coin bas-droit ── */}
      <div className="stt-wrapper stt-desktop" aria-hidden={!visible}>
        <button
          className={`stt-btn${visible ? ' stt-visible' : ''}`}
          onClick={scrollToTop}
          aria-label={`Retour en haut de la page — ${pct}% parcouru`}
          title="Retour en haut"
          tabIndex={visible ? 0 : -1}
        >
          <span className="stt-inner" aria-hidden="true" />

          <svg className="stt-svg" viewBox="0 0 68 68" aria-hidden="true" focusable="false">
            <circle className="stt-track" cx={cx} cy={cy} r={RADIUS} />
            <circle
              className="stt-progress"
              cx={cx}
              cy={cy}
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>

          <svg
            className="stt-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M5 15l7-7 7 7" />
          </svg>

          <span className="stt-tooltip" aria-hidden="true">
            Haut de page
          </span>
        </button>
      </div>

      {/* ── VERSION MOBILE : pill centré au-dessus de la navbar ── */}
      <div className={`stt-pill-wrapper${visible ? ' stt-pill-visible' : ''}`} aria-hidden={!visible}>
        <button
          className="stt-pill-btn"
          onClick={scrollToTop}
          aria-label={`Retour en haut de la page — ${pct}% parcouru`}
          tabIndex={visible ? 0 : -1}
        >
          <svg className="stt-pill-ring" width="22" height="22" viewBox="0 0 36 36" aria-hidden="true">
            <circle className="stt-pill-ring-track" cx="18" cy="18" r={RADIUS_MOBILE} />
            <circle
              className="stt-pill-ring-fill"
              cx="18"
              cy="18"
              r={RADIUS_MOBILE}
              strokeDasharray={CIRCUMFERENCE_MOBILE}
              strokeDashoffset={offsetMobile}
            />
          </svg>

          <svg
            className="stt-pill-arrow"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 15l7-7 7 7" />
          </svg>

          <span className="stt-pill-pct" aria-hidden="true">
            Haut
          </span>
        </button>
      </div>
    </>
  );
}

import PropTypes from 'prop-types';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TIMELINE_MIN, TIMELINE_MAX, ERAS, PERIODS, EPOCHS, STAGES, TICK_INTERVALS } from '../data/geoConstants';

import '../styles/GeoInfo.css';
import rawData from '../data/data';

const TODAY = new Date().getFullYear();

// ─────────────────────────────────────────────────────────────────────────────
// BASE DE DONNÉES ANIMAUX
// ─────────────────────────────────────────────────────────────────────────────
const KNOWN_ANIMALS = rawData
  .filter((a) => a.geologie?.apparition != null)
  .map((a) => ({
    nom: a.nom,
    apparition: a.geologie.apparition,
    extinction: a.geologie.extinction ?? 0,
    groupe:
      a.taxonomie?.ordre?.trim() ||
      a.taxonomie?.classe?.trim() ||
      a.taxonomie?.embranchement?.trim() ||
      a.geologie?.periode ||
      '',
    image_url: a.image_url ?? null,
    geo: a.geologie ?? {},
  }))
  .sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' }));

const COMPARE_PALETTE = [
  '#E84393',
  '#FF6B35',
  '#4ECDC4',
  '#A855F7',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#EF4444',
  '#8B5CF6',
  '#06B6D4',
  '#FFB800',
  '#FF3366',
  '#00CED1',
  '#FF8C42',
  '#7B2CBF',
  '#2D6A4F',
  '#E63946',
  '#1D3557',
  '#F4A261',
  '#9C89B8',
];

// ─────────────────────────────────────────────────────────────────────────────
// roundRect polyfill
// ─────────────────────────────────────────────────────────────────────────────
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────
const TYPE_LABELS = { era: 'Ère', period: 'Période', epoch: 'Époque', stage: 'Étage', animal: 'Animal' };

function isUnknown(val) {
  if (val == null) return true;
  if (typeof val === 'string' && val.toLowerCase().includes('inconnu')) return true;
  return false;
}

function isPositiveYear(val) {
  return typeof val === 'number' && val > 0;
}

function formatMaFull(ma) {
  if (isUnknown(ma)) return 'Inconnue';
  if (isPositiveYear(ma)) return `En ${Math.round(ma)} AP. J.-C.`;
  if (ma === 0) return "Aujourd'hui";
  const abs = Math.abs(ma);
  if (abs < 0.001) return `${Math.round(abs * 1_000_000)} ans`;
  if (abs < 1) return `${Math.round(abs * 1000)} 000 ans`;
  return `${abs % 1 === 0 ? abs : abs.toFixed(1)} Ma`;
}

function formatDuration(ma) {
  if (ma == null) return null;
  const abs = Math.abs(ma);
  if (abs < 0.001) return `${Math.round(abs * 1_000_000)} ans`;
  if (abs < 0.1) return `${Math.round(abs * 1000)} ka`;
  if (abs < 1) return `${Math.round(abs * 1000)} ka`;
  return `${abs % 1 === 0 ? abs : abs.toFixed(1)} Ma`;
}

function formatTickMa(ma) {
  if (ma === 0) return TODAY;
  if (ma > 0) {
    const ans = Math.round(ma * 1_000_000);
    if (ans < 1000) return `+${ans} ans`;
    if (ans < 1_000_000) return `+${Math.round(ans / 1000)} ka`;
    return `+${ma.toFixed(1)} Ma`;
  }
  const abs = Math.abs(ma);
  if (abs < 0.0001) return TODAY;
  if (abs < 0.001) return `${Math.round(abs * 1_000_000)} ans`;
  if (abs < 0.1) return `${Math.round(abs * 1000)} ka`;
  if (abs < 1) return `${(abs * 1000).toFixed(0)} ka`;
  return `${Number.isInteger(abs) ? abs : abs.toFixed(1)} Ma`;
}

function durationStr(s, e) {
  const d = Math.abs(e - s);
  if (d < 0.001) return `${Math.round(d * 1e6)} ans`;
  if (d < 0.1) return `${(d * 1000).toFixed(1)} ka`;
  if (d < 1) return `${Math.round(d * 1000)} ka`;
  return `${d.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} Ma`;
}

function toMa(val) {
  if (isUnknown(val)) return null;
  if (isPositiveYear(val)) {
    const yearsAgo = TODAY - val;
    return -(yearsAgo / 1_000_000);
  }
  return typeof val === 'number' ? val : null;
}

function overlaps(a1, a2, b1, b2) {
  const aMin = Math.min(a1, a2);
  const aMax = Math.max(a1, a2);
  const bMin = Math.min(b1, b2);
  const bMax = Math.max(b1, b2);
  return aMax > bMin && bMax > aMin;
}

// ─────────────────────────────────────────────────────────────────────────────
// LANE ASSIGNMENT
// ─────────────────────────────────────────────────────────────────────────────
function assignCompareLanes(compareList) {
  if (!compareList.length) return { laned: [], laneCount: 0 };

  const items = compareList
    .map((a) => {
      const startMa = toMa(a.apparition);
      const endMa = toMa(a.extinction) ?? 0;
      const s = startMa ?? endMa ?? 0;
      const e = endMa;
      return { ...a, _startMa: Math.min(s, e), _endMa: Math.max(s, e) };
    })
    .sort((a, b) => a._startMa - b._startMa);

  const laneEnd = [];
  const laned = items.map((item) => {
    let assigned = false;
    let lane = 0;
    for (let l = 0; l < laneEnd.length; l++) {
      if (item._startMa > laneEnd[l] + 0.001) {
        lane = l;
        laneEnd[l] = item._endMa;
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      lane = laneEnd.length;
      laneEnd.push(item._endMa);
    }
    return { ...item, lane };
  });

  return { laned, laneCount: laneEnd.length };
}

// ─────────────────────────────────────────────────────────────────────────────
// STRATIGRAPHIC LOOKUP
// ─────────────────────────────────────────────────────────────────────────────
function findContextAt(ma, isExtinction = false) {
  if (ma == null) return { era: null, period: null, epoch: null, stage: null };
  let adjustedMa = ma;
  if (isExtinction && ma < 0) {
    const isStartOfEra = ERAS.some((e) => Math.abs(ma - e.start) < 0.000001);
    const isStartOfPeriod = PERIODS.some((p) => Math.abs(ma - p.start) < 0.000001);
    const isStartOfEpoch = EPOCHS.some((e) => Math.abs(ma - e.start) < 0.000001);
    const isStartOfStage = STAGES.some((s) => Math.abs(ma - s.start) < 0.000001);
    if (isStartOfEra || isStartOfPeriod || isStartOfEpoch || isStartOfStage) {
      adjustedMa = ma - 0.000001;
    }
  }
  const era = ERAS.find((e) => adjustedMa >= e.start && adjustedMa < e.end)?.name ?? null;
  const period = PERIODS.find((e) => adjustedMa >= e.start && adjustedMa < e.end)?.name ?? null;
  const epoch = EPOCHS.find((e) => adjustedMa >= e.start && adjustedMa < e.end)?.name ?? null;
  const stage = STAGES.find((e) => adjustedMa >= e.start && adjustedMa < e.end)?.name ?? null;
  return { era, period, epoch, stage };
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS DRAWING HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ERA_Y = 0,
  ERA_H = 40;
const PER_Y = 40,
  PER_H = 32;
const EPO_Y = 72,
  EPO_H = 26;
const STA_Y = 98,
  STA_H = 22;
const AXIS_Y = 120;

const COMPARE_LANE_H = 22;
const COMPARE_LANE_GAP = 3;

function drawBands(ctx, list, W, maToX, yStart, rowH, minWidthForText, fontSize) {
  list.forEach((item) => {
    const x1 = maToX(item.start);
    const x2 = maToX(item.end);
    if (x2 < 0 || x1 > W) return;
    const rx1 = Math.max(0, x1);
    const rx2 = Math.min(W, x2);
    const bw = rx2 - rx1;

    ctx.fillStyle = item.fill + '38';
    ctx.fillRect(rx1, yStart, bw, rowH);
    ctx.fillStyle = item.fill + 'CC';
    ctx.fillRect(rx1, yStart + rowH - 2, bw, 2);
    ctx.strokeStyle = item.fill + '88';
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(rx1, yStart);
    ctx.lineTo(rx1, yStart + rowH - 2);
    ctx.stroke();

    if (bw >= minWidthForText) {
      const fs = Math.max(fontSize, Math.min(fontSize + 2, bw / 7));
      ctx.fillStyle = item.text;
      ctx.font = `600 ${fs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx1 + 2, yStart, bw - 4, rowH);
      ctx.clip();
      ctx.fillText(item.name, (rx1 + rx2) / 2, yStart + rowH / 2 + fs * 0.35);
      ctx.restore();
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT CARD STRATIGRAPHIQUE
// ─────────────────────────────────────────────────────────────────────────────
function StratRow({ rank, val, muted }) {
  if (!val) return null;
  return (
    <div className="strat-item">
      <span className="strat-rank">{rank}</span>
      <span className={`strat-val${muted ? ' strat-val--muted' : ''}`}>{val}</span>
    </div>
  );
}

function StratColumn({ label, dotClass, dateLabel, context }) {
  const { era, period, epoch, stage } = context;
  if (!dateLabel && !era && !period && !epoch && !stage) return null;
  return (
    <div className="strat-col">
      <div className={`strat-col-head ${dotClass}`}>
        <span className="strat-dot" />
        {label}
      </div>
      <div className="strat-items">
        <StratRow rank="Date" val={dateLabel} />
        <StratRow rank="Ère" val={era} />
        <StratRow rank="Période" val={period} />
        <StratRow rank="Époque" val={epoch} />
        <StratRow rank="Étage" val={stage} muted />
      </div>
    </div>
  );
}

function GeoCard({ geologie, animalNom, apparitionRaw, extinctionRaw, apparition, extinction }) {
  const isAlive = extinctionRaw == null || extinctionRaw === 0;
  const duration = apparition != null && extinction != null ? Math.abs(apparition - extinction) : null;
  const appContext = findContextAt(apparition, false);
  const extContext = findContextAt(extinction, true);
  const appText = isUnknown(apparitionRaw) ? 'Inconnue' : formatMaFull(apparitionRaw);
  const extText = isUnknown(extinctionRaw) ? 'Inconnue' : formatMaFull(extinctionRaw);
  const durStr = formatDuration(duration);
  const hasStrat = apparition != null || extinction != null;

  return (
    <div className="geo-card">
      <div className="geo-card__head">
        <div className="geo-card__identity">
          <strong className="geo-card__name">{animalNom}</strong>
          {hasStrat && (
            <span className="geo-card__dates">
              {apparitionRaw != null && appText}
              {apparitionRaw != null && extinctionRaw != null && <span className="geo-card__arrow"> → </span>}
              {extinctionRaw != null && extText}
            </span>
          )}
        </div>
        <span className={`status-badge ${isAlive ? 'status-badge--alive' : 'status-badge--extinct'}`}>
          <span className="status-badge__dot" />
          {isAlive ? 'Actuel' : 'Éteint'}
        </span>
      </div>

      {hasStrat && (
        <div className="geo-card__metrics">
          <div className="metric">
            <span className="metric__label">Durée d'existence</span>
            <span className="metric__value">{durStr ?? '—'}</span>
          </div>
          <div className="metric">
            <span className="metric__label">Apparition</span>
            <span className="metric__value">{apparitionRaw != null ? appText : '—'}</span>
          </div>
          <div className="metric">
            <span className="metric__label">Disparition</span>
            <span className="metric__value">{extinctionRaw != null ? extText : '—'}</span>
          </div>
        </div>
      )}

      {hasStrat && (
        <div className="geo-card__strat">
          <span className="geo-card__strat-title">Contexte stratigraphique</span>
          <div className="strat-grid">
            {apparition != null && (
              <StratColumn label="Apparition" dotClass="strat-col-head--app" dateLabel={appText} context={appContext} />
            )}
            {extinction != null && (
              <StratColumn label="Extinction" dotClass="strat-col-head--ext" dateLabel={extText} context={extContext} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL — identique à Timeline
// ─────────────────────────────────────────────────────────────────────────────
function Modal({ item, onClose }) {
  const ref = useRef(null);

  // Fonction pour défiler vers le haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  if (!item) return null;

  const isAnimal = item.type === 'animal';
  const accentColor = isAnimal ? item.color : item.fill;
  const displayName = isAnimal ? item.nom : item.name;

  return (
    <div
      ref={ref}
      className="tl-modal-backdrop"
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="tl-modal" style={{ borderLeft: `5px solid ${accentColor}` }}>
        {/* Header */}
        <div className="tl-modal__header">
          <div className="tl-modal__dot" style={{ background: accentColor }} />
          <div className="tl-modal__header-inner">
            <div className="tl-modal__name-row">
              <span className={`tl-modal__name ${isAnimal ? 'tl-modal__name--italic' : ''}`}>{displayName}</span>
              <span className={`badge badge--${item.type}`}>{TYPE_LABELS[item.type]}</span>
              {isAnimal && item.hasZeroDuration && <span className="badge badge--warning">Durée très courte</span>}
            </div>
          </div>
          <button className="tl-modal__close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        {/* Dates */}
        <div className="tl-modal__dates">
          {[
            { label: 'Apparition', value: formatMaFull(item.start) },
            { label: isAnimal ? 'Extinction' : 'Fin', value: formatMaFull(item.end) },
            {
              label: 'Durée',
              value: isAnimal && item.hasZeroDuration ? "< 1 million d'années" : durationStr(item.start, item.end),
            },
          ].map((c, i) => (
            <div key={i} className="tl-modal__date-cell">
              <div className="tl-modal__date-label">{c.label}</div>
              <div className="tl-modal__date-value">{c.value}</div>
            </div>
          ))}
        </div>

        {/* Badges géo + image (animaux uniquement) */}
        {isAnimal && (
          <>
            {(item.geo?.ere || item.geo?.periode || item.geo?.epoque || item.geo?.stage) && (
              <div className="tl-modal__geo-badges">
                {item.geo?.ere && <span className="geo-badge geo-badge--era">{item.geo.ere}</span>}
                {item.geo?.periode && <span className="geo-badge geo-badge--period">{item.geo.periode}</span>}
                {item.geo?.epoque && <span className="geo-badge geo-badge--epoch">{item.geo.epoque}</span>}
                {item.geo?.stage && <span className="geo-badge geo-badge--stage">{item.geo.stage}</span>}
              </div>
            )}
            {item.image_url ? (
              <div className="tl-modal__image-container">
                <Link
                  to={`/animal/${encodeURIComponent(item.nom)}`}
                  className="tl-modal__image-link"
                  onClick={scrollToTop}
                >
                  <img src={item.image_url} alt={item.nom} className="tl-modal__image" />
                  <div className="tl-modal__image-overlay tl-modal__image-overlay--always">
                    <span className="tl-modal__view-button">Voir +</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="tl-modal__link-container">
                <Link
                  to={`/animal/${encodeURIComponent(item.nom)}`}
                  className="tl-modal__text-link"
                  onClick={scrollToTop}
                >
                  Voir la fiche complète de {item.nom} →
                </Link>
              </div>
            )}
          </>
        )}

        {item.info && (
          <div className="tl-modal__body">
            <p className="tl-modal__text">{item.info}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DUAL PANE COMPARE
// ─────────────────────────────────────────────────────────────────────────────
function DualPaneCompare({
  compareList,
  onAdd,
  onRemove,
  onReset,
  onAddAll,
  onJumpTo,
  apparition,
  extinction,
  currentNom,
  paletteOpen,
  onTogglePalette,
  view,
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return KNOWN_ANIMALS.filter(
      (a) =>
        a.nom !== currentNom && (q === '' || a.nom.toLowerCase().includes(q) || a.groupe.toLowerCase().includes(q)),
    );
  }, [query, currentNom]);

  const contemporaries = useMemo(() => {
    if (apparition == null && extinction == null) return new Set();
    const a1 = apparition ?? extinction;
    const a2 = extinction ?? 0;
    return new Set(
      KNOWN_ANIMALS.filter((a) => a.nom !== currentNom && overlaps(a1, a2, a.apparition, a.extinction ?? 0)).map(
        (a) => a.nom,
      ),
    );
  }, [apparition, extinction, currentNom]);

  const unselectedContemporaries = useMemo(() => {
    return KNOWN_ANIMALS.filter((a) => contemporaries.has(a.nom) && !compareList.find((c) => c.nom === a.nom));
  }, [contemporaries, compareList]);

  const allContemporariesSelected = contemporaries.size > 0 && unselectedContemporaries.length === 0;

  const hasItems = compareList.length > 0;

  function isOutOfView(animal) {
    const startMa = toMa(animal.apparition);
    const endMa = toMa(animal.extinction) ?? 0;
    if (startMa == null) return false;
    const barStart = Math.min(startMa, endMa);
    const barEnd = Math.max(startMa, endMa);
    return barEnd < view.start || barStart > view.end;
  }

  const IconSun = ({ size = 11 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );

  return (
    <div className="dp-wrapper">
      <div className="dp-topbar">
        <button
          className={`dp-toggle-btn ${paletteOpen ? 'dp-toggle-btn--open' : ''}`}
          onClick={onTogglePalette}
          aria-expanded={paletteOpen}
          aria-label={paletteOpen ? 'Fermer la palette' : 'Ouvrir la palette de comparaison'}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6" />
            <circle cx="16" cy="16" r="6" />
          </svg>
          {hasItems
            ? `Comparaison (${compareList.length} ${compareList.length > 1 ? 'animaux' : 'animal'})`
            : "Comparer avec d'autres animaux"}
          <svg
            className="dp-toggle-btn__chevron"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {contemporaries.size > 0 && (
          <button
            className={`dp-contemp-btn${allContemporariesSelected ? ' dp-contemp-btn--done' : ''}`}
            onClick={() => !allContemporariesSelected && onAddAll(unselectedContemporaries)}
            disabled={allContemporariesSelected}
            title={
              allContemporariesSelected
                ? 'Tous les contemporains sont sélectionnés'
                : `Ajouter les ${unselectedContemporaries.length} contemporain${unselectedContemporaries.length > 1 ? 's' : ''} restant${unselectedContemporaries.length > 1 ? 's' : ''}`
            }
            aria-label="Sélectionner tous les contemporains"
          >
            <IconSun size={12} />
            <span className="dp-contemp-btn__label">
              {allContemporariesSelected
                ? `${contemporaries.size} contemporain${contemporaries.size > 1 ? 's' : ''}`
                : `${unselectedContemporaries.length} contemporain${unselectedContemporaries.length > 1 ? 's' : ''}`}
            </span>
            {allContemporariesSelected && <span className="dp-contemp-btn__check">✓</span>}
          </button>
        )}

        {hasItems && (
          <button
            className="dp-reset-btn"
            onClick={onReset}
            aria-label="Réinitialiser la comparaison"
            title="Tout effacer"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.85" />
            </svg>
            Tout effacer
          </button>
        )}
      </div>

      {paletteOpen && (
        <div className="dp-panel">
          <div className="dp-sidebar">
            <div className="dp-sidebar__header">
              <span className="dp-sidebar__title">Animaux</span>
              <span className="dp-sidebar__count">
                {filtered.length} entrée{filtered.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="dp-sidebar__search">
              <svg
                className="dp-search-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                className="dp-search-input"
                type="text"
                placeholder="Filtrer…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                aria-label="Filtrer les animaux"
              />
              {query && (
                <button className="dp-search-clear" onClick={() => setQuery('')} aria-label="Effacer la recherche">
                  ×
                </button>
              )}
            </div>

            {contemporaries.size > 0 && (
              <div className="dp-sidebar__contemp-bar">
                <button
                  className={`dp-sidebar__contemp-btn${allContemporariesSelected ? ' dp-sidebar__contemp-btn--done' : ''}`}
                  onClick={() => !allContemporariesSelected && onAddAll(unselectedContemporaries)}
                  disabled={allContemporariesSelected}
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                  {allContemporariesSelected
                    ? 'Tous ajoutés'
                    : `+ ${unselectedContemporaries.length} contemporain${unselectedContemporaries.length > 1 ? 's' : ''}`}
                </button>
              </div>
            )}

            <div className="dp-animal-list" role="list">
              {filtered.map((a) => {
                const active = !!compareList.find((c) => c.nom === a.nom);
                const color = compareList.find((c) => c.nom === a.nom)?.color ?? null;
                const isContemp = contemporaries.has(a.nom);
                return (
                  <button
                    key={a.nom}
                    className={`dp-animal-item${active ? ' dp-animal-item--active' : ''}${isContemp && !active ? ' dp-animal-item--contemp' : ''}`}
                    onClick={() => (active ? onRemove(a.nom) : onAdd(a))}
                    role="listitem"
                    aria-pressed={active}
                    aria-label={`${active ? 'Retirer' : 'Ajouter'} ${a.nom}`}
                  >
                    <span className="dp-animal-dot" style={active ? { background: color, borderColor: color } : {}} />
                    <span className="dp-animal-nom">{a.nom}</span>
                    {isContemp && !active && (
                      <span className="dp-animal-contemp" title="Contemporain">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                        </svg>
                      </span>
                    )}
                    {active && (
                      <span className="dp-animal-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
              {filtered.length === 0 && <p className="dp-empty">Aucun résultat</p>}
            </div>
          </div>

          <div className="dp-dock-area">
            <div className="dp-dock-label">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Superposés sur la frise
            </div>
            {hasItems ? (
              <div className="dp-dock-chips">
                {compareList.map((animal) => {
                  const outOfView = isOutOfView(animal);
                  const isContemp = contemporaries.has(animal.nom);
                  return (
                    <div
                      key={animal.nom}
                      className={`dp-chip${isContemp ? ' dp-chip--contemp' : ''}`}
                      style={{
                        '--chip-color': animal.color,
                        borderColor: animal.color + '99',
                        background: animal.color + '14',
                      }}
                    >
                      <span className="dp-chip__dot" style={{ background: animal.color }} />
                      <span className="dp-chip__nom">{animal.nom}</span>
                      {isContemp && (
                        <span className="dp-chip__contemp-badge" title="Contemporain">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                          </svg>
                        </span>
                      )}
                      <span className="dp-chip__range">
                        {formatMaFull(animal.apparition)} →{' '}
                        {animal.extinction === 0 ? 'Auj.' : formatMaFull(animal.extinction)}
                      </span>
                      {outOfView && (
                        <button
                          className="dp-chip__jump"
                          onClick={() => onJumpTo(animal)}
                          title={`Centrer la frise sur ${animal.nom}`}
                          aria-label={`Centrer la vue sur ${animal.nom}`}
                        >
                          ⤦ voir
                        </button>
                      )}
                      <button
                        className="dp-chip__remove"
                        onClick={() => onRemove(animal.nom)}
                        aria-label={`Retirer ${animal.nom}`}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="dp-dock-hint">Cliquez sur un animal dans la palette pour le superposer à la frise.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VIEW HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function computeInitialView(apparition, extinction) {
  const aMa = toMa(apparition);
  const eMa = toMa(extinction);
  const a = aMa ?? eMa ?? -300;
  const e = eMa ?? 0;
  const mid = (a + e) / 2;
  const dur = Math.abs(a - e);
  const margin = Math.max(dur * 3, 40);
  return {
    start: Math.max(TIMELINE_MIN, mid - margin),
    end: Math.min(TIMELINE_MAX, mid + margin * 0.6),
  };
}

function computeAnimalView(animal, currentSpan) {
  const startMa = toMa(animal.apparition);
  const endMa = toMa(animal.extinction) ?? 0;
  const a = startMa ?? endMa ?? -300;
  const e = endMa;
  const mid = (a + e) / 2;
  const dur = Math.abs(a - e);
  const margin = Math.max(dur * 2, currentSpan * 0.4, 20);
  return {
    start: Math.max(TIMELINE_MIN, mid - margin),
    end: Math.min(TIMELINE_MAX, mid + margin * 0.6),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
const GeoInfo = ({ geologie, animalNom }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const dragRef = useRef({ active: false, lastX: 0 });
  const mouseDownXRef = useRef(0);
  const lanedCompareRef = useRef([]);
  const compareSectionTopRef = useRef(0);
  const [tooltip, setTooltip] = useState(null);
  const [outOfViewArrows, setOutOfViewArrows] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const colorIndexRef = useRef(0);

  const apparitionRaw = geologie?.apparition ?? null;
  const extinctionRaw = geologie?.extinction ?? null;
  const apparition = toMa(apparitionRaw);
  const extinction = toMa(extinctionRaw);

  const [view, setView] = useState(() => computeInitialView(apparitionRaw, extinctionRaw));

  useEffect(() => {
    setView(computeInitialView(apparitionRaw, extinctionRaw));
  }, [String(apparitionRaw), String(extinctionRaw)]);

  useEffect(() => {
    if (compareList.length === 0) colorIndexRef.current = 0;
  }, [compareList.length]);

  const handleAddCompare = useCallback((animal) => {
    setCompareList((prev) => {
      if (prev.find((a) => a.nom === animal.nom)) return prev;
      const color = COMPARE_PALETTE[colorIndexRef.current % COMPARE_PALETTE.length];
      colorIndexRef.current++;
      return [...prev, { ...animal, color }];
    });
  }, []);

  const handleAddAllContemporaries = useCallback((animals) => {
    setCompareList((prev) => {
      const toAdd = animals.filter((a) => !prev.find((p) => p.nom === a.nom));
      if (toAdd.length === 0) return prev;
      const newItems = toAdd.map((a) => {
        const color = COMPARE_PALETTE[colorIndexRef.current % COMPARE_PALETTE.length];
        colorIndexRef.current++;
        return { ...a, color };
      });
      return [...prev, ...newItems];
    });
  }, []);

  const handleRemoveCompare = useCallback((nom) => {
    setCompareList((prev) => prev.filter((a) => a.nom !== nom));
  }, []);

  const handleResetCompare = useCallback(() => {
    setCompareList([]);
    colorIndexRef.current = 0;
  }, []);

  const handleJumpToAnimal = useCallback(
    (animal) => {
      const span = view.end - view.start;
      setView(computeAnimalView(animal, span));
    },
    [view],
  );

  // ── CANVAS DRAW ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const W = wrapper.offsetWidth || 600;

    const { laned: lanedCompare, laneCount } = assignCompareLanes(compareList);

    const COMPARE_SECTION_LABEL_H = laneCount > 0 ? 18 : 0;
    const COMPARE_SECTION_H =
      laneCount > 0 ? COMPARE_SECTION_LABEL_H + laneCount * (COMPARE_LANE_H + COMPARE_LANE_GAP) + 8 : 0;

    const BAR_Y = AXIS_Y + 18;
    const BAR_H = 26;
    const H = BAR_Y + BAR_H + 8 + COMPARE_SECTION_H + 8;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const { start: vs, end: ve } = view;
    const span = ve - vs;
    const maToX = (ma) => ((ma - vs) / span) * W;

    drawBands(ctx, ERAS, W, maToX, ERA_Y, ERA_H, 28, 12);
    drawBands(ctx, PERIODS, W, maToX, PER_Y, PER_H, 20, 11);
    drawBands(ctx, EPOCHS, W, maToX, EPO_Y, EPO_H, 14, 10);
    drawBands(ctx, STAGES, W, maToX, STA_Y, STA_H, 12, 9);

    ctx.strokeStyle = 'rgba(30,30,30,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, AXIS_Y);
    ctx.lineTo(W, AXIS_Y);
    ctx.stroke();

    const tickInterval = TICK_INTERVALS.find((t) => span / t <= 9) ?? 500;
    const startTick = Math.ceil(vs / tickInterval) * tickInterval;
    for (let ma = startTick; ma <= ve; ma += tickInterval) {
      const maNorm = Math.round(ma / tickInterval) * tickInterval;
      const x = maToX(maNorm);
      if (x < 2 || x > W - 2) continue;
      ctx.strokeStyle = 'rgba(30,30,30,0.1)';
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(x, AXIS_Y);
      ctx.lineTo(x, H);
      ctx.stroke();
      ctx.fillStyle = '#4A3D2A';
      ctx.font = `500 12px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText(formatTickMa(maNorm), x, AXIS_Y + 14);
    }

    const nowX = maToX(0);
    if (nowX >= 0 && nowX <= W) {
      ctx.strokeStyle = '#C0392B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nowX, AXIS_Y);
      ctx.lineTo(nowX, H);
      ctx.stroke();
      ctx.fillStyle = '#C0392B';
      ctx.font = `700 11px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText(TODAY, nowX, AXIS_Y + 14);
    }

    // ── Main animal bar ──────────────────────────────────────────────────
    if (apparition != null || extinction != null) {
      const barStartMa = apparition ?? extinction;
      const barEndMa = extinction ?? 0;
      const bx1 = maToX(barStartMa);
      const bx2 = maToX(barEndMa);

      if (bx2 >= 0 && bx1 <= W) {
        const rbx1 = Math.max(2, bx1);
        const rbx2 = Math.min(W - 2, bx2);
        const barW = Math.max(rbx2 - rbx1, 10);

        const midMa = (barStartMa + barEndMa) / 2;
        const matchEra = ERAS.find((er) => midMa >= er.start && midMa < er.end);
        const barFill = matchEra ? matchEra.fill : '#4A3D2A';

        ctx.fillStyle = barFill + 'EE';
        ctx.beginPath();
        ctx.roundRect(rbx1, BAR_Y, barW, BAR_H, 5);
        ctx.fill();

        if (barW > 30) {
          const visibleLeft = Math.max(0, bx1 + 4);
          const visibleRight = Math.min(W, bx2 - 4);
          const visCenterX = (visibleLeft + visibleRight) / 2;
          const fs = Math.max(11, Math.min(13, barW / 10));
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `700 ${fs}px ${FONT}`;
          ctx.textAlign = 'center';
          ctx.save();
          ctx.beginPath();
          ctx.rect(rbx1 + 3, BAR_Y + 2, barW - 6, BAR_H - 4);
          ctx.clip();
          ctx.fillText(animalNom || '', visCenterX, BAR_Y + BAR_H / 2 + fs * 0.35);
          ctx.restore();
        }

        [rbx1, rbx1 + barW].forEach((px) => {
          if (px < 0 || px > W) return;
          ctx.beginPath();
          ctx.arc(px, BAR_Y + BAR_H / 2, 4, 0, Math.PI * 2);
          ctx.fillStyle = barFill;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        const midBarX = (Math.max(0, bx1) + Math.min(W, bx2)) / 2;
        ctx.strokeStyle = barFill + '66';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(midBarX, AXIS_Y);
        ctx.lineTo(midBarX, BAR_Y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ── Compare bars ──────────────────────────────────────────────────────
    const newArrows = [];

    if (laneCount > 0) {
      const SECTION_TOP = BAR_Y + BAR_H + 10;

      ctx.fillStyle = 'rgba(245, 241, 236, 0.55)';
      ctx.fillRect(0, SECTION_TOP, W, COMPARE_SECTION_H);

      ctx.strokeStyle = 'rgba(74,46,26,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, SECTION_TOP);
      ctx.lineTo(W, SECTION_TOP);
      ctx.stroke();

      ctx.fillStyle = 'rgba(74,46,26,0.32)';
      ctx.font = `700 8px ${FONT}`;
      ctx.textAlign = 'left';
      ctx.fillText('COMPARAISON', 8, SECTION_TOP + 11);

      const LANES_TOP = SECTION_TOP + COMPARE_SECTION_LABEL_H;

      lanedCompare.forEach((animal) => {
        const startMa = toMa(animal.apparition);
        const endMa = toMa(animal.extinction) ?? 0;
        if (startMa == null && endMa == null) return;

        const bStartMa = startMa ?? endMa;
        const bEndMa = endMa;
        const bx1 = maToX(bStartMa);
        const bx2 = maToX(bEndMa);

        if (bx2 < 0 || bx1 > W) {
          const direction = bx1 > W ? 'right' : 'left';
          newArrows.push({
            nom: animal.nom,
            color: animal.color,
            direction,
            apparition: animal.apparition,
            extinction: animal.extinction,
          });
          return;
        }

        const laneY = LANES_TOP + animal.lane * (COMPARE_LANE_H + COMPARE_LANE_GAP) + 2;
        const rbx1 = Math.max(2, bx1);
        const rbx2 = Math.min(W - 2, bx2);
        const barW = Math.max(rbx2 - rbx1, 6);

        const visLeft = Math.max(0, bx1);
        const visRight = Math.min(W, bx2);
        const visCenterX = (visLeft + visRight) / 2;

        if (apparition != null || extinction != null) {
          const mainStart = apparition ?? extinction;
          const mainEnd = extinction ?? 0;
          const overlapStart = Math.max(Math.min(bStartMa, bEndMa), Math.min(mainStart, mainEnd));
          const overlapEnd = Math.min(Math.max(bStartMa, bEndMa), Math.max(mainStart, mainEnd));
          if (overlapEnd > overlapStart) {
            const ox1 = Math.max(0, maToX(overlapStart));
            const ox2 = Math.min(W, maToX(overlapEnd));
            if (ox2 > ox1) {
              ctx.fillStyle = animal.color + '0C';
              ctx.fillRect(ox1, BAR_Y - 1, ox2 - ox1, laneY + COMPARE_LANE_H - BAR_Y + 3);
            }
          }
        }

        ctx.fillStyle = animal.color + 'BB';
        ctx.beginPath();
        ctx.roundRect(rbx1, laneY, barW, COMPARE_LANE_H, 4);
        ctx.fill();

        ctx.strokeStyle = animal.color + 'FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(rbx1, laneY, barW, COMPARE_LANE_H, 4);
        ctx.stroke();

        if (barW > 20) {
          const fs = Math.min(11, Math.max(9, barW / 12));
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `600 ${fs}px ${FONT}`;
          ctx.textAlign = 'center';
          ctx.save();
          ctx.beginPath();
          ctx.rect(rbx1 + 3, laneY, barW - 6, COMPARE_LANE_H);
          ctx.clip();
          ctx.fillText(animal.nom, visCenterX, laneY + COMPARE_LANE_H / 2 + fs * 0.35);
          ctx.restore();
        }

        [rbx1, rbx1 + barW].forEach((px) => {
          if (px < 2 || px > W - 2) return;
          ctx.beginPath();
          ctx.arc(px, laneY + COMPARE_LANE_H / 2, 3, 0, Math.PI * 2);
          ctx.fillStyle = animal.color;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      });
    }

    setOutOfViewArrows(newArrows);
    lanedCompareRef.current = lanedCompare;
    compareSectionTopRef.current = laneCount > 0 ? AXIS_Y + 18 + 26 + 10 : 0;
  }, [view, apparition, extinction, animalNom, compareList]);

  // ── EVENT HANDLERS ───────────────────────────────────────────────────────
  const handleMouseMoveCanvas = useCallback(
    (e) => {
      if (dragRef.current.active) return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const { start: vs, end: ve } = view;
      const W = wrapper.offsetWidth;
      const ma = vs + (mx / W) * (ve - vs);

      if (my >= STA_Y && my <= STA_Y + STA_H) {
        const hit = STAGES.find((s) => ma >= s.start && ma < s.end);
        if (hit) {
          setTooltip({ x: mx, y: STA_Y - 4, name: hit.name });
          wrapper.style.cursor = 'grab';
          return;
        }
      }

      const SECTION_TOP = compareSectionTopRef.current;
      const laned = lanedCompareRef.current;
      if (SECTION_TOP > 0 && laned.length > 0 && my >= SECTION_TOP) {
        const LANES_TOP = SECTION_TOP + 18;
        for (const animal of laned) {
          const startMa = toMa(animal.apparition);
          const endMa = toMa(animal.extinction) ?? 0;
          if (startMa == null) continue;
          const bStartMa = startMa;
          const bEndMa = endMa;
          const laneY = LANES_TOP + animal.lane * (COMPARE_LANE_H + COMPARE_LANE_GAP) + 2;
          if (my >= laneY && my <= laneY + COMPARE_LANE_H) {
            if (ma >= Math.min(bStartMa, bEndMa) && ma <= Math.max(bStartMa, bEndMa)) {
              setTooltip({ x: mx, y: laneY - 4, name: animal.nom });
              wrapper.style.cursor = 'pointer';
              return;
            }
          }
        }
      }

      wrapper.style.cursor = 'grab';
      setTooltip(null);
    },
    [view],
  );

  function clampView({ start, end }) {
    const span = end - start;
    if (start < TIMELINE_MIN) return { start: TIMELINE_MIN, end: TIMELINE_MIN + span };
    if (end > TIMELINE_MAX) return { start: TIMELINE_MAX - span, end: TIMELINE_MAX };
    return { start, end };
  }

  function pan(deltaX) {
    const W = wrapperRef.current?.offsetWidth || 600;
    const span = view.end - view.start;
    const shift = -(deltaX / W) * span;
    setView((v) => clampView({ start: v.start + shift, end: v.end + shift }));
  }

  function zoom(factor, pivotRatio = 0.5) {
    setView((v) => {
      const span = v.end - v.start;
      const pivotMa = v.start + pivotRatio * span;
      const newSpan = Math.min(Math.abs(TIMELINE_MAX - TIMELINE_MIN), Math.max(0.00005, span * factor));
      return clampView({
        start: pivotMa - pivotRatio * newSpan,
        end: pivotMa + (1 - pivotRatio) * newSpan,
      });
    });
  }

  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      const rect = wrapperRef.current.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      zoom(e.deltaY > 0 ? 1.18 : 0.85, ratio);
    },
    [view],
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  useEffect(() => {
    const ro = new ResizeObserver(() => setView((v) => ({ ...v })));
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const span = view.end - view.start;
  const spanLabel = formatTickMa(Math.abs(span));
  const TOTAL = Math.abs(TIMELINE_MIN - TIMELINE_MAX);
  const thumbLeft = Math.max(0, Math.min(96, ((view.start - TIMELINE_MIN) / TOTAL) * 100));
  const thumbWidth = Math.max(2, Math.min(100 - thumbLeft, (span / TOTAL) * 100));

  const hasData = apparitionRaw != null || extinctionRaw != null || geologie?.ere;

  if (!hasData) {
    return (
      <section className="animal-geologie">
        <h3>Géologie</h3>
        <div className="geo-display">
          <div className="geo-item active">
            <div className="geo-label">Information</div>
            <div className="geo-value">À venir…</div>
          </div>
        </div>
      </section>
    );
  }

  const leftArrows = outOfViewArrows.filter((a) => a.direction === 'left');
  const rightArrows = outOfViewArrows.filter((a) => a.direction === 'right');

  // ── Helpers pour construire l'item de modale ──────────────────────────────
  function buildModalItem(animal) {
    const startMa = toMa(animal.apparition);
    const endMa = toMa(animal.extinction) ?? 0;
    const s = startMa ?? endMa;
    const e = endMa;
    const hasZeroDuration = s != null && Math.abs(s - e) < 0.001;
    return {
      ...animal,
      type: 'animal',
      name: animal.nom,
      start: s,
      end: e,
      info: '',
      hasZeroDuration,
    };
  }

  return (
    <section className="animal-geologie geo-timeline-mode">
      <div className="geo-tl-header">
        <h3>Géologie</h3>
        <div className="geo-tl-badges">
          {geologie?.ere && <span className="geo-badge geo-badge--era">{geologie.ere}</span>}
          {geologie?.periode && <span className="geo-badge geo-badge--period">{geologie.periode}</span>}
          {geologie?.epoque && <span className="geo-badge geo-badge--epoch">{geologie.epoque}</span>}
          {geologie?.stage && <span className="geo-badge geo-badge--stage">{geologie.stage}</span>}
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="geo-tl-track"
        onMouseDown={(e) => {
          dragRef.current = { active: true, lastX: e.clientX };
          mouseDownXRef.current = e.clientX;
        }}
        onMouseMove={(e) => {
          if (dragRef.current.active) {
            pan(e.clientX - dragRef.current.lastX);
            dragRef.current.lastX = e.clientX;
          }
          handleMouseMoveCanvas(e);
        }}
        onMouseUp={(e) => {
          dragRef.current.active = false;
          // Clic simple (pas un drag)
          if (Math.abs(e.clientX - mouseDownXRef.current) > 5) return;
          const wrapper = wrapperRef.current;
          if (!wrapper) return;
          const rect = wrapper.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;
          const { start: vs, end: ve } = view;
          const W = wrapper.offsetWidth;
          const ma = vs + (mx / W) * (ve - vs);
          const SECTION_TOP = compareSectionTopRef.current;
          const laned = lanedCompareRef.current;
          if (SECTION_TOP > 0 && laned.length > 0 && my >= SECTION_TOP) {
            const LANES_TOP = SECTION_TOP + 18;
            for (const animal of laned) {
              const startMa = toMa(animal.apparition);
              const endMa = toMa(animal.extinction) ?? 0;
              if (startMa == null) continue;
              const laneY = LANES_TOP + animal.lane * (COMPARE_LANE_H + COMPARE_LANE_GAP) + 2;
              if (my >= laneY && my <= laneY + COMPARE_LANE_H) {
                if (ma >= Math.min(startMa, endMa) && ma <= Math.max(startMa, endMa)) {
                  setSelectedAnimal(buildModalItem(animal));
                  return;
                }
              }
            }
          }
        }}
        onMouseLeave={() => {
          dragRef.current.active = false;
          setTooltip(null);
          if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
        }}
        onTouchStart={(e) => {
          dragRef.current = { active: true, lastX: e.touches[0].clientX };
        }}
        onTouchMove={(e) => {
          if (!dragRef.current.active) return;
          pan(e.touches[0].clientX - dragRef.current.lastX);
          dragRef.current.lastX = e.touches[0].clientX;
        }}
        onTouchEnd={() => {
          dragRef.current.active = false;
        }}
      >
        <canvas ref={canvasRef} />

        {leftArrows.length > 0 && (
          <div className="geo-tl-arrow geo-tl-arrow--left" style={{ top: '60%' }}>
            {leftArrows.map((a, idx) => (
              <button
                key={a.nom}
                className="geo-tl-arrow__pip"
                style={{ background: a.color, animationDelay: `${idx * 0.05}s` }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleJumpToAnimal(a);
                }}
                title={`Aller à ${a.nom}`}
                aria-label={`Centrer la vue sur ${a.nom}`}
              >
                ‹
              </button>
            ))}
            {leftArrows.map((a) => (
              <span key={a.nom + '-lbl'} className="geo-tl-arrow__label" style={{ color: a.color }}>
                {a.nom}
              </span>
            ))}
          </div>
        )}

        {rightArrows.length > 0 && (
          <div className="geo-tl-arrow geo-tl-arrow--right" style={{ top: '60%' }}>
            {rightArrows.map((a, idx) => (
              <button
                key={a.nom}
                className="geo-tl-arrow__pip"
                style={{ background: a.color, animationDelay: `${idx * 0.05}s` }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleJumpToAnimal(a);
                }}
                title={`Aller à ${a.nom}`}
                aria-label={`Centrer la vue sur ${a.nom}`}
              >
                ›
              </button>
            ))}
            {rightArrows.map((a) => (
              <span key={a.nom + '-lbl'} className="geo-tl-arrow__label" style={{ color: a.color }}>
                {a.nom}
              </span>
            ))}
          </div>
        )}

        {tooltip && (
          <div className="geo-tl-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.name}
          </div>
        )}
        <div className="geo-tl-hint">← Glisser · Molette pour zoomer →</div>
      </div>

      <div className="geo-tl-minimap">
        <span className="geo-tl-minimap-label">−591 Ma</span>
        <div className="geo-tl-minimap-bar">
          <div className="geo-tl-minimap-thumb" style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%` }} />
        </div>
        <span className="geo-tl-minimap-label">+1000 ans</span>
      </div>

      <div className="geo-tl-controls">
        <button className="geo-tl-btn" onClick={() => pan((wrapperRef.current?.offsetWidth || 300) * 0.4)}>
          ← Ancien
        </button>
        <div className="geo-tl-zoom">
          <button className="geo-tl-zoom-btn" onClick={() => zoom(1.5)}>
            −
          </button>
          <button
            className="geo-tl-center-btn"
            onClick={() => setView(computeInitialView(apparitionRaw, extinctionRaw))}
            title="Recentrer sur l'animal"
          >
            {spanLabel}
          </button>
          <button className="geo-tl-zoom-btn" onClick={() => zoom(0.55)}>
            +
          </button>
        </div>
        <button className="geo-tl-btn" onClick={() => pan((-wrapperRef.current?.offsetWidth || 300) * 0.4)}>
          Récent →
        </button>
      </div>

      <DualPaneCompare
        compareList={compareList}
        onAdd={handleAddCompare}
        onRemove={handleRemoveCompare}
        onReset={handleResetCompare}
        onAddAll={handleAddAllContemporaries}
        onJumpTo={handleJumpToAnimal}
        apparition={apparition}
        extinction={extinction}
        currentNom={animalNom}
        paletteOpen={paletteOpen}
        onTogglePalette={() => setPaletteOpen((o) => !o)}
        view={view}
      />

      <GeoCard
        geologie={geologie}
        animalNom={animalNom}
        apparitionRaw={apparitionRaw}
        extinctionRaw={extinctionRaw}
        apparition={apparition}
        extinction={extinction}
      />

      {selectedAnimal && <Modal item={selectedAnimal} onClose={() => setSelectedAnimal(null)} />}
    </section>
  );
};

GeoInfo.propTypes = {
  geologie: PropTypes.object,
  animalNom: PropTypes.string,
};

export default GeoInfo;

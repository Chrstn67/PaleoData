'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Timeline.css';
import animalsData from '../data/data';
import {
  TIMELINE_MIN,
  TIMELINE_MAX,
  ERAS,
  PERIODS,
  EPOCHS,
  STAGES,
  ALL_GEO_ITEMS,
  TICK_INTERVALS,
  eraInfoMap,
  periodInfoMap,
  stageInfoMap,
} from '../data/geoConstants';

// ─────────────────────────────────────────────────────────────────────────────
// ANIMALS : préparation + assignation de lanes
// ─────────────────────────────────────────────────────────────────────────────

const TODAY = new Date().getFullYear();

function toMa(val) {
  if (val == null) return null;
  if (typeof val === 'number' && val > 0) {
    const yearsAgo = TODAY - val;
    return -(yearsAgo / 1_000_000);
  }
  return typeof val === 'number' ? val : null;
}

function animalBarColor(startMa, endMa) {
  const mid = (startMa + endMa) / 2;
  const era = ERAS.find((e) => mid >= e.start && mid < e.end);
  return era ? era.fill : '#4A3D2A';
}

function prepareAnimals(rawAnimals) {
  return rawAnimals
    .map((a, idx) => {
      const geo = a.geologie || {};
      const apparition = toMa(geo.apparition);
      const extinction = toMa(geo.extinction);
      if (apparition == null && extinction == null) return null;

      let start = apparition ?? extinction;
      let end = extinction ?? 0;
      const hasZeroDuration = start === end;

      if (hasZeroDuration) {
        start = start - 0.5;
        end = start + 1;
      }

      return {
        idx,
        nom: a.nom || `Animal ${idx + 1}`,
        start,
        end,
        geo,
        color: animalBarColor(start, end),
        lane: 0,
        hasZeroDuration,
        image_url: a.image_url,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);
}

function assignLanes(animals) {
  const result = animals.map((a) => ({ ...a }));
  const laneEnd = [];
  result.forEach((animal) => {
    let assigned = false;
    for (let l = 0; l < laneEnd.length; l++) {
      if (animal.start > laneEnd[l] + 0.001) {
        animal.lane = l;
        laneEnd[l] = animal.end;
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      animal.lane = laneEnd.length;
      laneEnd.push(animal.end);
    }
  });
  return { animals: result, laneCount: laneEnd.length };
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────

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

function formatMaFull(ma) {
  if (ma == null) return 'Inconnue';
  if (typeof ma === 'number' && ma > 0) return `En ${Math.round(ma)} AP. J.-C.`;
  if (ma === 0) return "Aujourd'hui";
  const abs = Math.abs(ma);
  if (abs < 0.001) return `${Math.round(abs * 1_000_000)} ans`;
  if (abs < 0.1) return `${Math.round(abs * 1000 * 1000)} ans`;
  if (abs < 1) return `${Math.round(abs * 1000)} 000 ans`;
  if (abs % 1 === 0) return `${abs} Ma`;
  return `${abs.toFixed(1)} Ma`;
}

function durationStr(s, e) {
  const d = Math.abs(e - s);
  if (d < 0.001) return `${Math.round(d * 1e6)} ans`;
  if (d < 0.1) return `${(d * 1000).toFixed(1)} ka`;
  if (d < 1) return `${Math.round(d * 1000)} ka`;
  return `${d.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} Ma`;
}

function computeInitialView(item) {
  if (!item) return { start: TIMELINE_MIN, end: TIMELINE_MAX };
  const span = Math.abs(item.end - item.start);
  const margin = span === 0 ? 10 : Math.max(span * 2.5, 30);
  const mid = (item.start + item.end) / 2;
  return {
    start: Math.max(TIMELINE_MIN, mid - margin),
    end: Math.min(TIMELINE_MAX, mid + margin),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS DRAWING
// ─────────────────────────────────────────────────────────────────────────────
const FONT_CANVAS = "'DM Sans', system-ui, sans-serif";
const ANIMAL_LANE_H = 22;
const ANIMAL_LANE_GAP = 3;

function drawBands(ctx, list, W, maToX, yStart, rowH, minWidthForText, fontSize) {
  list.forEach((item) => {
    const x1 = maToX(item.start);
    const x2 = maToX(item.end);
    if (x2 < 0 || x1 > W) return;
    const rx1 = Math.max(0, x1);
    const rx2 = Math.min(W, x2);
    const bw = rx2 - rx1;

    ctx.fillStyle = item.fill + '65';
    ctx.fillRect(rx1, yStart, bw, rowH);
    ctx.fillStyle = item.fill;
    ctx.fillRect(rx1, yStart + rowH - 2, bw, 2);
    ctx.strokeStyle = item.fill + 'AA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rx1, yStart);
    ctx.lineTo(rx1, yStart + rowH - 2);
    ctx.stroke();

    if (bw >= minWidthForText) {
      const fs = Math.max(fontSize, Math.min(fontSize + 2, bw / 7));
      ctx.fillStyle = item.text;
      ctx.font = `600 ${fs}px ${FONT_CANVAS}`;
      ctx.textAlign = 'center';
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx1 + 2, yStart, bw - 4, rowH);
      ctx.clip();
      ctx.fillText(item.name, (rx1 + rx2) / 2, yStart + rowH / 2 + fs * 0.35);
      ctx.restore();
    } else if (bw >= 3 && item.tiny) {
      const cx = (rx1 + rx2) / 2;
      ctx.fillStyle = item.fill;
      ctx.fillRect(cx - 1, yStart + 2, 2, rowH - 6);
    }
  });
}

function drawAnimals(ctx, animals, W, maToX, baseY, laneCount, hoveredIdx) {
  if (!animals.length) return;
  const totalH = laneCount * (ANIMAL_LANE_H + ANIMAL_LANE_GAP);

  ctx.fillStyle = 'rgba(245, 241, 236, 0.6)';
  ctx.fillRect(0, baseY, W, totalH + 4);

  ctx.strokeStyle = 'rgba(74,46,26,0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  ctx.lineTo(W, baseY);
  ctx.stroke();

  animals.forEach((animal) => {
    const x1 = maToX(animal.start);
    const x2 = maToX(animal.end);
    if (x2 < 0 || x1 > W) return;
    const rx1 = Math.max(2, x1);
    const rx2 = Math.min(W - 2, x2);
    const bw = Math.max(rx2 - rx1, animal.hasZeroDuration ? 12 : 6);
    const laneY = baseY + animal.lane * (ANIMAL_LANE_H + ANIMAL_LANE_GAP) + 2;

    const isHovered = hoveredIdx === animal.idx;
    ctx.fillStyle = animal.color + (isHovered ? 'EE' : 'BB');
    ctx.beginPath();
    ctx.roundRect(rx1, laneY, bw, ANIMAL_LANE_H, 4);
    ctx.fill();

    if (isHovered) {
      ctx.strokeStyle = animal.color + 'FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(rx1, laneY, bw, ANIMAL_LANE_H, 4);
      ctx.stroke();
    }

    if (bw > 30) {
      const fs = Math.min(11, Math.max(9, bw / 12));
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `600 ${fs}px ${FONT_CANVAS}`;
      ctx.textAlign = 'center';
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx1 + 3, laneY, bw - 6, ANIMAL_LANE_H);
      ctx.clip();
      ctx.fillText(animal.nom, rx1 + bw / 2, laneY + ANIMAL_LANE_H / 2 + fs * 0.35);
      ctx.restore();
    }

    [rx1, rx1 + bw].forEach((px) => {
      if (px < 0 || px > W) return;
      ctx.beginPath();
      ctx.arc(px, laneY + ANIMAL_LANE_H / 2, 3, 0, Math.PI * 2);
      ctx.fillStyle = animal.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH BAR
// ─────────────────────────────────────────────────────────────────────────────
const TYPE_LABELS = { era: 'Ère', period: 'Période', epoch: 'Époque', stage: 'Étage', animal: 'Animal' };

function SearchBar({ onSelect, animalItems }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const dropRef = useRef(null);

  const ALL_SEARCHABLE = [...ALL_GEO_ITEMS, ...animalItems];

  function search(q) {
    if (!q.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const sq = q
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Extraire tous les nombres signés présents dans la saisie
    // Exemples : "-56" → -56 | "-55.2" → -55.2 | "66" → 66
    const numMatches = [...q.matchAll(/-?\d+(\.\d+)?/g)];
    const nums = numMatches.map((m) => parseFloat(m[0]));

    const found = ALL_SEARCHABLE.filter((it) => {
      // 1. Correspondance textuelle (nom de l'item)
      const n = it.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (n.includes(sq)) return true;

      // 2. Correspondance par intervalle temporel
      if (nums.length === 0) return false;

      // Les items ont start ≤ end dans l'espace Ma interne
      // (start plus négatif = plus ancien)
      const lo = Math.min(it.start, it.end);
      const hi = Math.max(it.start, it.end);

      return nums.some((num) => {
        // Test direct : la date tapée est-elle dans l'intervalle ?
        if (num >= lo && num <= hi) return true;
        // Test avec signe inversé : l'utilisateur a tapé "56" pour "-56 Ma"
        const neg = -Math.abs(num);
        return neg >= lo && neg <= hi;
      });
    });

    setSuggestions(found.slice(0, 10));
    setOpen(found.length > 0);
  }

  useEffect(() => {
    const fn = (e) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      )
        setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const clear = () => {
    setQuery('');
    setSuggestions([]);
    setOpen(false);
  };
  const select = (item) => {
    onSelect(item);
    clear();
  };

  return (
    <div className="tl-search">
      <div className="tl-search__box">
        <span className="tl-search__icon">🔍</span>
        <input
          ref={inputRef}
          className="tl-search__input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
          onFocus={() => query && setOpen(true)}
          placeholder='Rechercher : "Jurassique", "Mammouth", "−66 Ma"…'
        />
        {query && (
          <button className="tl-search__clear" onClick={clear}>
            ✕
          </button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div ref={dropRef} className="tl-search__dropdown">
          {suggestions.map((it, i) => (
            <div key={i} className="tl-search__item" onClick={() => select(it)}>
              <div className="tl-search__item-top">
                <div className="tl-search__dot" style={{ background: it.type === 'animal' ? it.color : it.fill }} />
                <span className="tl-search__name">{it.name}</span>
                <span className={`badge badge--${it.type}`}>{TYPE_LABELS[it.type]}</span>
              </div>
              <div className="tl-search__path">
                {formatMaFull(it.start)} → {formatMaFull(it.end)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
function Modal({ item, onClose }) {
  const ref = useRef(null);
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
        <div className="tl-modal__header">
          <div className="tl-modal__dot" style={{ background: accentColor }} />
          <div className="tl-modal__header-inner">
            <div className="tl-modal__name-row">
              <span className={`tl-modal__name ${isAnimal ? 'tl-modal__name--italic' : ''}`}>{displayName}</span>
              <span className={`badge badge--${item.type}`}>{TYPE_LABELS[item.type]}</span>
              {isAnimal && item.hasZeroDuration && <span className="badge badge--warning">Durée très courte</span>}
            </div>
          </div>
          <button className="tl-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

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

        {isAnimal && (
          <>
            <div className="tl-modal__geo-badges">
              {item.geo?.ere && <span className="geo-badge geo-badge--era">{item.geo.ere}</span>}
              {item.geo?.periode && <span className="geo-badge geo-badge--period">{item.geo.periode}</span>}
              {item.geo?.epoque && <span className="geo-badge geo-badge--epoch">{item.geo.epoque}</span>}
              {item.geo?.stage && <span className="geo-badge geo-badge--stage">{item.geo.stage}</span>}
            </div>
            {item.image_url ? (
              <div className="tl-modal__image-container">
                <Link to={`/animal/${encodeURIComponent(item.nom)}`} className="tl-modal__image-link">
                  <img src={item.image_url} alt={item.nom} className="tl-modal__image" />
                  <div className="tl-modal__image-overlay tl-modal__image-overlay--always">
                    <span className="tl-modal__view-button">Voir +</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="tl-modal__link-container">
                <Link to={`/animal/${encodeURIComponent(item.nom)}`} className="tl-modal__text-link">
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
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function TimelineVertical() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const dragRef = useRef({ active: false, lastX: 0 });

  const [view, setView] = useState({ start: TIMELINE_MIN, end: TIMELINE_MAX });
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoveredAnimalIdx, setHoveredAnimalIdx] = useState(null);
  const [showAnimals, setShowAnimals] = useState(false);

  const allAnimals = prepareAnimals(Array.isArray(animalsData) ? animalsData : []);
  const { animals: lanedAnimals, laneCount } = assignLanes(allAnimals);

  const animalSearchItems = allAnimals.map((a) => ({
    name: a.nom,
    start: a.start,
    end: a.end,
    type: 'animal',
    color: a.color,
    geo: a.geo,
    idx: a.idx,
    info: '',
    hasZeroDuration: a.hasZeroDuration,
    image_url: a.image_url,
  }));

  // Layout canvas
  const ERA_Y = 0,
    ERA_H = 48;
  const PER_Y = 48,
    PER_H = 38;
  const EPO_Y = 86,
    EPO_H = 32;
  const STA_Y = 118,
    STA_H = 26;
  const AXIS_Y = STA_Y + STA_H;
  const TICKS_H = 22;
  const ANIMALS_Y = AXIS_Y + TICKS_H;
  const animalsZoneH = showAnimals && laneCount > 0 ? laneCount * (ANIMAL_LANE_H + ANIMAL_LANE_GAP) + 8 : 0;
  const CANVAS_H = ANIMALS_Y + animalsZoneH + 2;

  const clampView = useCallback(({ start, end }) => {
    const span = end - start;
    if (start < TIMELINE_MIN) return { start: TIMELINE_MIN, end: TIMELINE_MIN + span };
    if (end > TIMELINE_MAX) return { start: TIMELINE_MAX - span, end: TIMELINE_MAX };
    return { start, end };
  }, []);

  const pan = useCallback(
    (deltaX) => {
      const W = wrapperRef.current?.offsetWidth || 600;
      const span = view.end - view.start;
      const shift = -(deltaX / W) * span;
      setView((v) => clampView({ start: v.start + shift, end: v.end + shift }));
    },
    [view, clampView],
  );

  const zoom = useCallback(
    (factor, pivotRatio = 0.5) => {
      setView((v) => {
        const span = v.end - v.start;
        const pivotMa = v.start + pivotRatio * span;
        const newSpan = Math.min(Math.abs(TIMELINE_MAX - TIMELINE_MIN), Math.max(0.00005, span * factor));
        return clampView({ start: pivotMa - pivotRatio * newSpan, end: pivotMa + (1 - pivotRatio) * newSpan });
      });
    },
    [clampView],
  );

  function centerOn(ma) {
    const span = view.end - view.start;
    setView(clampView({ start: ma - span / 2, end: ma + span / 2 }));
  }

  function focusItem(item) {
    setView(computeInitialView(item));
    setSelected({ ...item });
  }

  // ── DESSIN CANVAS ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const W = wrapper.offsetWidth || 700;
    const H = CANVAS_H;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#FAFAF7';
    ctx.fillRect(0, 0, W, H);

    const { start: vs, end: ve } = view;
    const span = ve - vs;
    const maToX = (ma) => ((ma - vs) / span) * W;

    drawBands(ctx, ERAS, W, maToX, ERA_Y, ERA_H, 30, 12);
    drawBands(ctx, PERIODS, W, maToX, PER_Y, PER_H, 24, 11);
    drawBands(ctx, EPOCHS, W, maToX, EPO_Y, EPO_H, 18, 10);
    drawBands(ctx, STAGES, W, maToX, STA_Y, STA_H, 14, 9);

    // Axe
    ctx.strokeStyle = 'rgba(30,30,30,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, AXIS_Y);
    ctx.lineTo(W, AXIS_Y);
    ctx.stroke();

    // ── Ticks ──────────────────────────────────────────────────────
    const tickInterval = TICK_INTERVALS.find((t) => span / t <= 9) ?? 500;
    const startTick = Math.ceil(vs / tickInterval) * tickInterval;

    for (let ma = startTick; ma <= ve; ma += tickInterval) {
      const maNorm = Math.round(ma / tickInterval) * tickInterval;
      const x = maToX(maNorm);
      if (x < 2 || x > W - 2) continue;

      ctx.strokeStyle = 'rgba(30,30,30,0.12)';
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(x, AXIS_Y);
      ctx.lineTo(x, H);
      ctx.stroke();

      ctx.fillStyle = '#4A3D2A';
      ctx.font = `500 11px ${FONT_CANVAS}`;
      ctx.textAlign = 'center';
      ctx.fillText(formatTickMa(maNorm), x, AXIS_Y + 14);
    }

    // Ligne "Aujourd'hui"
    const nowX = maToX(0);
    if (nowX >= 0 && nowX <= W) {
      ctx.strokeStyle = '#C0392B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nowX, AXIS_Y);
      ctx.lineTo(nowX, H);
      ctx.stroke();
      ctx.fillStyle = '#C0392B';
      ctx.font = `700 11px ${FONT_CANVAS}`;
      ctx.textAlign = 'center';
      ctx.fillText(TODAY, nowX, AXIS_Y + 14);
    }

    if (showAnimals && laneCount > 0) {
      drawAnimals(ctx, lanedAnimals, W, maToX, ANIMALS_Y, laneCount, hoveredAnimalIdx);
    }
  }, [view, showAnimals, lanedAnimals, laneCount, hoveredAnimalIdx, CANVAS_H]);

  // ── HIT DETECTION ─────────────────────────────────────────────────
  const getHitAnimal = useCallback(
    (mx, my, W) => {
      if (!showAnimals || laneCount === 0) return null;
      const span = view.end - view.start;
      const ma = view.start + (mx / W) * span;
      if (my < ANIMALS_Y || my > ANIMALS_Y + laneCount * (ANIMAL_LANE_H + ANIMAL_LANE_GAP) + 8) return null;
      const lane = Math.floor((my - ANIMALS_Y) / (ANIMAL_LANE_H + ANIMAL_LANE_GAP));
      return lanedAnimals.find((a) => a.lane === lane && ma >= a.start && ma <= a.end) || null;
    },
    [showAnimals, laneCount, lanedAnimals, view, ANIMALS_Y],
  );

  const getHitGeo = useCallback(
    (mx, my, W) => {
      const span = view.end - view.start;
      const ma = view.start + (mx / W) * span;
      if (my >= ERA_Y && my < ERA_Y + ERA_H) {
        const found = ERAS.find((i) => ma >= i.start && ma < i.end);
        return found ? { ...found, type: 'era', info: eraInfoMap.get(found.name) || '' } : null;
      }
      if (my >= PER_Y && my < PER_Y + PER_H) {
        const found = PERIODS.find((i) => ma >= i.start && ma < i.end);
        return found ? { ...found, type: 'period', info: periodInfoMap.get(found.name) || '' } : null;
      }
      if (my >= EPO_Y && my < EPO_Y + EPO_H) {
        const found = EPOCHS.find((i) => ma >= i.start && ma < i.end);
        return found ? { ...found, type: 'epoch' } : null;
      }
      if (my >= STA_Y && my < STA_Y + STA_H) {
        const found = STAGES.find((i) => ma >= i.start && ma < i.end);
        return found ? { ...found, type: 'stage', info: stageInfoMap.get(found.name) || '' } : null;
      }
      return null;
    },
    [view],
  );

  // ── EVENTS ────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e) => {
      if (dragRef.current.active) {
        pan(e.clientX - dragRef.current.lastX);
        dragRef.current.lastX = e.clientX;
        setTooltip(null);
        setHoveredAnimalIdx(null);
        return;
      }
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const W = wrapper.offsetWidth;

      // Tooltip étages tiny
      if (my >= STA_Y && my <= STA_Y + STA_H) {
        const span = view.end - view.start;
        const ma = view.start + (mx / W) * span;
        const hit = STAGES.find((s) => ma >= s.start && ma < s.end);
        if (hit && hit.tiny) {
          setTooltip({ x: mx, y: STA_Y - 6, name: hit.name });
          setHoveredAnimalIdx(null);
          return;
        }
      }

      const hitAnimal = getHitAnimal(mx, my, W);
      if (hitAnimal) {
        setHoveredAnimalIdx(hitAnimal.idx);
        setTooltip({ x: mx, y: ANIMALS_Y - 4, name: hitAnimal.nom });
        return;
      }
      setTooltip(null);
      setHoveredAnimalIdx(null);
    },
    [pan, view, getHitAnimal, ANIMALS_Y],
  );

  const handleClick = useCallback(
    (e) => {
      if (Math.abs(e.clientX - (dragRef.current._downX || 0)) > 5) return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const W = wrapper.offsetWidth;

      const hitAnimal = getHitAnimal(mx, my, W);
      if (hitAnimal) {
        setSelected({ ...hitAnimal, type: 'animal', name: hitAnimal.nom, info: '' });
        return;
      }
      const hitGeo = getHitGeo(mx, my, W);
      if (hitGeo) setSelected(hitGeo);
    },
    [getHitAnimal, getHitGeo],
  );

  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      const rect = wrapperRef.current.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      zoom(e.deltaY > 0 ? 1.18 : 0.85, ratio);
    },
    [zoom],
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

  // ── MINIMAP + CONTRÔLES ────────────────────────────────────────────
  const TOTAL = Math.abs(TIMELINE_MAX - TIMELINE_MIN);
  const thumbLeft = Math.max(0, Math.min(96, ((view.start - TIMELINE_MIN) / TOTAL) * 100));
  const thumbWidth = Math.max(2, Math.min(100 - thumbLeft, ((view.end - view.start) / TOTAL) * 100));
  const spanLabel = formatTickMa(Math.abs(view.end - view.start));

  const NAV_SHORTCUTS = [
    { label: '−541 Ma', ma: TIMELINE_MIN },
    { label: '−252 Ma', ma: -252 },
    { label: '−65 Ma', ma: -65 },
    { label: "Aujourd'hui", ma: TODAY },
  ];

  return (
    <div className="tl-root">
      <div className="tl-header">
        <div>
          <h2 className="tl-header__title">Frise géologique</h2>
          <p className="tl-header__subtitle">
            Cambrien → Aujourd'hui · 541 Ma · Glisser / molette pour naviguer · Cliquer pour les détails
          </p>
        </div>
        <div className="tl-header__badges">
          {['era', 'period', 'epoch', 'stage'].map((t) => (
            <span key={t} className={`badge badge--${t}`}>
              {TYPE_LABELS[t]}
            </span>
          ))}
        </div>
      </div>

      <SearchBar onSelect={focusItem} animalItems={animalSearchItems} />

      {allAnimals.length > 0 && (
        <div className="tl-animals-section">
          <span className="tl-animals-section__title">🦕 Animaux ({allAnimals.length})</span>
          <button className="tl-animals-section__toggle" onClick={() => setShowAnimals((v) => !v)}>
            {showAnimals ? 'Masquer' : 'Afficher'}
          </button>
        </div>
      )}

      <div
        ref={wrapperRef}
        className="tl-track"
        style={{ cursor: dragRef.current?.active ? 'grabbing' : 'grab' }}
        onMouseDown={(e) => {
          dragRef.current = { active: true, lastX: e.clientX, _downX: e.clientX };
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={() => {
          dragRef.current.active = false;
        }}
        onMouseLeave={() => {
          dragRef.current.active = false;
          setTooltip(null);
          setHoveredAnimalIdx(null);
        }}
        onClick={handleClick}
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

        {tooltip && (
          <div
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
              background: 'rgba(44,26,11,0.92)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontFamily: 'var(--font-sans, sans-serif)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10,
              fontWeight: 500,
            }}
          >
            {tooltip.name}
          </div>
        )}

        <div className="tl-track__hint">← Glisser · Molette pour zoomer →</div>
      </div>

      <div className="tl-minimap">
        <span className="tl-minimap__label">−541 Ma</span>
        <div className="tl-minimap__track">
          <div className="tl-minimap__thumb" style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%` }} />
        </div>
        <span className="tl-minimap__label">{TODAY}</span>
      </div>

      <div className="tl-controls">
        <button className="tl-controls__btn" onClick={() => pan((wrapperRef.current?.offsetWidth || 300) * 0.4)}>
          ← Ancien
        </button>
        <div className="tl-controls__zoom">
          <button className="tl-controls__zoom-btn" onClick={() => zoom(1.5)}>
            −
          </button>
          <button
            className="tl-controls__center-btn"
            onClick={() => setView({ start: TIMELINE_MIN, end: TIMELINE_MAX })}
          >
            {spanLabel}
          </button>
          <button className="tl-controls__zoom-btn" onClick={() => zoom(0.55)}>
            +
          </button>
        </div>
        <button className="tl-controls__btn" onClick={() => pan((-wrapperRef.current?.offsetWidth || 300) * 0.4)}>
          Récent →
        </button>
      </div>

      <div className="tl-nav">
        {NAV_SHORTCUTS.map(({ label, ma }) => (
          <button key={label} className="tl-nav__btn" onClick={() => centerOn(ma)}>
            {label}
          </button>
        ))}
      </div>

      <p className="tl-footer-hint">Cliquez sur un segment ou une barre pour afficher les informations détaillées</p>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

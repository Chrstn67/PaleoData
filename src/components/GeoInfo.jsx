'use client';

import PropTypes from 'prop-types';
import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/GeoInfo.css';

// ── Limites de la frise ───────────────────────────────────────────
const TIMELINE_MIN = -591; // 50 Ma avant le Paléozoïque (-541)
const TIMELINE_MAX = 0.5; // ~1000 ans après aujourd'hui (0.001 Ma = 1000 ans)

// ── Ères ─────────────────────────────────────────────────────────
const ERAS = [
  { name: 'Paléozoïque', start: -541, end: -252.17, fill: '#1A6B6B', text: '#0D4040' },
  { name: 'Mésozoïque', start: -252.17, end: -66, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Cénozoïque', start: -66, end: TIMELINE_MAX, fill: '#8B6914', text: '#5a4008' },
];

// ── Périodes ──────────────────────────────────────────────────────
const PERIODS = [
  { name: 'Cambrien', start: -541, end: -485.4, fill: '#00695C', text: '#003D33' },
  { name: 'Ordovicien', start: -485.4, end: -443.8, fill: '#00838F', text: '#004D57' },
  { name: 'Silurien', start: -443.8, end: -419.2, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Dévonien', start: -419.2, end: -358.9, fill: '#BF6000', text: '#7A3D00' },
  { name: 'Carbonifère', start: -358.9, end: -298.9, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Permien', start: -298.9, end: -252.17, fill: '#C62828', text: '#7B1010' },
  { name: 'Trias', start: -252.17, end: -201.3, fill: '#A04000', text: '#5D2500' },
  { name: 'Jurassique', start: -201.3, end: -145, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Crétacé', start: -145, end: -66, fill: '#388E3C', text: '#1B5225' },
  { name: 'Paléogène', start: -66, end: -23.03, fill: '#8B6914', text: '#5a4008' },
  { name: 'Néogène', start: -23.03, end: -2.58, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Quaternaire', start: -2.58, end: TIMELINE_MAX, fill: '#7B8B00', text: '#485200' },
];

// ── Époques ───────────────────────────────────────────────────────
const EPOCHS = [
  { name: 'Terreneuvien', start: -541, end: -521, fill: '#00796B', text: '#003D33' },
  { name: 'Série 2', start: -521, end: -509, fill: '#00897B', text: '#00463D' },
  { name: 'Miaolingien', start: -509, end: -497, fill: '#00695C', text: '#003329' },
  { name: 'Furongien', start: -497, end: -485.4, fill: '#00695C', text: '#003329' },
  { name: 'Ordovicien Inférieur', start: -485.4, end: -470, fill: '#006978', text: '#003D47' },
  { name: 'Ordovicien Moyen', start: -470, end: -458.4, fill: '#00838F', text: '#004D57' },
  { name: 'Ordovicien Supérieur', start: -458.4, end: -443.8, fill: '#0097A7', text: '#005662' },
  { name: 'Llandovery', start: -443.8, end: -433.4, fill: '#388E3C', text: '#1B5225' },
  { name: 'Wenlock', start: -433.4, end: -427.4, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Ludlow', start: -427.4, end: -423, fill: '#388E3C', text: '#1B5225' },
  { name: 'Pridoli', start: -423, end: -419.2, fill: '#43A047', text: '#235928' },
  { name: 'Dévonien Inférieur', start: -419.2, end: -393.3, fill: '#E65100', text: '#7A2B00' },
  { name: 'Dévonien Moyen', start: -393.3, end: -382.7, fill: '#BF6000', text: '#7A3D00' },
  { name: 'Dévonien Supérieur', start: -382.7, end: -358.9, fill: '#A85400', text: '#5D2F00' },
  { name: 'Mississippien', start: -358.9, end: -323.2, fill: '#388E3C', text: '#1B5225' },
  { name: 'Pennsylvanien', start: -323.2, end: -298.9, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Cisuralien', start: -298.9, end: -272.3, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Guadalupien', start: -272.3, end: -259.8, fill: '#C62828', text: '#7B1010' },
  { name: 'Lopingien', start: -259.8, end: -252.17, fill: '#B71C1C', text: '#7B1010' },
  { name: 'Trias Inférieur', start: -252.17, end: -247.2, fill: '#BF5A00', text: '#6B3000' },
  { name: 'Trias Moyen', start: -247.2, end: -237, fill: '#A04000', text: '#5D2500' },
  { name: 'Trias Supérieur', start: -237, end: -201.3, fill: '#883800', text: '#3D1D00' },
  { name: 'Jurassique Inférieur', start: -201.3, end: -174.1, fill: '#43A047', text: '#235928' },
  { name: 'Jurassique Moyen', start: -174.1, end: -163.5, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Jurassique Supérieur', start: -163.5, end: -145, fill: '#256427', text: '#133213' },
  { name: 'Crétacé Inférieur', start: -145, end: -100.5, fill: '#388E3C', text: '#1B5225' },
  { name: 'Crétacé Supérieur', start: -100.5, end: -66, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Paléocène', start: -66, end: -56, fill: '#8B6914', text: '#5a4008' },
  { name: 'Éocène', start: -56, end: -33.9, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Oligocène', start: -33.9, end: -23.03, fill: '#8B6914', text: '#5a4008' },
  { name: 'Miocène', start: -23.03, end: -5.333, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Pliocène', start: -5.333, end: -2.58, fill: '#8B6914', text: '#5a4008' },
  { name: 'Pléistocène', start: -2.58, end: -0.0117, fill: '#7B8B00', text: '#485200' },
  { name: 'Holocène', start: -0.0117, end: TIMELINE_MAX, fill: '#6B7A00', text: '#3D4600' },
];

// ── Étages ────────────────────────────────────────────────────────
const STAGES = [
  // Cambrien - Terreneuvien
  { name: 'Fortunien', start: -541, end: -529, fill: '#00796B', text: '#003D33' },
  { name: 'Étage 2', start: -529, end: -521, fill: '#00897B', text: '#00463D' },
  // Cambrien - Série 2
  { name: 'Étage 3', start: -521, end: -514, fill: '#0097A7', text: '#005662' },
  { name: 'Étage 4', start: -514, end: -509, fill: '#00ACC1', text: '#006070' },
  // Cambrien - Miaolingien
  { name: 'Wuliuen', start: -509, end: -504.5, fill: '#00695C', text: '#003329' },
  { name: 'Drumien', start: -504.5, end: -500.5, fill: '#00897B', text: '#00463D' },
  { name: 'Guzhangien', start: -500.5, end: -497, fill: '#00796B', text: '#003D33' },
  // Cambrien - Furongien
  { name: 'Paibien', start: -497, end: -494, fill: '#00695C', text: '#003329' },
  { name: 'Jiangshanien', start: -494, end: -489.5, fill: '#00897B', text: '#00463D' },
  { name: 'Étage 10', start: -489.5, end: -485.4, fill: '#00796B', text: '#003D33' },
  // Ordovicien
  { name: 'Trémadocien', start: -485.4, end: -477.7, fill: '#006978', text: '#003D47' },
  { name: 'Floien', start: -477.7, end: -470, fill: '#00838F', text: '#004D57' },
  { name: 'Dapingien', start: -470, end: -467.3, fill: '#0097A7', text: '#005662' },
  { name: 'Darriwilien', start: -467.3, end: -458.4, fill: '#00ACC1', text: '#006070' },
  { name: 'Sandbien', start: -458.4, end: -453, fill: '#0097A7', text: '#005662' },
  { name: 'Katien', start: -453, end: -445.2, fill: '#00838F', text: '#004D57' },
  { name: 'Hirnantien', start: -445.2, end: -443.8, fill: '#006978', text: '#003D47' },
  // Silurien
  { name: 'Rhuddanien', start: -443.8, end: -440.8, fill: '#388E3C', text: '#1B5225' },
  { name: 'Aéronien', start: -440.8, end: -438.5, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Télychien', start: -438.5, end: -433.4, fill: '#388E3C', text: '#1B5225' },
  { name: 'Sheinwoodien', start: -433.4, end: -430.5, fill: '#43A047', text: '#235928' },
  { name: 'Homérien', start: -430.5, end: -427.4, fill: '#388E3C', text: '#1B5225' },
  { name: 'Gorstien', start: -427.4, end: -425.6, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Ludfordien', start: -425.6, end: -423, fill: '#388E3C', text: '#1B5225' },
  { name: 'Pridolien', start: -423, end: -419.2, fill: '#43A047', text: '#235928' },
  // Dévonien
  { name: 'Lochkovien', start: -419.2, end: -410.8, fill: '#E65100', text: '#7A2B00' },
  { name: 'Praguien', start: -410.8, end: -407.6, fill: '#D4701A', text: '#7A3D00' },
  { name: 'Emsien', start: -407.6, end: -393.3, fill: '#BF6000', text: '#7A3D00' },
  { name: 'Eifélien', start: -393.3, end: -387.7, fill: '#C66200', text: '#7A3D00' },
  { name: 'Givétien', start: -387.7, end: -382.7, fill: '#BF6000', text: '#7A3D00' },
  { name: 'Frasnien', start: -382.7, end: -372.2, fill: '#A85400', text: '#5D2F00' },
  { name: 'Famennien', start: -372.2, end: -358.9, fill: '#8D4600', text: '#4A2400' },
  // Carbonifère
  { name: 'Tournaisien', start: -358.9, end: -346.7, fill: '#388E3C', text: '#1B5225' },
  { name: 'Viséen', start: -346.7, end: -330.9, fill: '#43A047', text: '#235928' },
  { name: 'Serpukhovien', start: -330.9, end: -323.2, fill: '#388E3C', text: '#1B5225' },
  { name: 'Bachkirien', start: -323.2, end: -315.2, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Moscovien', start: -315.2, end: -307, fill: '#388E3C', text: '#1B5225' },
  { name: 'Kasimovien', start: -307, end: -303.7, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Gzhélien', start: -303.7, end: -298.9, fill: '#256427', text: '#133213' },
  // Permien
  { name: 'Assélien', start: -298.9, end: -295.5, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Sakmarien', start: -295.5, end: -290.1, fill: '#C62828', text: '#7B1010' },
  { name: 'Artinskien', start: -290.1, end: -283.5, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Kungurien', start: -283.5, end: -272.3, fill: '#B71C1C', text: '#7B1010' },
  { name: 'Roadien', start: -272.3, end: -268.8, fill: '#C62828', text: '#7B1010' },
  { name: 'Wordien', start: -268.8, end: -265.1, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Capitanien', start: -265.1, end: -259.8, fill: '#B71C1C', text: '#7B1010' },
  { name: 'Wuchiapingien', start: -259.8, end: -254.14, fill: '#C62828', text: '#7B1010' },
  { name: 'Changhsingien', start: -254.14, end: -252.17, fill: '#B71C1C', text: '#7B1010' },
  // Trias
  { name: 'Induen', start: -252.17, end: -251.2, fill: '#BF5A00', text: '#6B3000' },
  { name: 'Olénékien', start: -251.2, end: -247.2, fill: '#B05000', text: '#5D2B00' },
  { name: 'Anisien', start: -247.2, end: -242, fill: '#A04000', text: '#5D2500' },
  { name: 'Ladinien', start: -242, end: -237, fill: '#944500', text: '#4A2200' },
  { name: 'Carnien', start: -237, end: -227, fill: '#883800', text: '#3D1D00' },
  { name: 'Norien', start: -227, end: -208.5, fill: '#7A3200', text: '#3D1900' },
  { name: 'Rhétien', start: -208.5, end: -201.3, fill: '#6B2C00', text: '#321500' },
  // Jurassique
  { name: 'Hettangien', start: -201.3, end: -199.3, fill: '#43A047', text: '#235928' },
  { name: 'Sinémurien', start: -199.3, end: -190.8, fill: '#388E3C', text: '#1B5225' },
  { name: 'Pliensbachien', start: -190.8, end: -182.7, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Toarcien', start: -182.7, end: -174.1, fill: '#388E3C', text: '#1B5225' },
  { name: 'Aalénien', start: -174.1, end: -170.3, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Bajocien', start: -170.3, end: -168.3, fill: '#388E3C', text: '#1B5225' },
  { name: 'Bathonien', start: -168.3, end: -166.1, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Callovien', start: -166.1, end: -163.5, fill: '#256427', text: '#1B5E20' },
  { name: 'Oxfordien', start: -163.5, end: -157.3, fill: '#1E5421', text: '#0D3311' },
  { name: 'Kimméridgien', start: -157.3, end: -152.1, fill: '#256427', text: '#133213' },
  { name: 'Tithonien', start: -152.1, end: -145, fill: '#2E7D32', text: '#1B5E20' },
  // Crétacé
  { name: 'Berriasien', start: -145, end: -139.8, fill: '#2E7D32', text: '#1B5225' },
  { name: 'Valanginien', start: -139.8, end: -132.9, fill: '#388E3C', text: '#1B5225' },
  { name: 'Hauterivien', start: -132.9, end: -129.4, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Barrémien', start: -129.4, end: -125, fill: '#388E3C', text: '#1B5225' },
  { name: 'Aptien', start: -125, end: -113, fill: '#43A047', text: '#235928' },
  { name: 'Albien', start: -113, end: -100.5, fill: '#388E3C', text: '#1B5225' },
  { name: 'Cénomanien', start: -100.5, end: -93.9, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Turonien', start: -93.9, end: -89.8, fill: '#256427', text: '#133213' },
  { name: 'Coniacien', start: -89.8, end: -86.3, fill: '#1E5421', text: '#0D3311' },
  { name: 'Santonien', start: -86.3, end: -83.6, fill: '#256427', text: '#133213' },
  { name: 'Campanien', start: -83.6, end: -72.1, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Maastrichtien', start: -72.1, end: -66, fill: '#388E3C', text: '#1B5225' },
  // Paléogène
  { name: 'Danien', start: -66, end: -61.6, fill: '#8B6914', text: '#5a4008' },
  { name: 'Sélandien', start: -61.6, end: -59.2, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Thanétien', start: -59.2, end: -56, fill: '#8B6914', text: '#5a4008' },
  { name: 'Yprésien', start: -56, end: -47.8, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Lutétien', start: -47.8, end: -41.2, fill: '#8B6914', text: '#5a4008' },
  { name: 'Bartonien', start: -41.2, end: -37.8, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Priabonien', start: -37.8, end: -33.9, fill: '#8B6914', text: '#5a4008' },
  { name: 'Rupélien', start: -33.9, end: -27.82, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Chattien', start: -27.82, end: -23.03, fill: '#8B6914', text: '#5a4008' },
  // Néogène
  { name: 'Aquitanien', start: -23.03, end: -20.44, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Burdigalien', start: -20.44, end: -15.97, fill: '#8B6914', text: '#5a4008' },
  { name: 'Langhien', start: -15.97, end: -13.82, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Serravalien', start: -13.82, end: -11.63, fill: '#8B6914', text: '#5a4008' },
  { name: 'Tortonien', start: -11.63, end: -7.246, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Messinien', start: -7.246, end: -5.333, fill: '#8B6914', text: '#5a4008' },
  { name: 'Zancléen', start: -5.333, end: -3.6, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Plaisancien', start: -3.6, end: -2.58, fill: '#8B6914', text: '#5a4008' },
  // Quaternaire
  { name: 'Gélasien', start: -2.58, end: -1.8, fill: '#7B8B00', text: '#485200' },
  { name: 'Calabrien', start: -1.8, end: -0.774, fill: '#6B7A00', text: '#3D4600' },
  { name: 'Pléistocène moyen', start: -0.774, end: -0.129, fill: '#7B8B00', text: '#485200' },
  { name: 'Pléistocène supérieur', start: -0.129, end: -0.0117, fill: '#6B7A00', text: '#3D4600' },
  // Holocène — étages très courts, affichés avec tooltip au survol
  { name: 'Greenlandien', start: -0.0117, end: -0.0082, fill: '#5A6A00', text: '#2D3500', tinyLabel: 'Grnl.' },
  { name: 'Northgrippien', start: -0.0082, end: -0.0042, fill: '#4A5A00', text: '#2D3500', tinyLabel: 'Nrth.' },
  { name: 'Méghalayen', start: -0.0042, end: TIMELINE_MAX, fill: '#3A4A00', text: '#1A2500', tinyLabel: 'Mégh.' },
];

const TICK_INTERVALS = [0.0001, 0.001, 0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10, 25, 50, 100, 250, 500];

// ── Formatage ─────────────────────────────────────────────────────
function isUnknown(val) {
  if (val == null) return true;
  if (typeof val === 'string' && val.toLowerCase().includes('inconnu')) return true;
  return false;
}

function isPositiveYear(val) {
  // val > 0 = année calendaire positive (ex : 1662 AD)
  return typeof val === 'number' && val > 0;
}

function formatMa(ma) {
  if (ma === 0 || ma == null) return 'Auj.';
  const abs = Math.abs(ma);
  if (abs < 0.0001) return 'Auj.';
  if (abs < 0.001) return `${Math.round(abs * 1000000)} ans`;
  if (abs < 0.1) return `${Math.round(abs * 1000)} ka`;
  if (abs < 1) return `${(abs * 1000).toFixed(0)} ka`;
  return `${Number.isInteger(abs) ? abs : abs.toFixed(1)} Ma`;
}

function formatMaFull(ma) {
  if (isUnknown(ma)) return 'Inconnue';
  if (isPositiveYear(ma)) {
    // Année calendaire positive : on l'affiche telle quelle
    return `En ${Math.round(ma)} AP. J.-C.`;
  }
  if (ma === 0) return "Aujourd'hui";
  const abs = Math.abs(ma);
  if (abs < 0.001) return `${Math.round(abs * 1000000)} ans`;
  if (abs < 1) return `${Math.round(abs * 1000)} 000 ans`;
  return `${abs % 1 === 0 ? abs : abs.toFixed(1)} Ma`;
}

// Conversion d'une valeur d'extinction positive (année AD) en Ma
// ex : 1662 AD → environ 0 (dans les derniers milliers d'années)
function toMa(val) {
  if (isUnknown(val)) return null;
  if (isPositiveYear(val)) {
    // Année AD : convertir en Ma relatif (négatif = passé, ≈0 pour temps historique)
    // 2024 AD ≈ 0.000002 Ma avant aujourd'hui ≈ 0 sur l'échelle géologique
    const yearsAgo = 2024 - val;
    return -(yearsAgo / 1_000_000);
  }
  return typeof val === 'number' ? val : null;
}

function computeInitialView(apparition, extinction) {
  const aMa = toMa(apparition);
  const eMa = toMa(extinction);
  const a = aMa ?? eMa ?? -300;
  const e = eMa ?? 0;
  const mid = (a + e) / 2;
  const dur = Math.abs(a - e);
  const margin = Math.max(dur * 3, 40);
  const start = Math.max(TIMELINE_MIN, mid - margin);
  const end = Math.min(TIMELINE_MAX, mid + margin * 0.6);
  return { start, end };
}

// ── Composant ─────────────────────────────────────────────────────
const GeoInfo = ({ geologie, animalNom }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const dragRef = useRef({ active: false, lastX: 0 });
  // tooltip pour les étages trop petits
  const [tooltip, setTooltip] = useState(null); // { x, y, name }

  const apparitionRaw = geologie?.apparition ?? null;
  const extinctionRaw = geologie?.extinction ?? null;

  const apparition = toMa(apparitionRaw); // null si inconnu
  const extinction = toMa(extinctionRaw);

  const [view, setView] = useState(() => computeInitialView(apparitionRaw, extinctionRaw));

  useEffect(() => {
    setView(computeInitialView(apparitionRaw, extinctionRaw));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [String(apparitionRaw), String(extinctionRaw)]);

  // ── DESSIN ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const W = wrapper.offsetWidth || 600;
    const H = 220;
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
    const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    function drawBands(list, yStart, rowH, minWidthForText, fontSize) {
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
        } else if (bw >= 3 && item.tinyLabel) {
          // Étage trop court pour son nom complet mais assez large pour un repère visuel
          // → on dessine juste la barre colorée (déjà fait) — le tooltip gérera le nom
          // Petit marqueur centré
          const cx = (rx1 + rx2) / 2;
          ctx.fillStyle = item.fill + 'AA';
          ctx.fillRect(cx - 1, yStart + 2, 2, rowH - 6);
        }
      });
    }

    // Couche 1 : Ères (0 → 40)
    const ERA_Y = 0,
      ERA_H = 40;
    drawBands(ERAS, ERA_Y, ERA_H, 28, 12);

    // Couche 2 : Périodes (40 → 72)
    const PER_Y = ERA_Y + ERA_H,
      PER_H = 32;
    drawBands(PERIODS, PER_Y, PER_H, 20, 11);

    // Couche 3 : Époques (72 → 98)
    const EPO_Y = PER_Y + PER_H,
      EPO_H = 26;
    drawBands(EPOCHS, EPO_Y, EPO_H, 14, 10);

    // Couche 4 : Étages (98 → 120)
    const STA_Y = EPO_Y + EPO_H,
      STA_H = 22;
    drawBands(STAGES, STA_Y, STA_H, 12, 9);

    // Axe (120)
    const AXIS_Y = STA_Y + STA_H;
    ctx.strokeStyle = 'rgba(30,30,30,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, AXIS_Y);
    ctx.lineTo(W, AXIS_Y);
    ctx.stroke();

    // Ticks + labels
    const TICK_Y = AXIS_Y + 14;
    const tickInterval = TICK_INTERVALS.find((t) => span / t <= 9) || 500;
    const startTick = Math.ceil(vs / tickInterval) * tickInterval;
    for (let ma = startTick; ma <= ve; ma += tickInterval) {
      const x = maToX(ma);
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
      ctx.fillText(formatMa(ma), x, TICK_Y);
    }

    // Marqueur Aujourd'hui
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
      ctx.fillText('Auj.', nowX, H - 3);
    }

    // Barre de vie de l'animal
    const BAR_Y = AXIS_Y + 18,
      BAR_H = 26;
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

        if (barW > 40) {
          const fs = Math.max(11, Math.min(13, barW / 10));
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `700 ${fs}px ${FONT}`;
          ctx.textAlign = 'center';
          ctx.save();
          ctx.beginPath();
          ctx.rect(rbx1 + 4, BAR_Y, barW - 8, BAR_H);
          ctx.clip();
          ctx.fillText(animalNom || '', rbx1 + barW / 2, BAR_Y + BAR_H / 2 + 4);
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

        const midBarX = rbx1 + barW / 2;
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
  }, [view, apparition, extinction, animalNom]);

  // ── Tooltip au survol des étages ────────────────────────────────
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
      const span = ve - vs;
      const xToMa = (px) => vs + (px / W) * span;

      // Zone des étages : y 98 → 120 (canvas height 220, étages de STA_Y=98 à 120)
      const STA_Y = 98,
        STA_H = 22;
      if (my >= STA_Y && my <= STA_Y + STA_H) {
        const ma = xToMa(mx);
        const hit = STAGES.find((s) => ma >= s.start && ma < s.end);
        if (hit) {
          setTooltip({ x: e.clientX - rect.left, y: STA_Y - 4, name: hit.name });
          return;
        }
      }
      setTooltip(null);
    },
    [view],
  );

  const handleMouseLeaveCanvas = useCallback(() => setTooltip(null), []);

  // ── Interactions ─────────────────────────────────────────────────
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
      return clampView({ start: pivotMa - pivotRatio * newSpan, end: pivotMa + (1 - pivotRatio) * newSpan });
    });
  }

  function centerOnAnimal() {
    setView(computeInitialView(apparitionRaw, extinctionRaw));
  }

  const onMouseDown = (e) => {
    dragRef.current = { active: true, lastX: e.clientX };
  };
  const onMouseMove = (e) => {
    if (dragRef.current.active) {
      pan(e.clientX - dragRef.current.lastX);
      dragRef.current.lastX = e.clientX;
    }
    handleMouseMoveCanvas(e);
  };
  const onMouseUp = () => {
    dragRef.current.active = false;
  };
  const onTouchStart = (e) => {
    dragRef.current = { active: true, lastX: e.touches[0].clientX };
  };
  const onTouchMove = (e) => {
    if (!dragRef.current.active) return;
    pan(e.touches[0].clientX - dragRef.current.lastX);
    dragRef.current.lastX = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    dragRef.current.active = false;
  };

  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      const rect = wrapperRef.current.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      zoom(e.deltaY > 0 ? 1.18 : 0.85, ratio);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // ── JSX ────────────────────────────────────────────────────────
  const span = view.end - view.start;
  const spanLabel = formatMa(Math.abs(span));

  const TOTAL = Math.abs(TIMELINE_MIN - TIMELINE_MAX);
  const thumbLeft = Math.max(0, Math.min(96, ((view.start - TIMELINE_MIN) / TOTAL) * 100));
  const thumbWidth = Math.max(2, Math.min(100 - thumbLeft, (span / TOTAL) * 100));

  const geoRows = [
    { label: 'Ère', value: geologie?.ere },
    { label: 'Période', value: geologie?.periode },
    { label: 'Époque', value: geologie?.epoque },
    { label: 'Étage', value: geologie?.stage },
  ].filter((r) => r.value);

  const hasData = apparitionRaw != null || extinctionRaw != null || geoRows.length > 0;

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

  // Textes pour la carte info
  const appText = isUnknown(apparitionRaw) ? 'Inconnue' : formatMaFull(apparitionRaw);
  const extText = isUnknown(extinctionRaw) ? 'Inconnue' : formatMaFull(extinctionRaw);

  return (
    <section className="animal-geologie geo-timeline-mode">
      {/* En-tête */}
      <div className="geo-tl-header">
        <h3>Géologie</h3>
        <div className="geo-tl-badges">
          {geologie?.ere && <span className="geo-badge geo-badge--era">{geologie.ere}</span>}
          {geologie?.periode && <span className="geo-badge geo-badge--period">{geologie.periode}</span>}
          {geologie?.epoque && <span className="geo-badge geo-badge--epoch">{geologie.epoque}</span>}
          {geologie?.stage && <span className="geo-badge geo-badge--stage">{geologie.stage}</span>}
        </div>
      </div>

      {/* Légende */}
      <div className="geo-tl-legend">
        <span className="geo-legend-item geo-legend--era">Ère</span>
        <span className="geo-legend-item geo-legend--period">Période</span>
        <span className="geo-legend-item geo-legend--epoch">Époque</span>
        <span className="geo-legend-item geo-legend--stage">Étage</span>
        <span className="geo-legend-item geo-legend--bar">Existence</span>
      </div>

      {/* Canvas */}
      <div
        ref={wrapperRef}
        className="geo-tl-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => {
          onMouseUp();
          handleMouseLeaveCanvas();
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <canvas ref={canvasRef} />

        <div className="geo-tl-hint">← Glisser · Molette pour zoomer →</div>
      </div>

      {/* Minimap */}
      <div className="geo-tl-minimap">
        <span className="geo-tl-minimap-label">−591 Ma</span>
        <div className="geo-tl-minimap-bar">
          <div className="geo-tl-minimap-thumb" style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%` }} />
        </div>
        <span className="geo-tl-minimap-label">+1000 ans</span>
      </div>

      {/* Contrôles */}
      <div className="geo-tl-controls">
        <button
          className="geo-tl-btn"
          onClick={() => pan(-(wrapperRef.current?.offsetWidth || 300) * 0.4)}
          aria-label="Vers le passé"
        >
          ← Ancien
        </button>
        <div className="geo-tl-zoom">
          <button className="geo-tl-zoom-btn" onClick={() => zoom(1.5)} aria-label="Dézoomer">
            −
          </button>
          <button className="geo-tl-center-btn" onClick={centerOnAnimal} title="Recentrer sur l'animal">
            {spanLabel}
          </button>
          <button className="geo-tl-zoom-btn" onClick={() => zoom(0.55)} aria-label="Zoomer">
            +
          </button>
        </div>
        <button
          className="geo-tl-btn"
          onClick={() => pan((wrapperRef.current?.offsetWidth || 300) * 0.4)}
          aria-label="Vers le présent"
        >
          Récent →
        </button>
      </div>

      {/* Carte info */}
      <div className="geo-tl-card">
        <div className="geo-tl-card-dot" />
        <div className="geo-tl-card-body">
          <strong className="geo-tl-card-name">{animalNom}</strong>
          {geoRows.length > 0 && (
            <div className="geo-tl-card-rows">
              {geoRows.map((r) => (
                <div key={r.label} className="geo-tl-card-row">
                  <span className="geo-tl-card-row-label">{r.label}</span>
                  <span className="geo-tl-card-row-value">{r.value}</span>
                </div>
              ))}
            </div>
          )}
          {(apparitionRaw != null || extinctionRaw != null) && (
            <p className="geo-tl-card-range">
              {apparitionRaw != null && (
                <span>
                  <span className="geo-tl-card-range-label">Apparition : </span>
                  {appText}
                </span>
              )}
              {apparitionRaw != null && extinctionRaw != null && <span className="geo-tl-card-sep"> → </span>}
              {extinctionRaw != null && (
                <span>
                  <span className="geo-tl-card-range-label">Extinction : </span>
                  {extText}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

GeoInfo.propTypes = {
  geologie: PropTypes.object,
  animalNom: PropTypes.string,
};

export default GeoInfo;

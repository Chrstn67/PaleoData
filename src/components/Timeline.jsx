'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Timeline.css';
import timelineData from '../data/timelineData';
import animalsData from '../data/data';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_MIN = -541;
const TIMELINE_MAX = 0.5;

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES GÉOLOGIQUES
// ─────────────────────────────────────────────────────────────────────────────
const ERAS = [
  { name: 'Paléozoïque', start: -541, end: -252.17, fill: '#1A6B6B', text: '#0D4040' },
  { name: 'Mésozoïque', start: -252.17, end: -66, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Cénozoïque', start: -66, end: TIMELINE_MAX, fill: '#8B6914', text: '#5a4008' },
];

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

const EPOCHS = [
  { name: 'Terreneuvien', start: -541, end: -521, fill: '#00796B', text: '#003D33', dataKey: 'Terreneuvien' },
  { name: 'Série 2', start: -521, end: -509, fill: '#00897B', text: '#00463D', dataKey: 'Série 2' },
  { name: 'Miaolingien', start: -509, end: -497, fill: '#00695C', text: '#003329', dataKey: 'Miaolingien' },
  { name: 'Furongien', start: -497, end: -485.4, fill: '#00695C', text: '#003329', dataKey: 'Furongien' },
  {
    name: 'Ordovicien Inférieur',
    start: -485.4,
    end: -470,
    fill: '#006978',
    text: '#003D47',
    dataKey: 'Inférieur',
    periodContext: 'Ordovicien',
  },
  {
    name: 'Ordovicien Moyen',
    start: -470,
    end: -458.4,
    fill: '#00838F',
    text: '#004D57',
    dataKey: 'Moyen',
    periodContext: 'Ordovicien',
  },
  {
    name: 'Ordovicien Supérieur',
    start: -458.4,
    end: -443.8,
    fill: '#0097A7',
    text: '#005662',
    dataKey: 'Supérieur',
    periodContext: 'Ordovicien',
  },
  { name: 'Llandovery', start: -443.8, end: -433.4, fill: '#388E3C', text: '#1B5225', dataKey: 'Llandovery' },
  { name: 'Wenlock', start: -433.4, end: -427.4, fill: '#2E7D32', text: '#1B5E20', dataKey: 'Wenlock' },
  { name: 'Ludlow', start: -427.4, end: -423, fill: '#388E3C', text: '#1B5225', dataKey: 'Ludlow' },
  { name: 'Pridoli', start: -423, end: -419.2, fill: '#43A047', text: '#235928', dataKey: 'Pridoli' },
  {
    name: 'Dévonien Inférieur',
    start: -419.2,
    end: -393.3,
    fill: '#E65100',
    text: '#7A2B00',
    dataKey: 'Inférieur',
    periodContext: 'Dévonien',
  },
  {
    name: 'Dévonien Moyen',
    start: -393.3,
    end: -382.7,
    fill: '#BF6000',
    text: '#7A3D00',
    dataKey: 'Moyen',
    periodContext: 'Dévonien',
  },
  {
    name: 'Dévonien Supérieur',
    start: -382.7,
    end: -358.9,
    fill: '#A85400',
    text: '#5D2F00',
    dataKey: 'Supérieur',
    periodContext: 'Dévonien',
  },
  { name: 'Mississippien', start: -358.9, end: -323.2, fill: '#388E3C', text: '#1B5225', dataKey: 'Mississippien' },
  { name: 'Pennsylvanien', start: -323.2, end: -298.9, fill: '#2E7D32', text: '#1B5E20', dataKey: 'Pennsylvanien' },
  { name: 'Cisuralien', start: -298.9, end: -272.3, fill: '#D32F2F', text: '#7B1010', dataKey: 'Cisuralien' },
  { name: 'Guadalupien', start: -272.3, end: -259.8, fill: '#C62828', text: '#7B1010', dataKey: 'Guadalupien' },
  { name: 'Lopingien', start: -259.8, end: -252.17, fill: '#B71C1C', text: '#7B1010', dataKey: 'Lopingien' },
  {
    name: 'Trias Inférieur',
    start: -252.17,
    end: -247.2,
    fill: '#BF5A00',
    text: '#6B3000',
    dataKey: 'Inférieur',
    periodContext: 'Trias',
  },
  {
    name: 'Trias Moyen',
    start: -247.2,
    end: -237,
    fill: '#A04000',
    text: '#5D2500',
    dataKey: 'Moyen',
    periodContext: 'Trias',
  },
  {
    name: 'Trias Supérieur',
    start: -237,
    end: -201.3,
    fill: '#883800',
    text: '#3D1D00',
    dataKey: 'Supérieur',
    periodContext: 'Trias',
  },
  {
    name: 'Jurassique Inférieur',
    start: -201.3,
    end: -174.1,
    fill: '#43A047',
    text: '#235928',
    dataKey: 'Inférieur',
    periodContext: 'Jurassique',
  },
  {
    name: 'Jurassique Moyen',
    start: -174.1,
    end: -163.5,
    fill: '#2E7D32',
    text: '#1B5E20',
    dataKey: 'Moyen',
    periodContext: 'Jurassique',
  },
  {
    name: 'Jurassique Supérieur',
    start: -163.5,
    end: -145,
    fill: '#256427',
    text: '#133213',
    dataKey: 'Supérieur',
    periodContext: 'Jurassique',
  },
  {
    name: 'Crétacé Inférieur',
    start: -145,
    end: -100.5,
    fill: '#388E3C',
    text: '#1B5225',
    dataKey: 'Inférieur',
    periodContext: 'Crétacé',
  },
  {
    name: 'Crétacé Supérieur',
    start: -100.5,
    end: -66,
    fill: '#2E7D32',
    text: '#1B5E20',
    dataKey: 'Supérieur',
    periodContext: 'Crétacé',
  },
  { name: 'Paléocène', start: -66, end: -56, fill: '#8B6914', text: '#5a4008', dataKey: 'Paléocène' },
  { name: 'Éocène', start: -56, end: -33.9, fill: '#9E7B00', text: '#5a4600', dataKey: 'Éocène' },
  { name: 'Oligocène', start: -33.9, end: -23.03, fill: '#8B6914', text: '#5a4008', dataKey: 'Oligocène' },
  { name: 'Miocène', start: -23.03, end: -5.333, fill: '#9E7B00', text: '#5a4600', dataKey: 'Miocène' },
  { name: 'Pliocène', start: -5.333, end: -2.58, fill: '#8B6914', text: '#5a4008', dataKey: 'Pliocène' },
  { name: 'Pléistocène', start: -2.58, end: -0.0117, fill: '#7B8B00', text: '#485200', dataKey: 'Pléistocène' },
  { name: 'Holocène', start: -0.0117, end: TIMELINE_MAX, fill: '#6B7A00', text: '#3D4600', dataKey: 'Holocène' },
];

const STAGES = [
  { name: 'Fortunien', start: -541, end: -529, fill: '#00796B', text: '#003D33' },
  { name: 'Étage 2', start: -529, end: -521, fill: '#00897B', text: '#00463D' },
  { name: 'Étage 3', start: -521, end: -514, fill: '#0097A7', text: '#005662' },
  { name: 'Étage 4', start: -514, end: -509, fill: '#00ACC1', text: '#006070' },
  { name: 'Wuliuen', start: -509, end: -504.5, fill: '#00695C', text: '#003329' },
  { name: 'Drumien', start: -504.5, end: -500.5, fill: '#00897B', text: '#00463D' },
  { name: 'Guzhangien', start: -500.5, end: -497, fill: '#00796B', text: '#003D33' },
  { name: 'Paibien', start: -497, end: -494, fill: '#00695C', text: '#003329' },
  { name: 'Jiangshanien', start: -494, end: -489.5, fill: '#00897B', text: '#00463D' },
  { name: 'Étage 10', start: -489.5, end: -485.4, fill: '#00796B', text: '#003D33' },
  { name: 'Trémadocien', start: -485.4, end: -477.7, fill: '#006978', text: '#003D47' },
  { name: 'Floien', start: -477.7, end: -470, fill: '#00838F', text: '#004D57' },
  { name: 'Dapingien', start: -470, end: -467.3, fill: '#0097A7', text: '#005662' },
  { name: 'Darriwilien', start: -467.3, end: -458.4, fill: '#00ACC1', text: '#006070' },
  { name: 'Sandbien', start: -458.4, end: -453, fill: '#0097A7', text: '#005662' },
  { name: 'Katien', start: -453, end: -445.2, fill: '#00838F', text: '#004D57' },
  { name: 'Hirnantien', start: -445.2, end: -443.8, fill: '#006978', text: '#003D47' },
  { name: 'Rhuddanien', start: -443.8, end: -440.8, fill: '#388E3C', text: '#1B5225' },
  { name: 'Aéronien', start: -440.8, end: -438.5, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Télychien', start: -438.5, end: -433.4, fill: '#388E3C', text: '#1B5225' },
  { name: 'Sheinwoodien', start: -433.4, end: -430.5, fill: '#43A047', text: '#235928' },
  { name: 'Homérien', start: -430.5, end: -427.4, fill: '#388E3C', text: '#1B5225' },
  { name: 'Gorstien', start: -427.4, end: -425.6, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Ludfordien', start: -425.6, end: -423, fill: '#388E3C', text: '#1B5225' },
  { name: 'Pridolien', start: -423, end: -419.2, fill: '#43A047', text: '#235928' },
  { name: 'Lochkovien', start: -419.2, end: -410.8, fill: '#E65100', text: '#7A2B00' },
  { name: 'Praguien', start: -410.8, end: -407.6, fill: '#D4701A', text: '#7A3D00' },
  { name: 'Emsien', start: -407.6, end: -393.3, fill: '#BF6000', text: '#7A3D00' },
  { name: 'Eifélien', start: -393.3, end: -387.7, fill: '#C66200', text: '#7A3D00' },
  { name: 'Givétien', start: -387.7, end: -382.7, fill: '#BF6000', text: '#7A3D00' },
  { name: 'Frasnien', start: -382.7, end: -372.2, fill: '#A85400', text: '#5D2F00' },
  { name: 'Famennien', start: -372.2, end: -358.9, fill: '#8D4600', text: '#4A2400' },
  { name: 'Tournaisien', start: -358.9, end: -346.7, fill: '#388E3C', text: '#1B5225' },
  { name: 'Viséen', start: -346.7, end: -330.9, fill: '#43A047', text: '#235928' },
  { name: 'Serpukhovien', start: -330.9, end: -323.2, fill: '#388E3C', text: '#1B5225' },
  { name: 'Bachkirien', start: -323.2, end: -315.2, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Moscovien', start: -315.2, end: -307, fill: '#388E3C', text: '#1B5225' },
  { name: 'Kasimovien', start: -307, end: -303.7, fill: '#2E7D32', text: '#1B5E20' },
  { name: 'Gzhélien', start: -303.7, end: -298.9, fill: '#256427', text: '#133213' },
  { name: 'Assélien', start: -298.9, end: -295.5, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Sakmarien', start: -295.5, end: -290.1, fill: '#C62828', text: '#7B1010' },
  { name: 'Artinskien', start: -290.1, end: -283.5, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Kungurien', start: -283.5, end: -272.3, fill: '#B71C1C', text: '#7B1010' },
  { name: 'Roadien', start: -272.3, end: -268.8, fill: '#C62828', text: '#7B1010' },
  { name: 'Wordien', start: -268.8, end: -265.1, fill: '#D32F2F', text: '#7B1010' },
  { name: 'Capitanien', start: -265.1, end: -259.8, fill: '#B71C1C', text: '#7B1010' },
  { name: 'Wuchiapingien', start: -259.8, end: -254.14, fill: '#C62828', text: '#7B1010' },
  { name: 'Changhsingien', start: -254.14, end: -252.17, fill: '#B71C1C', text: '#7B1010' },
  { name: 'Induen', start: -252.17, end: -251.2, fill: '#BF5A00', text: '#6B3000' },
  { name: 'Olénékien', start: -251.2, end: -247.2, fill: '#B05000', text: '#5D2B00' },
  { name: 'Anisien', start: -247.2, end: -242, fill: '#A04000', text: '#5D2500' },
  { name: 'Ladinien', start: -242, end: -237, fill: '#944500', text: '#4A2200' },
  { name: 'Carnien', start: -237, end: -227, fill: '#883800', text: '#3D1D00' },
  { name: 'Norien', start: -227, end: -208.5, fill: '#7A3200', text: '#3D1900' },
  { name: 'Rhétien', start: -208.5, end: -201.3, fill: '#6B2C00', text: '#321500' },
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
  { name: 'Danien', start: -66, end: -61.6, fill: '#8B6914', text: '#5a4008' },
  { name: 'Sélandien', start: -61.6, end: -59.2, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Thanétien', start: -59.2, end: -56, fill: '#8B6914', text: '#5a4008' },
  { name: 'Yprésien', start: -56, end: -47.8, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Lutétien', start: -47.8, end: -41.2, fill: '#8B6914', text: '#5a4008' },
  { name: 'Bartonien', start: -41.2, end: -37.8, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Priabonien', start: -37.8, end: -33.9, fill: '#8B6914', text: '#5a4008' },
  { name: 'Rupélien', start: -33.9, end: -27.82, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Chattien', start: -27.82, end: -23.03, fill: '#8B6914', text: '#5a4008' },
  { name: 'Aquitanien', start: -23.03, end: -20.44, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Burdigalien', start: -20.44, end: -15.97, fill: '#8B6914', text: '#5a4008' },
  { name: 'Langhien', start: -15.97, end: -13.82, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Serravalien', start: -13.82, end: -11.63, fill: '#8B6914', text: '#5a4008' },
  { name: 'Tortonien', start: -11.63, end: -7.246, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Messinien', start: -7.246, end: -5.333, fill: '#8B6914', text: '#5a4008' },
  { name: 'Zancléen', start: -5.333, end: -3.6, fill: '#9E7B00', text: '#5a4600' },
  { name: 'Plaisancien', start: -3.6, end: -2.58, fill: '#8B6914', text: '#5a4008' },
  { name: 'Gélasien', start: -2.58, end: -1.8, fill: '#7B8B00', text: '#485200' },
  { name: 'Calabrien', start: -1.8, end: -0.774, fill: '#6B7A00', text: '#3D4600' },
  { name: 'Pléistocène moyen', start: -0.774, end: -0.129, fill: '#7B8B00', text: '#485200' },
  { name: 'Pléistocène supérieur', start: -0.129, end: -0.0117, fill: '#6B7A00', text: '#3D4600' },
  { name: 'Greenlandien', start: -0.0117, end: -0.0082, fill: '#5A6A00', text: '#2D3500', tiny: true },
  { name: 'Northgrippien', start: -0.0082, end: -0.0042, fill: '#4A5A00', text: '#2D3500', tiny: true },
  { name: 'Méghalayen', start: -0.0042, end: TIMELINE_MAX, fill: '#3A4A00', text: '#1A2500', tiny: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// INFO MAPS (timelineData)
// ─────────────────────────────────────────────────────────────────────────────
const eraInfoMap = new Map();
const periodInfoMap = new Map();
const epochInfoMap = new Map();
const stageInfoMap = new Map();

timelineData.forEach((era) => {
  eraInfoMap.set(era.era, era.eraInfo);
  era.periods.forEach((period) => {
    periodInfoMap.set(period.name, period.periodInfo);
    if (period.epochs) {
      period.epochs.forEach((epoch) => {
        epochInfoMap.set(`${period.name}::${epoch.name}`, epoch.epochInfo);
        epochInfoMap.set(epoch.name, epoch.epochInfo);
        if (epoch.stage) {
          epoch.stage.forEach((stage) => {
            stageInfoMap.set(stage.name, stage.stageInfo);
          });
        }
      });
    }
  });
});

function getEpochInfo(epochObj) {
  if (epochObj.periodContext) {
    return epochInfoMap.get(`${epochObj.periodContext}::${epochObj.dataKey}`) || epochInfoMap.get(epochObj.name) || '';
  }
  return epochInfoMap.get(epochObj.name) || '';
}

EPOCHS.forEach((e) => {
  e._info = getEpochInfo(e);
});

// ─────────────────────────────────────────────────────────────────────────────
// ALL_ITEMS pour la recherche
// ─────────────────────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  ...ERAS.map((e) => ({ ...e, type: 'era', info: eraInfoMap.get(e.name) || '' })),
  ...PERIODS.map((p) => ({ ...p, type: 'period', info: periodInfoMap.get(p.name) || '' })),
  ...EPOCHS.map((e) => ({ ...e, type: 'epoch', info: e._info || '' })),
  ...STAGES.map((s) => ({ ...s, type: 'stage', info: stageInfoMap.get(s.name) || '' })),
];

// ─────────────────────────────────────────────────────────────────────────────
// TICK INTERVALS
// ─────────────────────────────────────────────────────────────────────────────
const TICK_INTERVALS = [0.0001, 0.001, 0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10, 25, 50, 100, 250, 500];

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────
function formatMa(ma) {
  if (ma >= 0) return 'Auj.';
  const abs = Math.abs(ma);
  if (abs < 0.0001) return 'Auj.';
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
  let margin = Math.max(span * 2.5, 30);

  if (span === 0) {
    margin = 10;
  }

  const mid = (item.start + item.end) / 2;
  return {
    start: Math.max(TIMELINE_MIN, mid - margin),
    end: Math.min(TIMELINE_MAX, mid + margin),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMALS : préparation + assignation de lanes
// ─────────────────────────────────────────────────────────────────────────────

function toMa(val) {
  if (val == null) return null;
  if (typeof val === 'number' && val > 0) {
    const yearsAgo = 2024 - val;
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

      const color = animalBarColor(start, end);
      return {
        idx,
        nom: a.nom || `Animal ${idx + 1}`,
        start,
        end,
        geo,
        color,
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

    ctx.fillStyle = item.fill + '66';
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
    const alpha = isHovered ? 'EE' : 'BB';
    const strokeAlpha = isHovered ? 'FF' : '88';

    ctx.fillStyle = animal.color + alpha;
    ctx.beginPath();
    ctx.roundRect(rx1, laneY, bw, ANIMAL_LANE_H, 4);
    ctx.fill();

    if (isHovered) {
      ctx.strokeStyle = animal.color + strokeAlpha;
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

  const ALL_SEARCHABLE = [...ALL_ITEMS, ...animalItems];

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
    const nums = (q.match(/\d+(\.\d+)?/g) || []).map(Number);
    const found = ALL_SEARCHABLE.filter((it) => {
      const n = it.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return (
        n.includes(sq) ||
        nums.some((num) => {
          const startAbs = Math.abs(it.start);
          const endAbs = Math.abs(it.end);
          return (startAbs <= num && endAbs >= num) || Math.abs(startAbs - num) < 0.5;
        })
      );
    });
    setSuggestions(found.slice(0, 10));
    setOpen(true);
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
  const hasZeroDuration = isAnimal && item.hasZeroDuration;
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
              {hasZeroDuration && <span className="badge badge--warning">Durée très courte</span>}
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
            { label: 'Durée', value: hasZeroDuration ? "< 1 million d'années" : durationStr(item.start, item.end) },
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

            {item.image_url && (
              <div className="tl-modal__image-container">
                <Link to={`/animal/${encodeURIComponent(item.nom)}`} className="tl-modal__image-link">
                  <img src={item.image_url} alt={item.nom} className="tl-modal__image" />
                  <div className="tl-modal__image-overlay">
                    <span className="tl-modal__view-button">Voir +</span>
                  </div>
                </Link>
              </div>
            )}

            {!item.image_url && (
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

  const [showAnimals, setShowAnimals] = useState(true);

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
    if (item.type === 'animal') {
      setView(computeInitialView(item));
      setSelected({ ...item });
    } else {
      setView(computeInitialView(item));
      setSelected({ ...item });
    }
  }

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

    ctx.strokeStyle = 'rgba(30,30,30,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, AXIS_Y);
    ctx.lineTo(W, AXIS_Y);
    ctx.stroke();

    const tickInterval = TICK_INTERVALS.find((t) => span / t <= 9) || 500;
    const startTick = Math.ceil(vs / tickInterval) * tickInterval;
    for (let ma = startTick; ma <= ve; ma += tickInterval) {
      const x = maToX(ma);
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
      ctx.fillText(formatMa(ma), x, AXIS_Y + 14);
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
      ctx.font = `700 11px ${FONT_CANVAS}`;
      ctx.textAlign = 'center';
      ctx.fillText('Auj.', nowX, AXIS_Y + 14);
    }

    if (showAnimals && laneCount > 0) {
      drawAnimals(ctx, lanedAnimals, W, maToX, ANIMALS_Y, laneCount, hoveredAnimalIdx);
    }
  }, [view, showAnimals, lanedAnimals, laneCount, hoveredAnimalIdx, CANVAS_H]);

  const getHitAnimal = useCallback(
    (mx, my, W) => {
      if (!showAnimals || laneCount === 0) return null;
      const span = view.end - view.start;
      const ma = view.start + (mx / W) * span;
      if (my < ANIMALS_Y || my > ANIMALS_Y + laneCount * (ANIMAL_LANE_H + ANIMAL_LANE_GAP) + 8) return null;
      const localY = my - ANIMALS_Y;
      const lane = Math.floor(localY / (ANIMAL_LANE_H + ANIMAL_LANE_GAP));
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
        return found ? { ...found, type: 'epoch', info: found._info || '' } : null;
      }
      if (my >= STA_Y && my < STA_Y + STA_H) {
        const found = STAGES.find((i) => ma >= i.start && ma < i.end);
        return found ? { ...found, type: 'stage', info: stageInfoMap.get(found.name) || '' } : null;
      }
      return null;
    },
    [view],
  );

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
    [pan, view, getHitAnimal],
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
        setSelected({
          ...hitAnimal,
          type: 'animal',
          name: hitAnimal.nom,
          info: '',
        });
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

  const TOTAL = Math.abs(TIMELINE_MAX - TIMELINE_MIN);
  const thumbLeft = Math.max(0, Math.min(96, ((view.start - TIMELINE_MIN) / TOTAL) * 100));
  const thumbWidth = Math.max(2, Math.min(100 - thumbLeft, ((view.end - view.start) / TOTAL) * 100));
  const spanLabel = formatMa(Math.abs(view.end - view.start));

  const NAV_SHORTCUTS = [
    { label: '−541 Ma', ma: TIMELINE_MIN },
    { label: '−252 Ma', ma: -252 },
    { label: '−66 Ma', ma: -66 },
    { label: "Aujourd'hui", ma: 0 },
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

      <div className="tl-legend">
        <span className="tl-legend__item">
          <span className="tl-legend__swatch tl-legend__swatch--era" />
          Ère
        </span>
        <span className="tl-legend__item">
          <span className="tl-legend__swatch tl-legend__swatch--period" />
          Période
        </span>
        <span className="tl-legend__item">
          <span className="tl-legend__swatch tl-legend__swatch--epoch" />
          Époque
        </span>
        <span className="tl-legend__item">
          <span className="tl-legend__swatch tl-legend__swatch--stage" />
          Étage
        </span>
        {showAnimals && (
          <span className="tl-legend__item">
            <span className="tl-legend__swatch tl-legend__swatch--animal" />
            Animaux
          </span>
        )}
      </div>

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
        <span className="tl-minimap__label">Auj.</span>
      </div>

      <div className="tl-controls">
        <button className="tl-controls__btn" onClick={() => pan(-(wrapperRef.current?.offsetWidth || 300) * 0.4)}>
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
        <button className="tl-controls__btn" onClick={() => pan((wrapperRef.current?.offsetWidth || 300) * 0.4)}>
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

import timelineData from './timelineData';

export const TIMELINE_MIN = -541;
export const TIMELINE_MAX = 0.5;

// ─── Palettes de couleurs par ère ────────────────────────────────────────────
const ERA_COLORS = {
  Paléozoïque: { fill: '#1A6B6B', text: '#0D4040' },
  Mésozoïque: { fill: '#2E7D32', text: '#1B5E20' },
  Cénozoïque: { fill: '#8B6914', text: '#5a4008' },
};

const PERIOD_COLORS = {
  Cambrien: { fill: '#00695C', text: '#003D33' },
  Ordovicien: { fill: '#00838F', text: '#004D57' },
  Silurien: { fill: '#2E7D32', text: '#1B5E20' },
  Dévonien: { fill: '#BF6000', text: '#7A3D00' },
  Carbonifère: { fill: '#2E7D32', text: '#1B5E20' },
  Permien: { fill: '#C62828', text: '#7B1010' },
  Trias: { fill: '#A04000', text: '#5D2500' },
  Jurassique: { fill: '#2E7D32', text: '#1B5E20' },
  Crétacé: { fill: '#388E3C', text: '#1B5225' },
  Paléogène: { fill: '#8B6914', text: '#5a4008' },
  Néogène: { fill: '#9E7B00', text: '#5a4600' },
  Quaternaire: { fill: '#7B8B00', text: '#485200' },
};

// Couleurs des époques par période et nom d'époque
const EPOCH_COLORS = {
  // Cambrien
  Terreneuvien: { fill: '#00796B', text: '#003D33' },
  'Série 2': { fill: '#00897B', text: '#00463D' },
  Miaolingien: { fill: '#00695C', text: '#003329' },
  Furongien: { fill: '#00695C', text: '#003329' },
  // Ordovicien
  'Ordovicien::Inférieur': { fill: '#006978', text: '#003D47' },
  'Ordovicien::Moyen': { fill: '#00838F', text: '#004D57' },
  'Ordovicien::Supérieur': { fill: '#0097A7', text: '#005662' },
  // Silurien
  Llandovery: { fill: '#388E3C', text: '#1B5225' },
  Wenlock: { fill: '#2E7D32', text: '#1B5E20' },
  Ludlow: { fill: '#388E3C', text: '#1B5225' },
  Pridoli: { fill: '#43A047', text: '#235928' },
  // Dévonien
  'Dévonien::Inférieur': { fill: '#E65100', text: '#7A2B00' },
  'Dévonien::Moyen': { fill: '#BF6000', text: '#7A3D00' },
  'Dévonien::Supérieur': { fill: '#A85400', text: '#5D2F00' },
  // Carbonifère
  Mississippien: { fill: '#388E3C', text: '#1B5225' },
  Pennsylvanien: { fill: '#2E7D32', text: '#1B5E20' },
  // Permien
  Cisuralien: { fill: '#D32F2F', text: '#7B1010' },
  Guadalupien: { fill: '#C62828', text: '#7B1010' },
  Lopingien: { fill: '#B71C1C', text: '#7B1010' },
  // Trias
  'Trias::Inférieur': { fill: '#BF5A00', text: '#6B3000' },
  'Trias::Moyen': { fill: '#A04000', text: '#5D2500' },
  'Trias::Supérieur': { fill: '#883800', text: '#3D1D00' },
  // Jurassique
  'Jurassique::Inférieur': { fill: '#43A047', text: '#235928' },
  'Jurassique::Moyen': { fill: '#2E7D32', text: '#1B5E20' },
  'Jurassique::Supérieur': { fill: '#256427', text: '#133213' },
  // Crétacé
  'Crétacé::Inférieur': { fill: '#388E3C', text: '#1B5225' },
  'Crétacé::Supérieur': { fill: '#2E7D32', text: '#1B5E20' },
  // Paléogène
  Paléocène: { fill: '#8B6914', text: '#5a4008' },
  Éocène: { fill: '#9E7B00', text: '#5a4600' },
  Oligocène: { fill: '#8B6914', text: '#5a4008' },
  // Néogène
  Miocène: { fill: '#9E7B00', text: '#5a4600' },
  Pliocène: { fill: '#8B6914', text: '#5a4008' },
  // Quaternaire
  Pléistocène: { fill: '#7B8B00', text: '#485200' },
  Holocène: { fill: '#6B7A00', text: '#3D4600' },
};

// Couleurs des étages par nom
const STAGE_COLORS = {
  // Cambrien - Terreneuvien
  Fortunien: { fill: '#00796B', text: '#003D33' },
  'Étage 2': { fill: '#00897B', text: '#00463D' },
  'Étage 3': { fill: '#0097A7', text: '#005662' },
  'Étage 4': { fill: '#00ACC1', text: '#006070' },
  Wuliuen: { fill: '#00695C', text: '#003329' },
  Drumien: { fill: '#00897B', text: '#00463D' },
  Guzhangien: { fill: '#00796B', text: '#003D33' },
  Paibien: { fill: '#00695C', text: '#003329' },
  Jiangshanien: { fill: '#00897B', text: '#00463D' },
  'Étage 10': { fill: '#00796B', text: '#003D33' },
  // Ordovicien
  Trémadocien: { fill: '#006978', text: '#003D47' },
  Floien: { fill: '#00838F', text: '#004D57' },
  Dapingien: { fill: '#0097A7', text: '#005662' },
  Darriwilien: { fill: '#00ACC1', text: '#006070' },
  Sandbien: { fill: '#0097A7', text: '#005662' },
  Katien: { fill: '#00838F', text: '#004D57' },
  Hirnantien: { fill: '#006978', text: '#003D47' },
  // Silurien
  Rhuddanien: { fill: '#388E3C', text: '#1B5225' },
  Aéronien: { fill: '#2E7D32', text: '#1B5E20' },
  Télychien: { fill: '#388E3C', text: '#1B5225' },
  Sheinwoodien: { fill: '#43A047', text: '#235928' },
  Homérien: { fill: '#388E3C', text: '#1B5225' },
  Gorstien: { fill: '#2E7D32', text: '#1B5E20' },
  Ludfordien: { fill: '#388E3C', text: '#1B5225' },
  Pridolien: { fill: '#43A047', text: '#235928' },
  // Dévonien
  Lochkovien: { fill: '#E65100', text: '#7A2B00' },
  Praguien: { fill: '#D4701A', text: '#7A3D00' },
  Emsien: { fill: '#BF6000', text: '#7A3D00' },
  Eifélien: { fill: '#C66200', text: '#7A3D00' },
  Givétien: { fill: '#BF6000', text: '#7A3D00' },
  Frasnien: { fill: '#A85400', text: '#5D2F00' },
  Famennien: { fill: '#8D4600', text: '#4A2400' },
  // Carbonifère
  Tournaisien: { fill: '#388E3C', text: '#1B5225' },
  Viséen: { fill: '#43A047', text: '#235928' },
  Serpukhovien: { fill: '#388E3C', text: '#1B5225' },
  Bachkirien: { fill: '#2E7D32', text: '#1B5E20' },
  Moscovien: { fill: '#388E3C', text: '#1B5225' },
  Kasimovien: { fill: '#2E7D32', text: '#1B5E20' },
  Gzhélien: { fill: '#256427', text: '#133213' },
  // Permien
  Assélien: { fill: '#D32F2F', text: '#7B1010' },
  Sakmarien: { fill: '#C62828', text: '#7B1010' },
  Artinskien: { fill: '#D32F2F', text: '#7B1010' },
  Kungurien: { fill: '#B71C1C', text: '#7B1010' },
  Roadien: { fill: '#C62828', text: '#7B1010' },
  Wordien: { fill: '#D32F2F', text: '#7B1010' },
  Capitanien: { fill: '#B71C1C', text: '#7B1010' },
  Wuchiapingien: { fill: '#C62828', text: '#7B1010' },
  Changhsingien: { fill: '#B71C1C', text: '#7B1010' },
  // Trias
  Induen: { fill: '#BF5A00', text: '#6B3000' },
  Olénékien: { fill: '#B05000', text: '#5D2B00' },
  Anisien: { fill: '#A04000', text: '#5D2500' },
  Ladinien: { fill: '#944500', text: '#4A2200' },
  Carnien: { fill: '#883800', text: '#3D1D00' },
  Norien: { fill: '#7A3200', text: '#3D1900' },
  Rhétien: { fill: '#6B2C00', text: '#321500' },
  // Jurassique
  Hettangien: { fill: '#43A047', text: '#235928' },
  Sinémurien: { fill: '#388E3C', text: '#1B5225' },
  Pliensbachien: { fill: '#2E7D32', text: '#1B5E20' },
  Toarcien: { fill: '#388E3C', text: '#1B5225' },
  Aalénien: { fill: '#2E7D32', text: '#1B5E20' },
  Bajocien: { fill: '#388E3C', text: '#1B5225' },
  Bathonien: { fill: '#2E7D32', text: '#1B5E20' },
  Callovien: { fill: '#256427', text: '#1B5E20' },
  Oxfordien: { fill: '#1E5421', text: '#0D3311' },
  Kimméridgien: { fill: '#256427', text: '#133213' },
  Tithonien: { fill: '#2E7D32', text: '#1B5E20' },
  // Crétacé
  Berriasien: { fill: '#2E7D32', text: '#1B5225' },
  Valanginien: { fill: '#388E3C', text: '#1B5225' },
  Hauterivien: { fill: '#2E7D32', text: '#1B5E20' },
  Barrémien: { fill: '#388E3C', text: '#1B5225' },
  Aptien: { fill: '#43A047', text: '#235928' },
  Albien: { fill: '#388E3C', text: '#1B5225' },
  Cénomanien: { fill: '#2E7D32', text: '#1B5E20' },
  Turonien: { fill: '#256427', text: '#133213' },
  Coniacien: { fill: '#1E5421', text: '#0D3311' },
  Santonien: { fill: '#256427', text: '#133213' },
  Campanien: { fill: '#2E7D32', text: '#1B5E20' },
  Maastrichtien: { fill: '#388E3C', text: '#1B5225' },
  // Paléogène
  Danien: { fill: '#8B6914', text: '#5a4008' },
  Sélandien: { fill: '#9E7B00', text: '#5a4600' },
  Thanétien: { fill: '#8B6914', text: '#5a4008' },
  Yprésien: { fill: '#9E7B00', text: '#5a4600' },
  Lutétien: { fill: '#8B6914', text: '#5a4008' },
  Bartonien: { fill: '#9E7B00', text: '#5a4600' },
  Priabonien: { fill: '#8B6914', text: '#5a4008' },
  Rupélien: { fill: '#9E7B00', text: '#5a4600' },
  Chattien: { fill: '#8B6914', text: '#5a4008' },
  // Néogène
  Aquitanien: { fill: '#9E7B00', text: '#5a4600' },
  Burdigalien: { fill: '#8B6914', text: '#5a4008' },
  Langhien: { fill: '#9E7B00', text: '#5a4600' },
  Serravalien: { fill: '#8B6914', text: '#5a4008' },
  Tortonien: { fill: '#9E7B00', text: '#5a4600' },
  Messinien: { fill: '#8B6914', text: '#5a4008' },
  Zancléen: { fill: '#9E7B00', text: '#5a4600' },
  Plaisancien: { fill: '#8B6914', text: '#5a4008' },
  // Quaternaire
  Gélasien: { fill: '#7B8B00', text: '#485200' },
  Calabrien: { fill: '#6B7A00', text: '#3D4600' },
  'Pléistocène moyen': { fill: '#7B8B00', text: '#485200' },
  'Pléistocène supérieur': { fill: '#6B7A00', text: '#3D4600' },
  // Holocène (étages très courts)
  Greenlandien: { fill: '#5A6A00', text: '#2D3500', tiny: true },
  Northgrippien: { fill: '#4A5A00', text: '#2D3500', tiny: true },
  Méghalayen: { fill: '#3A4A00', text: '#1A2500', tiny: true },
};

// ─── Maps d'info depuis timelineData ─────────────────────────────────────────
export const eraInfoMap = new Map();
export const periodInfoMap = new Map();
export const epochInfoMap = new Map();
export const stageInfoMap = new Map();

timelineData.forEach((era) => {
  eraInfoMap.set(era.era, era.eraInfo);
  era.periods.forEach((period) => {
    periodInfoMap.set(period.name, period.periodInfo);
    (period.epochs || []).forEach((epoch) => {
      const key = `${period.name}::${epoch.name}`;
      epochInfoMap.set(key, epoch.epochInfo);
      epochInfoMap.set(epoch.name, epoch.epochInfo);
      (epoch.stage || []).forEach((stage) => {
        stageInfoMap.set(stage.name, stage.stageInfo);
      });
    });
  });
});

// ─── Derivation des tableaux ERAS / PERIODS / EPOCHS / STAGES ────────────────
export const ERAS = timelineData.map((era) => ({
  name: era.era,
  start: era.eraStart,
  end: era.eraEnd,
  ...(ERA_COLORS[era.era] || { fill: '#888', text: '#333' }),
}));

export const PERIODS = timelineData.flatMap((era) =>
  era.periods.map((p) => ({
    name: p.name,
    start: p.periodStart,
    end: p.periodEnd,
    ...(PERIOD_COLORS[p.name] || { fill: '#888', text: '#333' }),
  })),
);

export const EPOCHS = timelineData.flatMap((era) =>
  era.periods.flatMap((period) =>
    (period.epochs || []).map((epoch) => {
      // Certaines époques ont un nom générique (Inférieur/Moyen/Supérieur)
      // → clé disambiguée "Période::NomEpoque" pour la couleur
      const disambigKey = `${period.name}::${epoch.name}`;
      const colors = EPOCH_COLORS[disambigKey] || EPOCH_COLORS[epoch.name] || { fill: '#888', text: '#333' };

      // Nom affiché sur la frise : préfixe si nom générique
      const genericNames = new Set(['Inférieur', 'Moyen', 'Supérieur']);
      const displayName = genericNames.has(epoch.name) ? `${period.name} ${epoch.name}` : epoch.name;

      // Info : on cherche d'abord la clé disambiguée
      const info = epochInfoMap.get(disambigKey) || epochInfoMap.get(epoch.name) || '';

      return {
        name: displayName,
        start: epoch.epochStart,
        end: epoch.epochEnd,
        info,
        ...colors,
      };
    }),
  ),
);

export const STAGES = timelineData.flatMap((era) =>
  era.periods.flatMap((period) =>
    (period.epochs || []).flatMap((epoch) =>
      (epoch.stage || []).map((stage) => {
        const colors = STAGE_COLORS[stage.name] || { fill: '#888', text: '#333' };
        return {
          name: stage.name,
          start: stage.stageStart,
          end: stage.stageEnd,
          info: stageInfoMap.get(stage.name) || '',
          ...colors,
        };
      }),
    ),
  ),
);

// ─── ALL_ITEMS pour la recherche ──────────────────────────────────────────────
export const ALL_GEO_ITEMS = [
  ...ERAS.map((e) => ({ ...e, type: 'era', info: eraInfoMap.get(e.name) || '' })),
  ...PERIODS.map((p) => ({ ...p, type: 'period', info: periodInfoMap.get(p.name) || '' })),
  ...EPOCHS.map((e) => ({ ...e, type: 'epoch' })),
  ...STAGES.map((s) => ({ ...s, type: 'stage' })),
];

export const TICK_INTERVALS = [
  0.00005, 0.0001, 0.0005, 0.001, 0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10, 25, 50, 100, 250, 500,
];

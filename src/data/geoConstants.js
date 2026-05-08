// geoConstants.js
import timelineData from './timelineData';

export const TIMELINE_MIN = -541;
export const TIMELINE_MAX = 0.5;

// Fonction utilitaire pour créer des dégradés de couleurs métallisés
function createMetalGradient(baseColor, isLight = false) {
  // Retourne un objet avec fill et text pour chaque niveau hiérarchique
  return {
    fill: baseColor,
    text: isLight ? '#1a1a1a' : '#1a1a1a',
  };
}

// Palette de base pour chaque ère (couleurs principales métallisées)
const ERA_BASE_COLORS = {
  Paléozoïque: { main: '#1a6b8a', light: '#2a8aaa', dark: '#0d4a6a' }, // Bleu métallisé
  Mésozoïque: { main: '#d4731a', light: '#e8933a', dark: '#a4530a' }, // Orangé métallisé
  Cénozoïque: { main: '#4a8a3a', light: '#6aaa4a', dark: '#2a6a1a' }, // Vert métallisé
};

// Dégradés pour les ères
export const ERA_COLORS = {
  Paléozoïque: { fill: ERA_BASE_COLORS.Paléozoïque.main, text: '#1a1a1a' },
  Mésozoïque: { fill: ERA_BASE_COLORS.Mésozoïque.main, text: '#1a1a1a' },
  Cénozoïque: { fill: ERA_BASE_COLORS.Cénozoïque.main, text: '#1a1a1a' },
};

// Dégradés pour les périodes (plus clair que l'ère mais dans le même ton)
export const PERIOD_COLORS = {
  // Paléozoïque (dégradé bleu)
  Cambrien: { fill: '#2a7a9a', text: '#1a1a1a' },
  Ordovicien: { fill: '#2a82a2', text: '#1a1a1a' },
  Silurien: { fill: '#2a8aaa', text: '#1a1a1a' },
  Dévonien: { fill: '#3292b2', text: '#1a1a1a' },
  Carbonifère: { fill: '#329aba', text: '#1a1a1a' },
  Permien: { fill: '#3aa2c2', text: '#1a1a1a' },

  // Mésozoïque (dégradé orangé)
  Trias: { fill: '#d47b2a', text: '#1a1a1a' },
  Jurassique: { fill: '#dc833a', text: '#1a1a1a' },
  Crétacé: { fill: '#e48b4a', text: '#1a1a1a' },

  // Cénozoïque (dégradé vert)
  Paléogène: { fill: '#5a9a4a', text: '#1a1a1a' },
  Néogène: { fill: '#6aaa5a', text: '#1a1a1a' },
  Quaternaire: { fill: '#7aba6a', text: '#1a1a1a' },
};

// Dégradés pour les époques (encore plus clair)
export const EPOCH_COLORS = {
  // Paléozoïque - Cambrien
  Terreneuvien: { fill: '#3a8aaa', text: '#1a1a1a' },
  'Série 2': { fill: '#4292b2', text: '#1a1a1a' },
  Miaolingien: { fill: '#4a9aba', text: '#1a1a1a' },
  Furongien: { fill: '#4aa2c2', text: '#1a1a1a' },

  // Paléozoïque - Ordovicien
  'Ordovicien::Inférieur': { fill: '#3a92b2', text: '#1a1a1a' },
  'Ordovicien::Moyen': { fill: '#429aba', text: '#1a1a1a' },
  'Ordovicien::Supérieur': { fill: '#4aa2c2', text: '#1a1a1a' },

  // Paléozoïque - Silurien
  Llandovery: { fill: '#4a9aba', text: '#1a1a1a' },
  Wenlock: { fill: '#52a2c2', text: '#1a1a1a' },
  Ludlow: { fill: '#52aaca', text: '#1a1a1a' },
  Pridoli: { fill: '#5ab2d2', text: '#1a1a1a' },

  // Paléozoïque - Dévonien
  'Dévonien::Inférieur': { fill: '#429aba', text: '#1a1a1a' },
  'Dévonien::Moyen': { fill: '#4aa2c2', text: '#1a1a1a' },
  'Dévonien::Supérieur': { fill: '#52aaca', text: '#1a1a1a' },

  // Paléozoïque - Carbonifère
  Mississippien: { fill: '#4aa2c2', text: '#1a1a1a' },
  Pennsylvanien: { fill: '#52aaca', text: '#1a1a1a' },

  // Paléozoïque - Permien
  Cisuralien: { fill: '#4aaaca', text: '#1a1a1a' },
  Guadalupien: { fill: '#52b2d2', text: '#1a1a1a' },
  Lopingien: { fill: '#5abad2', text: '#1a1a1a' },

  // Mésozoïque - Trias
  'Trias::Inférieur': { fill: '#dc8342', text: '#1a1a1a' },
  'Trias::Moyen': { fill: '#e48b4a', text: '#1a1a1a' },
  'Trias::Supérieur': { fill: '#ec9352', text: '#1a1a1a' },

  // Mésozoïque - Jurassique
  'Jurassique::Inférieur': { fill: '#e48b4a', text: '#1a1a1a' },
  'Jurassique::Moyen': { fill: '#ec9352', text: '#1a1a1a' },
  'Jurassique::Supérieur': { fill: '#f49b5a', text: '#1a1a1a' },

  // Mésozoïque - Crétacé
  'Crétacé::Inférieur': { fill: '#ec9352', text: '#1a1a1a' },
  'Crétacé::Supérieur': { fill: '#f49b5a', text: '#1a1a1a' },

  // Cénozoïque - Paléogène
  Paléocène: { fill: '#6aaa5a', text: '#1a1a1a' },
  Éocène: { fill: '#7aba6a', text: '#1a1a1a' },
  Oligocène: { fill: '#8aca7a', text: '#1a1a1a' },

  // Cénozoïque - Néogène
  Miocène: { fill: '#8aca7a', text: '#1a1a1a' },
  Pliocène: { fill: '#9ada8a', text: '#1a1a1a' },

  // Cénozoïque - Quaternaire
  Pléistocène: { fill: '#9ada8a', text: '#1a1a1a' },
  Holocène: { fill: '#aaea9a', text: '#1a1a1a' },
};

// Dégradés pour les étages (le plus clair de tous)
export const STAGE_COLORS = {
  // Paléozoïque - Cambrien (bleu très clair)
  Fortunien: { fill: '#4a9aba', text: '#1a1a1a' },
  'Étage 2': { fill: '#52a2c2', text: '#1a1a1a' },
  'Étage 3': { fill: '#5aaaaa', text: '#1a1a1a' },
  'Étage 4': { fill: '#62b2d2', text: '#1a1a1a' },
  Wuliuen: { fill: '#5ab2d2', text: '#1a1a1a' },
  Drumien: { fill: '#62bada', text: '#1a1a1a' },
  Guzhangien: { fill: '#6ac2e2', text: '#1a1a1a' },
  Paibien: { fill: '#6acaea', text: '#1a1a1a' },
  Jiangshanien: { fill: '#72d2f2', text: '#1a1a1a' },
  'Étage 10': { fill: '#7adafa', text: '#1a1a1a' },

  // Paléozoïque - Ordovicien
  Trémadocien: { fill: '#52a2c2', text: '#1a1a1a' },
  Floien: { fill: '#5aaaaa', text: '#1a1a1a' },
  Dapingien: { fill: '#62b2d2', text: '#1a1a1a' },
  Darriwilien: { fill: '#6abada', text: '#1a1a1a' },
  Sandbien: { fill: '#6ac2e2', text: '#1a1a1a' },
  Katien: { fill: '#72caea', text: '#1a1a1a' },
  Hirnantien: { fill: '#7ad2f2', text: '#1a1a1a' },

  // Paléozoïque - Silurien
  Rhuddanien: { fill: '#5ab2d2', text: '#1a1a1a' },
  Aéronien: { fill: '#62bada', text: '#1a1a1a' },
  Télychien: { fill: '#6ac2e2', text: '#1a1a1a' },
  Sheinwoodien: { fill: '#6acaea', text: '#1a1a1a' },
  Homérien: { fill: '#72d2f2', text: '#1a1a1a' },
  Gorstien: { fill: '#7adafa', text: '#1a1a1a' },
  Ludfordien: { fill: '#82e2ff', text: '#1a1a1a' },
  Pridolien: { fill: '#8aeaff', text: '#1a1a1a' },

  // Paléozoïque - Dévonien (suite dégradé bleu)
  Lochkovien: { fill: '#5ab2d2', text: '#1a1a1a' },
  Praguien: { fill: '#62bada', text: '#1a1a1a' },
  Emsien: { fill: '#6ac2e2', text: '#1a1a1a' },
  Eifélien: { fill: '#6acaea', text: '#1a1a1a' },
  Givétien: { fill: '#72d2f2', text: '#1a1a1a' },
  Frasnien: { fill: '#7adafa', text: '#1a1a1a' },
  Famennien: { fill: '#82e2ff', text: '#1a1a1a' },

  // Paléozoïque - Carbonifère
  Tournaisien: { fill: '#6ac2e2', text: '#1a1a1a' },
  Viséen: { fill: '#72caea', text: '#1a1a1a' },
  Serpukhovien: { fill: '#7ad2f2', text: '#1a1a1a' },
  Bachkirien: { fill: '#7adafa', text: '#1a1a1a' },
  Moscovien: { fill: '#82e2ff', text: '#1a1a1a' },
  Kasimovien: { fill: '#8aeaff', text: '#1a1a1a' },
  Gzhélien: { fill: '#92f2ff', text: '#1a1a1a' },

  // Paléozoïque - Permien
  Assélien: { fill: '#7ad2f2', text: '#1a1a1a' },
  Sakmarien: { fill: '#82dafa', text: '#1a1a1a' },
  Artinskien: { fill: '#8ae2ff', text: '#1a1a1a' },
  Kungurien: { fill: '#92eaff', text: '#1a1a1a' },
  Roadien: { fill: '#8ae2ff', text: '#1a1a1a' },
  Wordien: { fill: '#92eaff', text: '#1a1a1a' },
  Capitanien: { fill: '#9af2ff', text: '#1a1a1a' },
  Wuchiapingien: { fill: '#a2faff', text: '#1a1a1a' },
  Changhsingien: { fill: '#aaffff', text: '#1a1a1a' },

  // Mésozoïque - Trias (orangé clair)
  Induen: { fill: '#e48b4a', text: '#1a1a1a' },
  Olénékien: { fill: '#ec9352', text: '#1a1a1a' },
  Anisien: { fill: '#f49b5a', text: '#1a1a1a' },
  Ladinien: { fill: '#fca362', text: '#1a1a1a' },
  Carnien: { fill: '#ffab6a', text: '#1a1a1a' },
  Norien: { fill: '#ffb372', text: '#1a1a1a' },
  Rhétien: { fill: '#ffbb7a', text: '#1a1a1a' },

  // Mésozoïque - Jurassique
  Hettangien: { fill: '#ec9352', text: '#1a1a1a' },
  Sinémurien: { fill: '#f49b5a', text: '#1a1a1a' },
  Pliensbachien: { fill: '#fca362', text: '#1a1a1a' },
  Toarcien: { fill: '#ffab6a', text: '#1a1a1a' },
  Aalénien: { fill: '#ffb372', text: '#1a1a1a' },
  Bajocien: { fill: '#ffbb7a', text: '#1a1a1a' },
  Bathonien: { fill: '#ffc382', text: '#1a1a1a' },
  Callovien: { fill: '#ffcb8a', text: '#1a1a1a' },
  Oxfordien: { fill: '#ffd392', text: '#1a1a1a' },
  Kimméridgien: { fill: '#ffdb9a', text: '#1a1a1a' },
  Tithonien: { fill: '#ffe3a2', text: '#1a1a1a' },

  // Mésozoïque - Crétacé
  Berriasien: { fill: '#f49b5a', text: '#1a1a1a' },
  Valanginien: { fill: '#fca362', text: '#1a1a1a' },
  Hauterivien: { fill: '#ffab6a', text: '#1a1a1a' },
  Barrémien: { fill: '#ffb372', text: '#1a1a1a' },
  Aptien: { fill: '#ffbb7a', text: '#1a1a1a' },
  Albien: { fill: '#ffc382', text: '#1a1a1a' },
  Cénomanien: { fill: '#ffcb8a', text: '#1a1a1a' },
  Turonien: { fill: '#ffd392', text: '#1a1a1a' },
  Coniacien: { fill: '#ffdb9a', text: '#1a1a1a' },
  Santonien: { fill: '#ffe3a2', text: '#1a1a1a' },
  Campanien: { fill: '#ffebaa', text: '#1a1a1a' },
  Maastrichtien: { fill: '#fff3b2', text: '#1a1a1a' },

  // Cénozoïque - Paléogène (vert clair)
  Danien: { fill: '#7aba6a', text: '#1a1a1a' },
  Sélandien: { fill: '#8aca7a', text: '#1a1a1a' },
  Thanétien: { fill: '#9ada8a', text: '#1a1a1a' },
  Yprésien: { fill: '#aaea9a', text: '#1a1a1a' },
  Lutétien: { fill: '#bafaaa', text: '#1a1a1a' },
  Bartonien: { fill: '#caffba', text: '#1a1a1a' },
  Priabonien: { fill: '#daffca', text: '#1a1a1a' },
  Rupélien: { fill: '#eaffda', text: '#1a1a1a' },
  Chattien: { fill: '#faffea', text: '#1a1a1a' },

  // Cénozoïque - Néogène
  Aquitanien: { fill: '#8aca7a', text: '#1a1a1a' },
  Burdigalien: { fill: '#9ada8a', text: '#1a1a1a' },
  Langhien: { fill: '#aaea9a', text: '#1a1a1a' },
  Serravalien: { fill: '#bafaaa', text: '#1a1a1a' },
  Tortonien: { fill: '#caffba', text: '#1a1a1a' },
  Messinien: { fill: '#daffca', text: '#1a1a1a' },
  Zancléen: { fill: '#eaffda', text: '#1a1a1a' },
  Plaisancien: { fill: '#faffea', text: '#1a1a1a' },

  // Cénozoïque - Quaternaire
  Gélasien: { fill: '#9ada8a', text: '#1a1a1a' },
  Calabrien: { fill: '#aaea9a', text: '#1a1a1a' },
  'Pléistocène moyen': { fill: '#bafaaa', text: '#1a1a1a' },
  'Pléistocène supérieur': { fill: '#caffba', text: '#1a1a1a' },
  Greenlandien: { fill: '#daffca', text: '#1a1a1a', tiny: true },
  Northgrippien: { fill: '#eaffda', text: '#1a1a1a', tiny: true },
  Méghalayen: { fill: '#faffea', text: '#1a1a1a', tiny: true },
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
      const disambigKey = `${period.name}::${epoch.name}`;
      const colors = EPOCH_COLORS[disambigKey] || EPOCH_COLORS[epoch.name] || { fill: '#888', text: '#333' };

      const genericNames = new Set(['Inférieur', 'Moyen', 'Supérieur']);
      const displayName = genericNames.has(epoch.name) ? `${period.name} ${epoch.name}` : epoch.name;

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

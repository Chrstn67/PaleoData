// public/sw.js
const CACHE_NAME = 'paleodata-v1';
const DATA_URL = '/data.json'; // URL de vos données

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');
  event.waitUntil(self.clients.claim());
});

// Stocker les données des animaux dans le SW
let cachedAnimals = [];
let lastDataCheck = 0;

// Fonction pour charger les données des animaux
async function loadAnimalsData() {
  try {
    const response = await fetch(DATA_URL);
    if (response.ok) {
      const data = await response.json();
      cachedAnimals = data;
      lastDataCheck = Date.now();
      console.log('SW: Données des animaux chargées:', data.length, 'animaux');
      return data;
    }
  } catch (error) {
    console.error('SW: Erreur lors du chargement des données:', error);
  }
  return cachedAnimals;
}

// Vérifier s'il y a de nouveaux animaux
function checkForNewAnimals(animals) {
  const newAnimals = animals.filter((animal) => {
    if (!animal.date_ajout) return false;

    const dateAjoutee = new Date(animal.date_ajout);
    const dateActuelle = new Date();
    const uneSemaine = 7 * 24 * 60 * 60 * 1000; // 7 jours

    return dateActuelle - dateAjoutee <= uneSemaine;
  });

  return newAnimals.map((animal) => animal.nom);
}

// Gérer les messages du client principal
self.addEventListener('message', async (event) => {
  const { data } = event;
  console.log('SW: Message reçu:', data);

  if (data.type === 'CHECK_NEW_ANIMALS') {
    console.log('SW: Vérification des nouveaux animaux...');

    try {
      // Recharger les données si nécessaire (toutes les 10 minutes max)
      const now = Date.now();
      if (now - lastDataCheck > 10 * 60 * 1000) {
        await loadAnimalsData();
      }

      // Vérifier les nouveaux animaux
      const newAnimalNames = checkForNewAnimals(cachedAnimals);

      if (newAnimalNames.length > 0) {
        console.log('SW: Nouveaux animaux trouvés:', newAnimalNames);

        // Envoyer un message au client principal
        const clients = await self.clients.matchAll();
        clients.forEach((client) => {
          client.postMessage({
            type: 'NEW_ANIMALS_FOUND',
            animals: newAnimalNames,
            timestamp: now,
          });
        });
      } else {
        console.log('SW: Aucun nouvel animal trouvé');
      }
    } catch (error) {
      console.error('SW: Erreur lors de la vérification:', error);
    }
  }

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Gérer les clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('SW: Clic sur notification', event);

  event.notification.close();

  const action = event.action;

  if (action === 'dismiss') {
    console.log('SW: Notification ignorée');
    return;
  }

  // Ouvrir ou focuser l'onglet PaleoData
  event.waitUntil(
    self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Chercher si PaleoData est déjà ouvert
        const paleoDataClient = clientList.find(
          (client) => client.url.includes('paleodata') || client.url.includes('chrstn67.github.io/PaleoData'),
        );

        if (paleoDataClient) {
          // Focuser l'onglet existant
          console.log("SW: Focus sur l'onglet existant");
          return paleoDataClient.focus();
        } else {
          // Ouvrir un nouvel onglet
          console.log("SW: Ouverture d'un nouvel onglet");
          return self.clients.openWindow('https://chrstn67.github.io/PaleoData/#/');
        }
      })
      .catch((error) => {
        console.error("SW: Erreur lors de l'ouverture:", error);
        return self.clients.openWindow('https://chrstn67.github.io/PaleoData/#/');
      }),
  );
});

// Initialisation : charger les données au démarrage
self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([self.clients.claim(), loadAnimalsData()]));
});

// Écouter les changements de focus/visibilité
self.addEventListener('sync', (event) => {
  console.log('SW: Événement sync reçu');

  if (event.tag === 'check-new-animals') {
    event.waitUntil(
      loadAnimalsData().then((animals) => {
        const newAnimals = checkForNewAnimals(animals);
        if (newAnimals.length > 0) {
          return self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({
                type: 'NEW_ANIMALS_FOUND',
                animals: newAnimals,
                timestamp: Date.now(),
              });
            });
          });
        }
      }),
    );
  }
});

// Gestion du cache pour les performances
self.addEventListener('fetch', (event) => {
  // Cache seulement les ressources importantes
  if (
    event.request.destination === 'document' ||
    event.request.destination === 'script' ||
    event.request.destination === 'style'
  ) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          // Retourner le cache ou faire la requête réseau
          return response || fetch(event.request);
        })
        .catch(() => {
          // En cas d'erreur, essayer le réseau
          return fetch(event.request);
        }),
    );
  }
});

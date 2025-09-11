// services/NotificationService.js
class NotificationService {
  constructor() {
    this.STORAGE_KEY = 'paleodata_notifications';
    this.PERMISSION_KEY = 'paleodata_notification_permission';
    this.LAST_ASK_KEY = 'paleodata_last_permission_ask';
    this.ANIMALS_NOTIFIED_KEY = 'paleodata_notified_animals';
    this.LAST_CHECK_KEY = 'paleodata_last_check';
    this.NOTIFICATION_QUEUE_KEY = 'paleodata_notification_queue';

    this.swRegistration = null;
    this.checkInterval = null;
  }

  async init() {
    if (!this.isSupported()) return false;

    try {
      // Enregistrer le Service Worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker enregistré avec succès');

      // Attendre que le SW soit prêt
      await navigator.serviceWorker.ready;

      // Démarrer la vérification périodique si les notifications sont activées
      if (this.areNotificationsEnabled()) {
        this.startPeriodicCheck();
      }

      // Écouter les messages du Service Worker
      navigator.serviceWorker.addEventListener('message', this.handleSWMessage.bind(this));

      return true;
    } catch (error) {
      console.error("Erreur lors de l'initialisation du Service Worker:", error);
      return false;
    }
  }

  isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  getPermissionStatus() {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission;
  }

  shouldAskPermission() {
    const lastAsk = localStorage.getItem(this.LAST_ASK_KEY);
    const userChoice = localStorage.getItem(this.PERMISSION_KEY);

    if (!lastAsk && !userChoice) return true;

    if (userChoice === 'denied') {
      const lastAskDate = new Date(parseInt(lastAsk));
      const now = new Date();
      const daysDiff = (now - lastAskDate) / (1000 * 60 * 60 * 24);
      return daysDiff >= 30;
    }

    return false;
  }

  async requestPermission() {
    if (!this.isSupported()) {
      throw new Error('Les notifications ne sont pas supportées');
    }

    const permission = await Notification.requestPermission();
    const now = Date.now().toString();

    localStorage.setItem(this.PERMISSION_KEY, permission);
    localStorage.setItem(this.LAST_ASK_KEY, now);

    return permission;
  }

  getUserPreferences() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : { enabled: false, permission: 'default' };
  }

  saveUserPreferences(preferences) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
  }

  async enableNotifications() {
    try {
      const permission = await this.requestPermission();

      if (permission === 'granted') {
        this.saveUserPreferences({ enabled: true, permission: 'granted' });

        // Démarrer la vérification périodique
        this.startPeriodicCheck();

        // Envoyer une notification de confirmation
        setTimeout(() => {
          this.sendNotification(
            '🦕 PaleoData - Notifications activées !',
            'Vous serez maintenant alerté des nouveaux animaux ajoutés.',
            { tag: 'paleodata-enabled' },
          );
        }, 1000);

        console.log('Notifications activées avec succès');
        return true;
      } else {
        this.saveUserPreferences({ enabled: false, permission });
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'activation:", error);
      return false;
    }
  }

  async disableNotifications() {
    const preferences = this.getUserPreferences();
    preferences.enabled = false;
    this.saveUserPreferences(preferences);

    // Arrêter la vérification périodique
    this.stopPeriodicCheck();

    console.log('Notifications désactivées');
  }

  areNotificationsEnabled() {
    const preferences = this.getUserPreferences();
    return preferences.enabled && this.getPermissionStatus() === 'granted';
  }

  // Démarrer la vérification périodique (toutes les 15 minutes)
  startPeriodicCheck() {
    if (this.checkInterval) return; // Éviter les doublons

    console.log('Démarrage de la vérification périodique des notifications');

    // Vérification immédiate
    this.scheduleCheck();

    // Puis toutes les 15 minutes
    this.checkInterval = setInterval(
      () => {
        this.scheduleCheck();
      },
      15 * 60 * 1000,
    ); // 15 minutes
  }

  stopPeriodicCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('Vérification périodique arrêtée');
    }
  }

  // Programmer une vérification via le Service Worker
  async scheduleCheck() {
    if (this.swRegistration && this.swRegistration.active) {
      this.swRegistration.active.postMessage({
        type: 'CHECK_NEW_ANIMALS',
        timestamp: Date.now(),
      });
    }
  }

  // Gérer les messages du Service Worker
  handleSWMessage(event) {
    const { data } = event;

    if (data.type === 'NEW_ANIMALS_FOUND') {
      this.handleNewAnimalsFound(data.animals);
    }
  }

  // Traiter les nouveaux animaux trouvés
  async handleNewAnimalsFound(newAnimals) {
    if (!this.areNotificationsEnabled() || newAnimals.length === 0) return;

    const notifiedAnimals = this.getNotifiedAnimals();
    const reallyNewAnimals = newAnimals.filter((name) => !notifiedAnimals.includes(name));

    if (reallyNewAnimals.length > 0) {
      const count = reallyNewAnimals.length;
      const title = '🦕 PaleoData - Nouveaux animaux !';
      const body = `${count} nouveau${count > 1 ? 'x' : ''} animal${count > 1 ? 's' : ''} préhistorique${count > 1 ? 's' : ''} ${count > 1 ? 'ont été ajoutés' : 'a été ajouté'} !`;

      await this.sendNotification(title, body, {
        tag: 'paleodata-new-animals',
        newAnimals: reallyNewAnimals,
        requireInteraction: true, // Notification persistante
        actions: [
          {
            action: 'view',
            title: '👀 Voir les animaux',
          },
        ],
      });

      // Marquer comme notifiés
      const updatedNotified = [...notifiedAnimals, ...reallyNewAnimals];
      this.saveNotifiedAnimals(updatedNotified);

      console.log(`Notification envoyée pour ${count} nouveaux animaux:`, reallyNewAnimals);
    }
  }

  getNotifiedAnimals() {
    const stored = localStorage.getItem(this.ANIMALS_NOTIFIED_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveNotifiedAnimals(animalNames) {
    localStorage.setItem(this.ANIMALS_NOTIFIED_KEY, JSON.stringify(animalNames));
  }

  getLastCheck() {
    const stored = localStorage.getItem(this.LAST_CHECK_KEY);
    return stored ? new Date(parseInt(stored)) : null;
  }

  saveLastCheck() {
    localStorage.setItem(this.LAST_CHECK_KEY, Date.now().toString());
  }

  // Envoyer une notification via le Service Worker
  async sendNotification(title, body, options = {}) {
    if (!this.areNotificationsEnabled()) return false;

    try {
      if (this.swRegistration) {
        // Via Service Worker (meilleur pour la persistance)
        await this.swRegistration.showNotification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: options.tag || 'paleodata-notification',
          data: options.data || {},
          requireInteraction: options.requireInteraction || false,
          actions: options.actions || [],
          vibrate: [200, 100, 200], // Vibration sur mobile
          timestamp: Date.now(),
          ...options,
        });
      } else {
        // Fallback: notification directe
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          tag: options.tag || 'paleodata-notification',
          data: options.data || {},
          ...options,
        });
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi de notification:", error);
      return false;
    }
  }

  // Vérifier les nouveaux animaux (appelé manuellement)
  async checkAndNotifyNewAnimals(animals) {
    if (!this.areNotificationsEnabled()) return;

    console.log('Vérification manuelle des nouveaux animaux...');

    const newAnimals = animals.filter((animal) => {
      if (!animal.date_ajout) return false;

      const dateAjoutee = new Date(animal.date_ajout);
      const dateActuelle = new Date();
      const uneSemaine = 7 * 24 * 60 * 60 * 1000;
      return dateActuelle - dateAjoutee <= uneSemaine;
    });

    if (newAnimals.length > 0) {
      const newAnimalNames = newAnimals.map((animal) => animal.nom);
      await this.handleNewAnimalsFound(newAnimalNames);
    }

    this.saveLastCheck();
  }

  // Nettoyer les anciennes données
  cleanup() {
    const notifiedAnimals = this.getNotifiedAnimals();
    if (notifiedAnimals.length > 100) {
      this.saveNotifiedAnimals(notifiedAnimals.slice(-50));
    }
  }

  // Méthode pour tester les notifications
  async testNotification() {
    if (!this.areNotificationsEnabled()) {
      console.warn('Les notifications ne sont pas activées');
      return false;
    }

    return await this.sendNotification('🧪 Test PaleoData', 'Ceci est une notification de test. Tout fonctionne !', {
      tag: 'paleodata-test',
      requireInteraction: true,
    });
  }

  // Obtenir des statistiques
  getStats() {
    const notifiedAnimals = this.getNotifiedAnimals();
    const lastCheck = this.getLastCheck();
    const preferences = this.getUserPreferences();

    return {
      isEnabled: this.areNotificationsEnabled(),
      permission: this.getPermissionStatus(),
      notifiedAnimalsCount: notifiedAnimals.length,
      lastCheck: lastCheck ? lastCheck.toLocaleString('fr-FR') : 'Jamais',
      preferences,
    };
  }
}

export default new NotificationService();

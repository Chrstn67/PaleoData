// services/NotificationService.js
class NotificationService {
  constructor() {
    this.STORAGE_KEY = 'paleodata_notifications';
    this.PERMISSION_KEY = 'paleodata_notification_permission';
    this.LAST_ASK_KEY = 'paleodata_last_permission_ask';
    this.ANIMALS_NOTIFIED_KEY = 'paleodata_notified_animals';
    this.SUBSCRIPTION_KEY = 'paleodata_push_subscription';

    // REMPLACEZ CETTE CLÉ PAR LA VOTRE GÉNÉRÉE AVEC web-push
    this.VAPID_PUBLIC_KEY = 'BBwh4QXyawyozRC9vyApjrNnKuSeCY9OAYpB55xSCFwIgDQmjbjvtugKMFNn8N5uhDXKvx3DGQYDUDhdJF0UNt0';

    this.swRegistration = null;
  }

  // Initialiser le Service Worker
  async init() {
    if (!this.isSupported()) return false;

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');

      // Vérifier d'abord si la clé VAPID est valide
      if (!this.isValidVapidKey(this.VAPID_PUBLIC_KEY)) {
        console.error('Clé VAPID invalide. Veuillez générer une vraie clé avec web-push.');
        return false;
      }

      await this.subscribeToPush();
      return true;
    } catch (error) {
      console.error("Erreur lors de l'initialisation du Service Worker:", error);
      return false;
    }
  }

  // Vérifier si la clé VAPID est valide
  isValidVapidKey(key) {
    try {
      this.urlBase64ToUint8Array(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
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

    if (permission === 'granted') {
      await this.init();
    }

    return permission;
  }

  // S'abonner aux notifications push
  async subscribeToPush() {
    if (!this.swRegistration) return null;

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription();

      if (subscription) {
        localStorage.setItem(this.SUBSCRIPTION_KEY, JSON.stringify(subscription));
        return subscription;
      }

      const newSubscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
      });

      localStorage.setItem(this.SUBSCRIPTION_KEY, JSON.stringify(newSubscription));
      return newSubscription;
    } catch (error) {
      console.error("Erreur lors de l'abonnement push:", error);
      return null;
    }
  }

  urlBase64ToUint8Array(base64String) {
    // Nettoyer la chaîne base64
    const cleanBase64 = base64String.trim().replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/');

    const padding = '='.repeat((4 - (cleanBase64.length % 4)) % 4);
    const base64 = cleanBase64 + padding;

    try {
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    } catch (error) {
      throw new Error('Clé base64 invalide: ' + error.message);
    }
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

  disableNotifications() {
    const preferences = this.getUserPreferences();
    preferences.enabled = false;
    this.saveUserPreferences(preferences);
  }

  areNotificationsEnabled() {
    const preferences = this.getUserPreferences();
    return preferences.enabled && this.getPermissionStatus() === 'granted';
  }

  getNotifiedAnimals() {
    const stored = localStorage.getItem(this.ANIMALS_NOTIFIED_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveNotifiedAnimals(animalNames) {
    localStorage.setItem(this.ANIMALS_NOTIFIED_KEY, JSON.stringify(animalNames));
  }

  // Envoyer une notification via le Service Worker
  async sendNotification(title, body, data = {}) {
    if (!this.areNotificationsEnabled() || !this.swRegistration) return null;

    try {
      await this.swRegistration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'paleodata-new-animals',
        data,
      });
      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi de notification:", error);
      return false;
    }
  }

  // Vérifier les nouveaux animaux
  async checkAndNotifyNewAnimals(animals) {
    if (!this.areNotificationsEnabled()) return;

    const newAnimals = animals.filter((animal) => {
      if (!animal.date_ajout) return false;

      const dateAjoutee = new Date(animal.date_ajout);
      const dateActuelle = new Date();
      const uneSemaine = 7 * 24 * 60 * 60 * 1000;
      return dateActuelle - dateAjoutee <= uneSemaine;
    });

    if (newAnimals.length === 0) return;

    const notifiedAnimals = this.getNotifiedAnimals();
    const newAnimalNames = newAnimals.map((animal) => animal.nom);
    const reallyNewAnimals = newAnimalNames.filter((name) => !notifiedAnimals.includes(name));

    if (reallyNewAnimals.length > 0) {
      const count = reallyNewAnimals.length;
      const title = 'PaleoData - Nouveaux animaux !';
      const body = `PaleoData accueille ${count} nouveau${count > 1 ? 'x' : ''} animal${count > 1 ? 's' : ''}. Viens les découvrir !`;

      await this.sendNotification(title, body, { newAnimals: reallyNewAnimals });

      // Marquer comme notifiés
      const updatedNotified = [...notifiedAnimals, ...reallyNewAnimals];
      this.saveNotifiedAnimals(updatedNotified);
    }
  }

  cleanup() {
    const notifiedAnimals = this.getNotifiedAnimals();
    if (notifiedAnimals.length > 100) {
      this.saveNotifiedAnimals(notifiedAnimals.slice(-50));
    }
  }
}

export default new NotificationService();

// services/NotificationService.js
class NotificationService {
  constructor() {
    this.STORAGE_KEY = 'paleodata_notifications';
    this.PERMISSION_KEY = 'paleodata_notification_permission';
    this.LAST_ASK_KEY = 'paleodata_last_permission_ask';
    this.ANIMALS_NOTIFIED_KEY = 'paleodata_notified_animals';
  }

  // Vérifier si les notifications sont supportées
  isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  // Obtenir le statut des permissions
  getPermissionStatus() {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission;
  }

  // Vérifier si on doit demander la permission
  shouldAskPermission() {
    const lastAsk = localStorage.getItem(this.LAST_ASK_KEY);
    const userChoice = localStorage.getItem(this.PERMISSION_KEY);

    // Si l'utilisateur n'a jamais été demandé
    if (!lastAsk && !userChoice) return true;

    // Si l'utilisateur a refusé, vérifier si 30 jours sont passés
    if (userChoice === 'denied') {
      const lastAskDate = new Date(parseInt(lastAsk));
      const now = new Date();
      const daysDiff = (now - lastAskDate) / (1000 * 60 * 60 * 24);
      return daysDiff >= 30;
    }

    return false;
  }

  // Demander la permission
  async requestPermission() {
    if (!this.isSupported()) {
      throw new Error('Les notifications ne sont pas supportées sur ce navigateur');
    }

    const permission = await Notification.requestPermission();
    const now = Date.now().toString();

    localStorage.setItem(this.PERMISSION_KEY, permission);
    localStorage.setItem(this.LAST_ASK_KEY, now);

    return permission;
  }

  // Obtenir les préférences utilisateur
  getUserPreferences() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          enabled: false,
          permission: 'default',
        };
  }

  // Sauvegarder les préférences utilisateur
  saveUserPreferences(preferences) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
  }

  // Activer les notifications
  async enableNotifications() {
    try {
      const permission = await this.requestPermission();

      if (permission === 'granted') {
        this.saveUserPreferences({
          enabled: true,
          permission: 'granted',
        });
        return true;
      } else {
        this.saveUserPreferences({
          enabled: false,
          permission: permission,
        });
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'activation des notifications:", error);
      return false;
    }
  }

  // Désactiver les notifications
  disableNotifications() {
    const preferences = this.getUserPreferences();
    preferences.enabled = false;
    this.saveUserPreferences(preferences);
  }

  // Vérifier si les notifications sont activées
  areNotificationsEnabled() {
    const preferences = this.getUserPreferences();
    return preferences.enabled && this.getPermissionStatus() === 'granted';
  }

  // Obtenir les animaux déjà notifiés
  getNotifiedAnimals() {
    const stored = localStorage.getItem(this.ANIMALS_NOTIFIED_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Sauvegarder les animaux notifiés
  saveNotifiedAnimals(animalNames) {
    localStorage.setItem(this.ANIMALS_NOTIFIED_KEY, JSON.stringify(animalNames));
  }

  // Envoyer une notification
  sendNotification(title, body, options = {}) {
    if (!this.areNotificationsEnabled()) return null;

    // Créer les options de base sans les actions si on n'utilise pas de Service Worker
    const notificationOptions = {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'paleodata-new-animals',
      requireInteraction: false,
      ...options,
    };

    // Supprimer les actions si on n'utilise pas de Service Worker
    if (notificationOptions.actions) {
      delete notificationOptions.actions;
    }

    const notification = new Notification(title, notificationOptions);

    // Auto-fermer après 10 secondes
    setTimeout(() => {
      notification.close();
    }, 10000);

    // Gérer les clics sur la notification - REDIRECTION VERS LE SITE
    notification.onclick = () => {
      window.focus();
      notification.close();
      // Redirection vers le site PaleoData
      window.location.href = 'https://chrstn67.github.io/PaleoData/#/';
    };

    return notification;
  }

  // Vérifier et notifier les nouveaux animaux
  checkAndNotifyNewAnimals(animals) {
    if (!this.areNotificationsEnabled()) return;

    const newAnimals = animals.filter((animal) => {
      // Vérifier si l'animal a une date d'ajout
      if (!animal.date_ajout) return false;

      const dateAjoutee = new Date(animal.date_ajout);
      const dateActuelle = new Date();
      const uneSemaine = 7 * 24 * 60 * 60 * 1000;
      return dateActuelle - dateAjoutee <= uneSemaine;
    });

    if (newAnimals.length === 0) return;

    const notifiedAnimals = this.getNotifiedAnimals();
    const newAnimalNames = newAnimals.map((animal) => animal.nom);

    // Filtrer seulement les animaux qui n'ont PAS encore été notifiés
    const reallyNewAnimals = newAnimalNames.filter((name) => !notifiedAnimals.includes(name));

    if (reallyNewAnimals.length > 0) {
      const count = reallyNewAnimals.length;
      const title = 'PaleoData - Nouveaux animaux !';
      const body = `PaleoData accueille ${count} nouveau${count > 1 ? 'x' : ''} animal${count > 1 ? 's' : ''}. Viens les découvrir !`;

      const notification = this.sendNotification(title, body, {
        data: { newAnimals: reallyNewAnimals },
      });

      if (notification) {
        // Marquer ces animaux comme notifiés
        const updatedNotified = [...notifiedAnimals, ...reallyNewAnimals];
        this.saveNotifiedAnimals(updatedNotified);
      }
    }
  }

  // Nettoyer les anciennes données
  cleanup() {
    const notifiedAnimals = this.getNotifiedAnimals();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Pour l'instant, on nettoie si on a plus de 100 animaux notifiés
    if (notifiedAnimals.length > 100) {
      const recentAnimals = notifiedAnimals.slice(-50); // Garder les 50 derniers
      this.saveNotifiedAnimals(recentAnimals);
    }
  }
}

export default new NotificationService();

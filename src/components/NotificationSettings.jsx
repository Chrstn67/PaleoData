// components/NotificationSettings.js
import React, { useState, useEffect } from 'react';
import NotificationService from '../services/NotificationService';
import '../styles/NotificationSettings.css';

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSupported(NotificationService.isSupported());
    setNotificationsEnabled(NotificationService.areNotificationsEnabled());
    setPermissionStatus(NotificationService.getPermissionStatus());
  }, []);

  const handleToggle = async () => {
    setIsLoading(true);

    try {
      if (notificationsEnabled) {
        // Désactiver les notifications
        NotificationService.disableNotifications();
        setNotificationsEnabled(false);
      } else {
        // Activer les notifications
        const success = await NotificationService.enableNotifications();
        setNotificationsEnabled(success);
        setPermissionStatus(NotificationService.getPermissionStatus());

        if (success) {
          // Envoyer une notification de test
          NotificationService.sendNotification(
            'Notifications activées !',
            'Vous recevrez désormais des notifications pour les nouveaux animaux.',
            { tag: 'paleodata-test' },
          );
        }
      }
    } catch (error) {
      console.error('Erreur lors du changement des paramètres de notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = () => {
    if (!isSupported) return 'Non supporté par ce navigateur';
    if (permissionStatus === 'denied') return 'Bloquées par le navigateur';
    if (permissionStatus === 'granted' && notificationsEnabled) return 'Activées';
    return 'Désactivées';
  };

  const getStatusIcon = () => {
    if (!isSupported || permissionStatus === 'denied') return '🚫';
    if (permissionStatus === 'granted' && notificationsEnabled) return '🔔';
    return '🔕';
  };

  const canToggle = () => {
    return isSupported && permissionStatus !== 'denied';
  };

  return (
    <div className="notification-settings">
      <div className="settings-header">
        <h2>🔧 Paramètres des notifications</h2>
        <p>Gére tes préférences de notifications pour les nouveaux animaux</p>
      </div>

      <div className="setting-item">
        <div className="setting-info">
          <div className="setting-header">
            <span className="setting-icon">{getStatusIcon()}</span>
            <h3>Notifications des nouveaux animaux</h3>
          </div>
          <p className="setting-description">
            Reçois une notification lorsque de nouveaux animaux préhistoriques sont ajoutés à PaleoData.
          </p>
          <div className="setting-status">
            Status:{' '}
            <span className={`status-badge ${notificationsEnabled ? 'enabled' : 'disabled'}`}>{getStatusText()}</span>
          </div>
        </div>

        <div className="setting-control">
          {canToggle() ? (
            <button
              className={`toggle-btn ${notificationsEnabled ? 'enabled' : 'disabled'} ${isLoading ? 'loading' : ''}`}
              onClick={handleToggle}
              disabled={isLoading}
              type="button"
            >
              <span className="toggle-slider"></span>
              {isLoading && <div className="loading-spinner"></div>}
            </button>
          ) : (
            <div className="setting-blocked">
              {!isSupported ? (
                <span className="blocked-text">Ton navigateur ne supporte pas les notifications</span>
              ) : (
                <span className="blocked-text">
                  Notifications bloquées.
                  <button className="link-btn" onClick={() => window.location.reload()} type="button">
                    Rafraîchir la page
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {permissionStatus === 'denied' && (
        <div className="permission-help">
          <h4>📋 Comment réactiver les notifications :</h4>
          <ol>
            <li>Clique sur l'icône de cadenas ou d'information dans la barre d'adresse</li>
            <li>Change le paramètre des notifications de "Bloqué" à "Autoriser"</li>
            <li>Rafraîchit la page</li>
          </ol>
        </div>
      )}

      <div className="settings-footer">
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = 'https://chrstn67.github.io/PaleoData/#')}
          type="button"
        >
          ← Retour au site
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;

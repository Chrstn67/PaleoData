// components/NotificationSettings.js
import React, { useState, useEffect } from 'react';
import NotificationService from '../services/NotificationService';
import '../styles/NotificationSettings.css';

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setIsSupported(NotificationService.isSupported());
    setNotificationsEnabled(NotificationService.areNotificationsEnabled());
    setPermissionStatus(NotificationService.getPermissionStatus());
    setStats(NotificationService.getStats());
  };

  const handleToggle = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      if (notificationsEnabled) {
        // Désactiver les notifications
        await NotificationService.disableNotifications();
        setNotificationsEnabled(false);
      } else {
        // Activer les notifications
        const success = await NotificationService.enableNotifications();
        setNotificationsEnabled(success);
        setPermissionStatus(NotificationService.getPermissionStatus());
      }

      // Recharger les stats
      setStats(NotificationService.getStats());
    } catch (error) {
      console.error('Erreur lors du changement des paramètres de notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    setIsLoading(true);

    try {
      const success = await NotificationService.testNotification();
      setTestResult(success ? 'success' : 'error');

      if (success) {
        setTimeout(() => setTestResult(null), 3000);
      }
    } catch (error) {
      console.error('Erreur lors du test:', error);
      setTestResult('error');
      setTimeout(() => setTestResult(null), 3000);
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
        <p>Gérer les notifications pour les nouveaux animaux</p>
      </div>

      <div className="setting-item">
        <div className="setting-info">
          <div className="setting-header">
            <span className="setting-icon">{getStatusIcon()}</span>
            <h3>Notifications des nouveaux animaux</h3>
          </div>
          <p className="setting-description">
            Recevoir une notification lorsque de nouveaux animaux préhistoriques sont ajoutés à PaleoData.
            <br />
            <small>
              ⚠️ <strong>Limitation :</strong> Fonctionne uniquement quand le navigateur est ouvert
            </small>
          </p>
          <div className="setting-status">
            Statut:{' '}
            <span className={`status-badge ${notificationsEnabled ? 'enabled' : 'disabled'}`}>{getStatusText()}</span>
          </div>
        </div>

        <div className="setting-control">
          {canToggle() ? (
            <div className="control-group">
              <button
                className={`toggle-btn ${notificationsEnabled ? 'enabled' : 'disabled'} ${isLoading ? 'loading' : ''}`}
                onClick={handleToggle}
                disabled={isLoading}
                type="button"
              >
                <span className="toggle-slider"></span>
                {isLoading && <div className="loading-spinner"></div>}
              </button>
            </div>
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

      {/* Guide d'aide */}
      {permissionStatus === 'denied' && (
        <div className="permission-help">
          <h4>🔓 Comment réactiver les notifications :</h4>
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

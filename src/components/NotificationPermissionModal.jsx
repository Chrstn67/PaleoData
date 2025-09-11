// components/NotificationPermissionModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/NotificationPermissionModal.css';

const NotificationPermissionModal = ({ isOpen, onAccept, onDecline, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      onAccept();
      setIsClosing(false);
    }, 300);
  };

  const handleDecline = () => {
    setIsClosing(true);
    setTimeout(() => {
      onDecline();
      setIsClosing(false);
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleDecline();
    }
  };

  return (
    <div className={`notification-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleOverlayClick}>
      <div className="notification-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="notification-icon">🔔</div>
          <h2>Notifications PaleoData</h2>
        </div>

        <div className="modal-body">
          <p>Veux-tu recevoir des notifications lorsque de nouveaux animaux sont ajoutés ?</p>

          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">🦕</span>
              <span>Sois le premier à connaitre un nouvel animal</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">⚡</span>
              <span>Reste à jour avec du contenu frais et révisé</span>
            </div>
          </div>

          <p className="note">Tu peux modifier ce choix à tout moment dans tes paramètres.</p>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleDecline} type="button">
            Pas maintenant
          </button>
          <button className="btn btn-primary" onClick={handleAccept} type="button">
            <span className="btn-icon">🔔</span>
            Autoriser les notifications
          </button>
        </div>
      </div>
    </div>
  );
};

NotificationPermissionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

NotificationPermissionModal.defaultProps = {
  onClose: () => {},
};

export default NotificationPermissionModal;

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaShare, FaBookmark } from 'react-icons/fa';
import './ModalTimeline.css';

const ModalTimeline = ({ isOpen, closeModal, content, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: content?.substring(0, 100) + '...',
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('Lien copié dans le presse-papiers !'))
        .catch(() => alert('Impossible de copier le lien'));
    }
  };

  const handleBookmark = () => {
    // Simulation d'un système de favoris
    const bookmarks = JSON.parse(localStorage.getItem('timeline-bookmarks') || '[]');
    const bookmark = {
      id: Date.now(),
      title: title,
      content: content?.substring(0, 200) + '...',
      timestamp: new Date().toISOString(),
    };

    bookmarks.push(bookmark);
    localStorage.setItem('timeline-bookmarks', JSON.stringify(bookmarks));
    alert('Ajouté aux favoris !');
  };

  const formatContent = (text) => {
    if (!text) return '';

    // Transformation simple du texte en HTML plus riche
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^#{3}\s(.+)$/gm, '<h3>$1</h3>')
      .replace(/^#{2}\s(.+)$/gm, '<h2>$1</h2>')
      .replace(/^#{1}\s(.+)$/gm, '<h1>$1</h1>')
      .replace(/^\>\s(.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^\-\s(.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-container ${isOpen ? 'open' : ''}`} ref={modalRef}>
        <div className="modal-decoration"></div>

        <div className="modal-header">
          <h2>{title || 'Information'}</h2>
          <button className="close-button" onClick={closeModal} aria-label="Fermer la modale">
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          <div className="content-text">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
            ) : (
              <p>Aucune information disponible pour cet élément.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ModalTimeline.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.string,
  title: PropTypes.string,
};

ModalTimeline.defaultProps = {
  content: '',
  title: '',
};

export default ModalTimeline;

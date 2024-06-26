// ModalTimeline.jsx

import PropTypes from 'prop-types';
import './ModalTimeline.scss';

const ModalTimeline = ({ isOpen, closeModal, content }) => {
  if (!isOpen || !content) {
    return null;
  }

  return (
    <dialog className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={closeModal}>
      <button type="button" onClick={closeModal} className="close-btn">
        X
      </button>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="text-content" style={{ whiteSpace: 'pre-line' }}>
          {content}
        </div>
      </div>
    </dialog>
  );
};

ModalTimeline.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.string,
};

export default ModalTimeline;

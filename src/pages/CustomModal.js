import React from 'react';
import '../style/CustomModal.css';

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">x</button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;

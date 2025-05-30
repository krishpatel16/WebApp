import React from 'react';

function AddModal({ isVisible, onClose, onApply, inputValue, onInputChange, title }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div id="add-modal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span id="close-modal-btn" onClick={onClose}>
          &times;
        </span>
        <h3 id="modalTitle">{title}</h3>
        <label htmlFor="modalInput">Enter Name:</label>
        <input
          type="text"
          id="modalInput"
          value={inputValue}
          placeholder={`Enter ${title}`}
          onChange={onInputChange}
        />
        <button id="apply-btn" onClick={onApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
export default AddModal;
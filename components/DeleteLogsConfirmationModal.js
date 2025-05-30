import React from 'react';

function DeleteLogsConfirmationModal({ isVisible, onConfirm, onCancel }) {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <p>Are you sure you want to delete logs within the selected date range?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button id="confirmDelete" onClick={onConfirm}>OK</button>
          <button id="cancelDelete" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default DeleteLogsConfirmationModal;
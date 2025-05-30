import React from 'react';
import { useRouter } from 'next/router';

function GuestNoAccessModal({ isVisible, onClose }) {
  const router = useRouter();

  if (!isVisible) {
    return null;
  }
  const handleOkClick = () => {
    onClose();
    router.push('/');
  };
  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <p>Guests do not have access to usage charts.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button id="guest-ok-btn" onClick={handleOkClick}>OK</button>
        </div>
      </div>
    </div>
  );
}
export default GuestNoAccessModal;
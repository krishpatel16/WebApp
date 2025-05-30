import React from 'react';

function AddDeviceButton({ onAddDeviceClick }) {
  return (
    <button id="add-device-btn" className="add-btn" onClick={onAddDeviceClick}>
      Add Device
    </button>
  );
}
export default AddDeviceButton;
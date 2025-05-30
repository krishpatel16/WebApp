import React from 'react';

function AddRoomButton({ onAddRoomClick }) {
  return (
    <button id="add-room-btn" onClick={onAddRoomClick}>
      Add Room
    </button>
  );
}
export default AddRoomButton;
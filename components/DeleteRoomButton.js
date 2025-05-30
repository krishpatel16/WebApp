import React from 'react';

function DeleteRoomButton({ onDeleteRoomClick }) {
  return (
    <button id="delete-room-btn" className="delete-btn" onClick={onDeleteRoomClick}>
      Delete Room
    </button>
  );
}
export default DeleteRoomButton;
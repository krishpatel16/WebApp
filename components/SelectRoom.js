import React from 'react';

function SelectRoom({ currentRoom, rooms, onRoomSelect }) {
  return (
    <div className="select-room-container">
      <button
        id="select-room-btn"
        onClick={() => {
          const dropdown = document.getElementById('room-dropdown');
          if (dropdown) dropdown.classList.toggle('show');
        }}
      >
        Select Room
      </button>
      <div id="room-dropdown" className="hidden">
        {rooms.filter(room => room !== currentRoom).map(room => (
          <span key={room} onClick={() => onRoomSelect(room)}>
            {room}
          </span>
        ))}
      </div>
    </div>
  );
}
export default SelectRoom;
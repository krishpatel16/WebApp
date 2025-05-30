import React, { useState, useEffect } from 'react';

function DeviceItem({ room, device, index, onToggle, onSchedule, onRemove, role }) {
  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    const currentTime = new Date().toTimeString().slice(0, 5);
    const schedules = JSON.parse(localStorage.getItem('deviceSchedules')) || {};
    const roomSchedules = schedules[room] || [];
    const scheduled = roomSchedules.some(
      (schedule) =>
        schedule.deviceName === device.name &&
        ((schedule.onTime &&
          schedule.onTime <= currentTime &&
          (!schedule.offTime || schedule.offTime > currentTime)) ||
          (schedule.offTime && schedule.offTime <= currentTime))
    );
    setIsScheduled(scheduled);
  }, [room, device.name]);

  return (
    <div className="device">
      <span>{device.name}</span>
      <span style={{ fontWeight: 'bold', color: device.state ? 'green' : 'red' }}>
        {device.state ? 'On' : 'Off'}
      </span>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          className={`toggle-btn ${device.state ? 'active' : ''} ${isScheduled ? 'scheduled' : ''}`}
          onClick={() => onToggle(room, index, !device.state, device.name)}
        >
          {device.state ? 'Turn Off' : 'Turn On'}
        </button>
        {role !== 'Guest' && (
          <button className="remove-btn" onClick={() => onRemove(room, index)}>
            Remove
          </button>
        )}
        {role !== 'Guest' && (
          <button className="schedule-btn" onClick={onSchedule}>
            Schedule
          </button>
        )}
      </div>
    </div>
  );
}
export default DeviceItem;
import React, { useState, useEffect } from 'react';

function DeviceItem({ room, device, index, onToggle, onSchedule, onRemove, onBrightness, deviceStatus, role }) {
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

  let brightnessDisplay = null;
  if (deviceStatus && deviceStatus[device.name.toLowerCase()] && deviceStatus[device.name.toLowerCase()].brightness !== undefined) {
    brightnessDisplay = <span style={{ marginLeft: 8, color: '#888' }}>Brightness: {deviceStatus[device.name.toLowerCase()].brightness}%</span>;
  }

  return (
    <div className="device">
      <span>{device.name}</span>
      <span style={{ fontWeight: 'bold', color: device.state ? 'green' : 'red' }}>
        {device.state ? 'On' : 'Off'}
        {brightnessDisplay}
      </span>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          className={`toggle-btn ${device.state ? 'active' : ''} ${isScheduled ? 'scheduled' : ''}`}
          onClick={() => onToggle(room, index, !device.state, device.name)}
        >
          {device.state ? 'Turn Off' : 'Turn On'}
        </button>
        {role !== 'Guest' && (
          <button className="brightness-btn" onClick={() => onBrightness(room, index, device.name)}>
            Intensity
          </button>
        )}
        {role !== 'Guest' && (
          <button className="schedule-btn" onClick={onSchedule}>
            Schedule
          </button>
        )}
        {role !== 'Guest' && (
          <button className="remove-btn" onClick={() => onRemove(room, index)} title="Remove Device" style={{ background: 'none', border: 'none', padding: 0 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Remove" style={{ width: 24, height: 24 }} />
          </button>
        )}
      </div>
    </div>
  );
}
export default DeviceItem;
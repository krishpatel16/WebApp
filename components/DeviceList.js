import React from 'react';
import DeviceItem from './DeviceItem';

function DeviceList({ currentRoom, devices, onDeviceToggle, onDeviceRemove, onScheduleOpen, role }) {
  if (!devices[currentRoom]) {
    return <div>No devices in this room.</div>;
  }

  return (
    <div>
      <div id="device-header">
        <span className="device-title">Device Name</span>
        <span className="device-title">Device Status</span>
        <span className="device-title">Actions</span>
      </div>
      {devices[currentRoom].map((device, index) => (
        <DeviceItem
          key={`${currentRoom}-${device.name}`}
          room={currentRoom}
          device={device}
          index={index}
          onToggle={onDeviceToggle}
          onRemove={onDeviceRemove}
          onSchedule={() => onScheduleOpen(device.name)}
          role={role}
        />
      ))}
    </div>
  );
}
export default DeviceList;
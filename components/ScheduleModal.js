import React, { useState } from 'react';
import { API } from '../amplify/config';

function ScheduleModal({ isVisible, onClose, onSaveSchedule, deviceName, onTime, offTime, onOnTimeChange, onOffTimeChange }) {
  if (!isVisible) {
    return null;
  }

  const handleSave = async (e) => {
    await onSaveSchedule(e);
  };

  return (
    <>
      <div id="schedule-modal" className="modal" style={{ display: 'block' }}>
        <div className="modal-content">
          <span id="close-schedule-modal" onClick={onClose}>
            &times;
          </span>
          <h3>
            Schedule Device: <span id="schedule-device-name">{deviceName || <span style={{color:'red'}}>No device selected!</span>}</span>
          </h3>
          {!deviceName && (
            <div style={{color:'red', marginBottom:'10px'}}>Warning: No device selected. Please close and re-open the modal from a device's schedule button.</div>
          )}
          <label htmlFor="turnOnTime">Turn ON Time:</label>
          <input
            type="time"
            id="turnOnTime"
            value={onTime}
            onChange={onOnTimeChange}
            required
          />
          <label htmlFor="turnOffTime">Turn OFF Time:</label>
          <input
            type="time"
            id="turnOffTime"
            value={offTime}
            onChange={onOffTimeChange}
            required
          />
          <button id="save-schedule-btn" onClick={handleSave}>
            Save Schedule
          </button>
        </div>
      </div>
    </>
  );
}
export default ScheduleModal;
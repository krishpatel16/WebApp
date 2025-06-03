import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SelectRoom from '../components/SelectRoom';
import AddRoomButton from '../components/AddRoomButton';
import AddDeviceButton from '../components/AddDeviceButton';
import DeleteRoomButton from '../components/DeleteRoomButton';
import DeviceList from '../components/DeviceList';
import AddModal from '../components/AddModal';
import ScheduleModal from '../components/ScheduleModal';
import Hamburger from '../components/Hamburger';
import Sidebar from '../components/Sidebar';   

const NOTIFICATIONS_API = "https://qaw7e8om7e.execute-api.eu-west-2.amazonaws.com/dev/notifications";
const DEVICE_CONTROL_API = "https://qibrmmxfwg.execute-api.eu-west-2.amazonaws.com/dev/devicecontrol";
const DEVICE_STATUS_API = "https://atbla8g6p3.execute-api.eu-west-2.amazonaws.com/dev/commands";

async function sendScheduleNotification({ username, device, room, turnOnTime, turnOffTime }) {
    const message = `Device "${device}" in room "${room}" scheduled by ${username} (ON: ${turnOnTime}, OFF: ${turnOffTime})`;
  await fetch(NOTIFICATIONS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      message,
      device,
      room,
      turnOnTime,
      turnOffTime
    })
  });
}

function HomePage() {
  const [currentRoom, setCurrentRoom] = useState('Living Room');
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState({});
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addModalType, setAddModalType] = useState('');
  const [addModalInputValue, setAddModalInputValue] = useState('');
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [scheduledDeviceName, setScheduledDeviceName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [onTimeInput, setOnTimeInput] = useState('');
  const [offTimeInput, setOffTimeInput] = useState('');
  const [role, setRole] = useState('');
  const [deviceStatus, setDeviceStatus] = useState({});
  const [brightnessModalVisible, setBrightnessModalVisible] = useState(false);
  const [brightnessValue, setBrightnessValue] = useState(100);
  const [brightnessDevice, setBrightnessDevice] = useState({ room: '', index: -1, name: '' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const storedRooms = localStorage.getItem('rooms');
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    } else {
      setRooms(['Living Room', 'Kitchen', 'Bedroom']);
    }

    const storedDevices = localStorage.getItem('devices');
    if (storedDevices) {
      const parsedDevices = JSON.parse(storedDevices);
      Object.keys(parsedDevices).forEach(room => {
        parsedDevices[room] = parsedDevices[room].map(device => {
          if (device.state === 'on') return { ...device, state: true };
          if (device.state === 'off') return { ...device, state: false };
          return device;
        });
      });
      setDevices(parsedDevices);
      localStorage.setItem('devices', JSON.stringify(parsedDevices));
    } else {
      setDevices({
        'Living Room': [{ name: 'LED', state: false }, { name: 'Fan', state: false }],
        'Kitchen': [{ name: 'Bulb', state: true }],
        'Bedroom': [{ name: 'Light', state: false }],
      });
    }
    setRole(localStorage.getItem('userRole') || '');
  }, []);

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [rooms, devices]);

   const fetchDeviceStatus = async (deviceIdToFetch) => {
   if (!deviceIdToFetch) return;
   try {
  const response = await fetch(`${DEVICE_STATUS_API}?deviceId=${deviceIdToFetch}`);
   if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  setDeviceStatus(prevStatus => ({
   ...prevStatus,
   [deviceIdToFetch]: data
  }));
  } catch (error) {
  console.error(`Error fetching status for ${deviceIdToFetch}:`, error);
  setDeviceStatus(prevStatus => ({
  ...prevStatus,
  [deviceIdToFetch]: { status: 'UNKNOWN' }
   }));
  }
  };

  useEffect(() => {
    const ledDeviceId = 'led'; 
    fetchDeviceStatus(ledDeviceId);

  const interval = setInterval(() => {
   fetchDeviceStatus(ledDeviceId);
  }, 5000); 

  return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    const getLastLogged = () => JSON.parse(localStorage.getItem('lastScheduledLog') || '{}');
    const setLastLogged = (obj) => localStorage.setItem('lastScheduledLog', JSON.stringify(obj));
    const interval = setInterval(async () => {
      const now = new Date();
      const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      const schedules = JSON.parse(localStorage.getItem('deviceSchedules')) || {};
      const latestDevices = JSON.parse(localStorage.getItem('devices')) || {};
      const updatedDevices = { ...latestDevices };
      let changed = false;
      let lastLogged = getLastLogged();
      for (const room of rooms) {
        const roomSchedules = schedules[room] || [];
        if (!updatedDevices[room]) continue;
        updatedDevices[room] = await Promise.all(updatedDevices[room].map(async device => {
          const schedule = roomSchedules.find(s => {
            return s.deviceName === device.name && (s.roomName === room || !s.roomName);
          });
          if (schedule) {
            if (schedule.turnOnTime === currentTime) {
              if (!device.state) changed = true;
              const username = localStorage.getItem('username');
              const logKey = `${room}_${device.name}_ON`;
              if (username && lastLogged[logKey] !== currentTime) {
                const log = {
                  device: device.name,
                  room: room,
                  action: 'ON',
                  timestamp: new Date().toISOString(),
                  username: username
                };
                fetch('https://75e60r3zm0.execute-api.eu-west-2.amazonaws.com/dev/device-usage-logs', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(log)
                }).catch(err => console.error('Error logging scheduled ON:', err));
                lastLogged[logKey] = currentTime;
                setLastLogged(lastLogged);
              }

              try {
                await fetch(DEVICE_CONTROL_API, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    deviceId: device.name.toLowerCase(),
                    state: 'ON',
                    brightness: 100
                  })
                });
                fetchDeviceStatus(device.name.toLowerCase());
              } catch (err) {
                console.error('Error sending scheduled ON to backend:', err);
              }
              return { ...device, state: true };
            }
            if (schedule.turnOffTime === currentTime) {
              if (device.state) changed = true;
              const username = localStorage.getItem('username');
              const logKey = `${room}_${device.name}_OFF`;
              if (username && lastLogged[logKey] !== currentTime) {
                const log = {
                  device: device.name,
                  room: room,
                  action: 'OFF',
                  timestamp: new Date().toISOString(),
                  username: username
                };
                fetch('https://75e60r3zm0.execute-api.eu-west-2.amazonaws.com/dev/device-usage-logs', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(log)
                }).catch(err => console.error('Error logging scheduled OFF:', err));
                lastLogged[logKey] = currentTime;
                setLastLogged(lastLogged);
              }

              try {
                await fetch(DEVICE_CONTROL_API, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    deviceId: device.name.toLowerCase(),
                    state: 'OFF',
                    brightness: 0
                  })
                });
                fetchDeviceStatus(device.name.toLowerCase());
              } catch (err) {
                console.error('Error sending scheduled OFF to backend:', err);
              }
              return { ...device, state: false };
            }
          }
          return { ...device };
        }));
      }
      setDevices(updatedDevices);
      localStorage.setItem('devices', JSON.stringify(updatedDevices));
      if (changed) {

      }
    }, 5000);
    return () => clearInterval(interval);
  }, [rooms]);


  const handleRoomSelect = (room) => {
    setCurrentRoom(room);
  };

  const handleAddRoomClick = () => {
    setAddModalType('room');
    setAddModalVisible(true);
  };

  const handleAddDeviceClick = () => {
    setAddModalType('device');
    setAddModalVisible(true);
  };

  const handleDeleteRoomClick = () => {
    const updatedRooms = rooms.filter(room => room !== currentRoom);
    const updatedDevices = { ...devices };
    delete updatedDevices[currentRoom];
    setRooms(updatedRooms);
    setCurrentRoom(updatedRooms[0] || '');
    setDevices(updatedDevices);
  };

  const handleAddModalInputChange = (event) => {
    setAddModalInputValue(event.target.value);
  };

  const handleAddModalApply = () => {
    const name = addModalInputValue.trim();
    console.log('AddModal input value:', addModalInputValue, '| Trimmed:', name);
    if (!name) {
      alert('Device name cannot be empty.');
      return;
    }
    if (addModalType === 'device') {
      if (devices[currentRoom] && devices[currentRoom].some(device => device.name === name)) {
        alert('A device with this name already exists in this room.');
        return;
      }
      const updatedDevices = { ...devices };
      if (!updatedDevices[currentRoom]) {
        updatedDevices[currentRoom] = [];
      }
      updatedDevices[currentRoom].push({ name: name, state: false });
      setDevices(updatedDevices);
      console.log('Device added:', name, 'in room:', currentRoom, updatedDevices);
    } else if (addModalType === 'room') {
      if (!rooms.includes(name)) {
        setRooms([...rooms, name]);
        setDevices({ ...devices, [name]: [] });
      } else {
        alert('Room already exists.');
      }
    }
    setAddModalVisible(false);
    setAddModalInputValue('');
  };

  const handleAddModalClose = () => {
    setAddModalVisible(false);
    setAddModalInputValue('');
  };

  const handleSetBrightness = async () => {
    const { room, index, name } = brightnessDevice;
    if (!room || index === -1 || !name) return;

    const commandPayload = {
      deviceId: name.toLowerCase(),
      state: 'ON',
      brightness: brightnessValue
    };
    try {
      const response = await fetch(DEVICE_CONTROL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commandPayload)
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || 'Failed to set intensity');
      setDevices(prev => {
        const updated = { ...prev };
        if (updated[room] && updated[room][index]) {
          updated[room][index].state = true;
        }
        return updated;
      });
      setBrightnessModalVisible(false);
      fetchDeviceStatus(name.toLowerCase());
    } catch (error) {
      alert('Failed to set intensity: ' + error.message);
    }
  };

  const handleDeviceToggle = async (room, index, newState, deviceName) => {
    const updatedDevices = { ...devices };
    if (updatedDevices[room] && updatedDevices[room][index]) {
      updatedDevices[room][index].state = newState;
      setDevices(updatedDevices);
      const username = localStorage.getItem('username');
      if (username) {
        const log = {
          device: deviceName,
          room: room,
          action: newState ? 'ON' : 'OFF',
          timestamp: new Date().toISOString(),
          username: username
        };
        try {
          await fetch('https://75e60r3zm0.execute-api.eu-west-2.amazonaws.com/dev/device-usage-logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(log)
          });
        } catch (err) {
          console.error('Error logging device action:', err);
        }
      }

      const commandPayload = {
        deviceId: deviceName.toLowerCase(),
        state: newState ? 'ON' : 'OFF',
        brightness: newState ? 100 : 0
      };
      try {
        const response = await fetch(DEVICE_CONTROL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(commandPayload)
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to send command to IoT Core.');
        }
        fetchDeviceStatus(deviceName.toLowerCase());
      } catch (error) {
        alert(`Failed to control device: ${error.message}`);
        updatedDevices[room][index].state = !newState;
        setDevices(updatedDevices);
      }
      console.log(`Device "${updatedDevices[room][index].name}" in "${room}" turned ${newState}`);
    }
  };

  const handleScheduleOpen = (deviceName) => {
    setScheduledDeviceName(deviceName);
    setScheduleModalVisible(true);
  };

  const handleScheduleClose = () => {
    setScheduleModalVisible(false);
    setOnTimeInput('');
    setOffTimeInput('');
  };

  const handleOnTimeChange = (event) => {
    setOnTimeInput(event.target.value);
  };

  const handleOffTimeChange = (event) => {
    setOffTimeInput(event.target.value);
  };

  const handleSaveSchedule = async () => {
    if (!scheduledDeviceName || !onTimeInput || !offTimeInput) {
      alert('Please fill in all fields: device name, turn on time, and turn off time.');
      console.warn('Missing required fields:', {
        roomName: currentRoom,
        deviceName: scheduledDeviceName,
        turnOnTime: onTimeInput,
        turnOffTime: offTimeInput,
      });
      return;
    }
    try {
          console.log({
          roomName: currentRoom,
          deviceName: scheduledDeviceName,
          turnOnTime: onTimeInput,
          turnOffTime: offTimeInput,
          });
      const response = await fetch('https://0rynq68pza.execute-api.eu-west-2.amazonaws.com/dev/schedule-device', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: currentRoom,
          deviceName: scheduledDeviceName,
          turnOnTime: onTimeInput,
          turnOffTime: offTimeInput,
        }),
      });
      const responseText = await response.text();
      if (!response.ok) throw new Error('Network response was not ok');
      const data = JSON.parse(responseText);
      await sendScheduleNotification({
        username: localStorage.getItem('username'),
        device: scheduledDeviceName,
        room: currentRoom,
        turnOnTime: onTimeInput,
        turnOffTime: offTimeInput
      });
      setScheduleModalVisible(false);
      setOnTimeInput('');
      setOffTimeInput('');
      const schedules = JSON.parse(localStorage.getItem('deviceSchedules')) || {};
      if (!schedules[currentRoom]) schedules[currentRoom] = [];
      schedules[currentRoom] = schedules[currentRoom].filter(s => s.deviceName !== scheduledDeviceName);
      schedules[currentRoom].push({
        roomName: currentRoom,
        deviceName: scheduledDeviceName,
        turnOnTime: onTimeInput,
        turnOffTime: offTimeInput,
      });
      localStorage.setItem('deviceSchedules', JSON.stringify(schedules));
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule.');
    }
  };

  const handleDeviceRemove = (room, index) => {
    const updatedDevices = { ...devices };
    if (updatedDevices[room]) {
    updatedDevices[room].splice(index, 1);
    setDevices(updatedDevices);
    }
  };

  const handleBrightnessOpen = (room, index, deviceName) => {
    setBrightnessDevice({ room, index, name: deviceName });
    // Try to get current brightness from deviceStatus
    const status = deviceStatus[deviceName.toLowerCase()];
    if (status && typeof status.brightness === 'number') {
      setBrightnessValue(status.brightness);
    } else {
      setBrightnessValue(100);
    }
    setBrightnessModalVisible(true);
  };

  const handleBrightnessClose = () => {
    setBrightnessModalVisible(false);
    setBrightnessDevice({ room: '', index: -1, name: '' });
  };

  return (
    <div>
      <Head>
        <title>Smart Home System</title>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      </Head>
      <header>
        <h1 id="logo">Smart Home System</h1>
      </header>
      <nav>
        <div id="nav-left">
          <Hamburger onClick={toggleSidebar} />
        </div>
        <div id="nav-center">
        <Link href="/home" style={{ color: 'white', margin: 0, textDecoration: 'none' }}>
            <h2>Home</h2>
        </Link>
        </div>
        <div id="nav-right">
          <SelectRoom currentRoom={currentRoom} rooms={rooms} onRoomSelect={handleRoomSelect} />
          <AddRoomButton onAddRoomClick={handleAddRoomClick} />
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main>
        <section id="room-content">
          <span>
            <h2 id="room-title">{currentRoom}</h2>
            <AddDeviceButton onAddDeviceClick={handleAddDeviceClick} />
            <DeleteRoomButton onDeleteRoomClick={handleDeleteRoomClick} />
          </span>
          <DeviceList
            currentRoom={currentRoom}
            devices={devices}
            onDeviceToggle={handleDeviceToggle}
            onDeviceRemove={handleDeviceRemove}
            onScheduleOpen={handleScheduleOpen}
            onBrightnessOpen={handleBrightnessOpen} 
            deviceStatus={deviceStatus}
            role={role}
          />
        </section>
      </main>

      <AddModal
        isVisible={addModalVisible}
        title={addModalType === 'device' ? 'Add Device' : 'Add Room'}
        inputValue={addModalInputValue}
        onInputChange={handleAddModalInputChange}
        onApply={handleAddModalApply}
        onClose={handleAddModalClose}
      />

      <ScheduleModal
        isVisible={scheduleModalVisible}
        deviceName={scheduledDeviceName}
        onTime={onTimeInput}
        offTime={offTimeInput}
        onOnTimeChange={handleOnTimeChange}
        onOffTimeChange={handleOffTimeChange}
        onSaveSchedule={handleSaveSchedule}
        onClose={handleScheduleClose}
      />

      {brightnessModalVisible && (
        <div className="modal is-active" style={{ display: 'block' }}>
          <div className="modal-background" onClick={handleBrightnessClose}></div>
          <div className="modal-content" style={{ maxWidth: 400, margin: 'auto', background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <span className="close" onClick={handleBrightnessClose} style={{ float: 'right', fontSize: 24, cursor: 'pointer' }}>&times;</span>
            <h3 style={{ marginBottom: 16 }}>Set Intensity for {brightnessDevice.name}</h3>
            <label htmlFor="brightness-range" style={{ display: 'block', marginBottom: 8 }}>Intensity (0-100):</label>
            <input
              id="brightness-range"
              type="range"
              min="0"
              max="100"
              value={brightnessValue}
              onChange={e => setBrightnessValue(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center', margin: '10px 0', fontWeight: 600 }}>{brightnessValue}%</div>
            <button onClick={handleSetBrightness} style={{ width: '100%', background: 'linear-gradient(90deg, #f9d423 0%, #ff4e50 100%)', color: '#fff', border: 'none', borderRadius: 20, padding: '10px 0', fontWeight: 600, fontSize: 16, marginTop: 12 }}>Set Intensity</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
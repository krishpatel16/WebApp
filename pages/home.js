import React, { useState, useEffect  } from 'react';
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

  useEffect(() => {
    const getLastLogged = () => JSON.parse(localStorage.getItem('lastScheduledLog') || '{}');
    const setLastLogged = (obj) => localStorage.setItem('lastScheduledLog', JSON.stringify(obj));
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      const schedules = JSON.parse(localStorage.getItem('deviceSchedules')) || {};
      const latestDevices = JSON.parse(localStorage.getItem('devices')) || {};
      const updatedDevices = { ...latestDevices };
      let changed = false;
      let lastLogged = getLastLogged();
      rooms.forEach(room => {
        const roomSchedules = schedules[room] || [];
        if (!updatedDevices[room]) return;
        updatedDevices[room] = updatedDevices[room].map(device => {
          const schedule = roomSchedules.find(s => {
            return s.deviceName === device.name && (s.roomName === room || !s.roomName);
          });
          if (schedule) {
            console.log(`[Schedule Polling] Comparing for device '${device.name}' in room '${room}':`, {
              turnOnTime: schedule.turnOnTime,
              turnOffTime: schedule.turnOffTime,
              currentTime
            });
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
            return { ...device, state: false };
            }
          }
          return { ...device };
        });
      });
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
    </div>
  );
}

export default HomePage;
document.addEventListener("DOMContentLoaded", () => {
    const roomTitle = document.getElementById("room-title");
    const addRoomBtn = document.getElementById("add-room-btn");
    const addDeviceBtn = document.getElementById("add-device-btn");
    const deleteRoomBtn = document.getElementById("delete-room-btn");
    const deviceList = document.getElementById("device-list");
    const modal = document.getElementById("add-modal");
    const applyBtn = document.getElementById("apply-btn");
    const modalInput = document.getElementById("modalInput");
    const modalTitle = document.getElementById("modalTitle");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const sidebar = document.getElementById("sidebar");
    const closeSidebarBtn = document.getElementById("close-btn");
    const selectRoomBtn = document.getElementById("select-room-btn");
    const roomDropdown = document.getElementById("room-dropdown");

    let currentRoom = "Living Room";
    let isAddingDevice = false;

    let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    if (!rooms.includes("Living Room")) {
        rooms.push("Living Room");
    }

    let devices = JSON.parse(localStorage.getItem("devices")) || {};

    const role = localStorage.getItem('userRole');

    if (!role) {
        window.location.href = 'login.html';
        return;
    }

    // Hide room and device management buttons for Guest and Family
    if (role === 'Guest') {
        document.getElementById('add-room-btn')?.classList.add('hidden');
        document.getElementById('add-device-btn')?.classList.add('hidden');
        document.getElementById('delete-room-btn')?.classList.add('hidden');
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.style.display = "none";
        });
    }

    function renderDevices() {
        deviceList.innerHTML = "";
        if (!devices[currentRoom]) devices[currentRoom] = [];
        
        // Get current time for schedule checking
        const currentTime = new Date().toTimeString().slice(0, 5);
        const schedules = JSON.parse(localStorage.getItem("deviceSchedules")) || {};
        const roomSchedules = schedules[currentRoom] || [];
    
        devices[currentRoom].forEach((device, index) => {
            const deviceDiv = document.createElement("div");
            deviceDiv.classList.add("device");
    
            const nameSpan = document.createElement("span");
            nameSpan.textContent = device.name;
    
            const statusSpan = document.createElement("span");
            statusSpan.textContent = device.state ? "On" : "Off";
            statusSpan.style.fontWeight = "bold";
            statusSpan.style.color = device.state ? "green" : "red";
    
            const actionDiv = document.createElement("div");
            actionDiv.style.display = "flex";
            actionDiv.style.justifyContent = "center";
            actionDiv.style.gap = "10px";
    
            const toggleBtn = document.createElement("button");
            toggleBtn.classList.add("toggle-btn");
            toggleBtn.id = `${currentRoom}-${device.name}-btn`;
            toggleBtn.textContent = device.state ? "Turn Off" : "Turn On";

            // Apply button styling based on state
            if (device.state) {
                toggleBtn.classList.add("active");
            } else {
                toggleBtn.classList.remove("active");
            }
    
            // Check if device is in scheduled state
            const isScheduled = roomSchedules.some(schedule => {
                return schedule.deviceName === device.name && 
                      ((schedule.onTime && schedule.onTime <= currentTime && 
                        (!schedule.offTime || schedule.offTime > currentTime)) ||
                      (schedule.offTime && schedule.offTime <= currentTime));
            });

    
            if (isScheduled) {
                toggleBtn.classList.add("scheduled");
            } else {
                toggleBtn.classList.remove("scheduled");
            }

            // In app.js, modify the toggleBtn event listener:
            toggleBtn.addEventListener("click", () => {
                console.log("🖱️ Button clicked - Toggling device:", device.name);
                console.log("Current Room:", currentRoom);
                console.log("Device Index:", index);
                const newState = !devices[currentRoom][index].state;
                console.log("🔌 New state:", newState ? "ON" : "OFF");
                
                devices[currentRoom][index].state = newState;
                
                const now = new Date();
                const action = newState ? "Turned On" : "Turned Off";
                logDeviceAction(device.name, currentRoom, action, now.toISOString());
                saveDevices();
                renderDevices();
            });

            function logDeviceAction(deviceName, room, action, timestamp) {
                console.log("Logging Device Action - Name:", deviceName, "Room:", room, "Action:", action, "Timestamp:", timestamp);
                console.group("📊 Logging Device Action");
                try {
                    const logs = JSON.parse(localStorage.getItem("deviceUsageLogs")) || [];
                    
                    console.log("ℹ️ Before adding:", {
                        device: deviceName,
                        room: room,
                        action: action,
                        timestamp: timestamp
                    });
                    
                    logs.push({
                        device: deviceName,
                        room: room,
                        action: action,
                        timestamp: timestamp
                    });
                    
                    localStorage.setItem("deviceUsageLogs", JSON.stringify(logs));
                    console.log("✅ Successfully saved to localStorage");
                    
                    // Verify the save worked
                    const verifyLogs = JSON.parse(localStorage.getItem("deviceUsageLogs"));
                    console.log("🔍 Verify localStorage:", verifyLogs);
                    
                    // Notify charts page
                    console.log("🔔 Dispatching update event");
                    window.dispatchEvent(new Event('deviceLogUpdated'));
                } catch (error) {
                    console.error("❌ Error logging action:", error);
                }
                console.groupEnd();
            }

            const scheduleBtn = document.createElement("button");
            scheduleBtn.classList.add("schedule-btn");
            scheduleBtn.textContent = "Schedule";
            // In the renderDevices function, modify the schedule button event listener:
            scheduleBtn.addEventListener("click", () => {
                console.log("Scheduling device:", {
                    name: device.name,
                    room: currentRoom
                });
                openScheduleModal(device.name, currentRoom);
            });

// Remove the existing openScheduleModal function from app.js
    
            actionDiv.appendChild(toggleBtn);
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "Remove";
            // Only add Remove button if user is not a Guest
            if (role !== 'Guest') {
                removeBtn.addEventListener("click", () => {
                    devices[currentRoom].splice(index, 1);
                    saveDevices();
                    renderDevices();
                });
                actionDiv.appendChild(removeBtn); // Only append if allowed
            }
            actionDiv.appendChild(scheduleBtn);
    
            deviceDiv.appendChild(nameSpan);
            deviceDiv.appendChild(statusSpan);
            deviceDiv.appendChild(actionDiv);
            deviceList.appendChild(deviceDiv);
        });
        saveDevices();
    }

    function updateRoomDropdown() {
        roomDropdown.innerHTML = "";
        rooms.forEach(room => {
            if (room !== currentRoom) {
                const item = document.createElement("span");
                item.textContent = room;
                item.addEventListener("click", () => {
                    currentRoom = room;
                    roomTitle.textContent = currentRoom;
                    console.log("Setting current room: ", currentRoom);
                    localStorage.setItem('currentRoom', currentRoom);
                    console.log("Accessing current room: ", currentRoom);
                    renderDevices();
                    roomDropdown.classList.remove("show");
                    updateRoomDropdown();
                });
                roomDropdown.appendChild(item);
            }
        });
    }

    function openScheduleModal(deviceName) {
        const scheduleModal = document.getElementById("schedule-modal");
        scheduleModal.style.display = "block";
        document.getElementById("schedule-device-name").textContent = deviceName;
        document.getElementById("schedule-device-name").setAttribute("data-device", deviceName);
        console.log("Opening schedule modal for device:", deviceName);
    }

    selectRoomBtn.addEventListener("click", () => {
        roomDropdown.classList.toggle("show");
    });

    addRoomBtn.addEventListener("click", () => {
        isAddingDevice = false;
        modalInput.value = "";
        modalInput.placeholder = "Enter Room Name";
        modalInput.dataset.type = "room";
        modalTitle.textContent = "Add Room";
        modal.style.display = "block";
    });

    addDeviceBtn.addEventListener("click", () => {
        isAddingDevice = true;
        modalInput.value = "";
        modalInput.placeholder = "Enter Device Name";
        modalInput.dataset.type = "device";
        modalTitle.textContent = "Add Device";
        modal.style.display = "block";
    });

    applyBtn.addEventListener("click", () => {
        const name = modalInput.value.trim();
        if (!name) return;

        if (isAddingDevice) {
            if (!devices[currentRoom]) devices[currentRoom] = [];
            console.log("Adding Device - Name:", name, "Room:", currentRoom);
            devices[currentRoom].push({ name, state: false });
        } else {
            if (!rooms.includes(name)) {
                rooms.push(name);
                updateRoomDropdown();
            }
        }
        saveDevices();
        modal.style.display = "none";
        modalInput.value = "";
        renderDevices();
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeSidebarBtn.addEventListener("click", () => {
        sidebar.style.display = "none";
    });

    deleteRoomBtn.addEventListener("click", () => {
        if (rooms.length > 1) {
            rooms = rooms.filter(room => room !== currentRoom);
            delete devices[currentRoom];
            currentRoom = rooms[0];
            saveDevices();
            updateRoomDropdown();
            renderDevices();
            roomTitle.textContent = currentRoom;
        } else {
            alert("At least one room must exist!");
        }
    });

    function saveDevices() {
        localStorage.setItem("devices", JSON.stringify(devices));
        localStorage.setItem("rooms", JSON.stringify(rooms));
    }

    function setupScheduleChecker() {
        setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            const deviceSchedules = JSON.parse(localStorage.getItem('deviceSchedules')) || {};
            const currentRoom = localStorage.getItem('currentRoom');
    
            console.log('⏰ Checking schedules at:', currentTime);
            console.log('🗂️ Device schedules:', deviceSchedules);
    
            if (deviceSchedules[currentRoom]) {
                deviceSchedules[currentRoom].forEach(schedule => {
                    if (schedule.turnOnTime === currentTime || schedule.turnOffTime === currentTime) {
                        const devices = JSON.parse(localStorage.getItem('devices')) || {};
                        const roomDevices = devices[currentRoom] || [];
    
                        const device = roomDevices.find(d => d.name === schedule.deviceName);
                        if (device) {
                            if (schedule.turnOnTime === currentTime) {
                                device.state = true;
                                console.log(`✅ Turning ON: ${schedule.deviceName}`);
                            }
                            if (schedule.turnOffTime === currentTime) {
                                device.state = false;
                                console.log(`🛑 Turning OFF: ${schedule.deviceName}`);
                            }
                            localStorage.setItem('devices', JSON.stringify(devices));
                            renderDevices(); // Refresh UI
                        }
                    }
                });
            }
        }, 60000); // every minute
    }
    
    function checkSchedulesNow() {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        const deviceSchedules = JSON.parse(localStorage.getItem('deviceSchedules')) || {};
        const currentRoom = localStorage.getItem('currentRoom');
        
        console.log('⏰ Immediate check at:', currentTime);
        if (deviceSchedules[currentRoom]) {
            deviceSchedules[currentRoom].forEach(schedule => {
                if (schedule.turnOnTime === currentTime || schedule.turnOffTime === currentTime) {
                    const devices = JSON.parse(localStorage.getItem('devices')) || {};
                    const roomDevices = devices[currentRoom] || [];
                    
                    const device = roomDevices.find(d => d.name === schedule.deviceName);
                    if (device) {
                        if (schedule.turnOnTime === currentTime) {
                            device.state = true;
                            console.log(`✅ Turning ON: ${schedule.deviceName}`);
                        }
                        if (schedule.turnOffTime === currentTime) {
                            device.state = false;
                            console.log(`🛑 Turning OFF: ${schedule.deviceName}`);
                        }
                        localStorage.setItem('devices', JSON.stringify(devices));
                        renderDevices(); // Refresh UI
                    }
                }
            });
        }
    }
    // Sync renderDevices with external changes (e.g. schedule.js auto toggle)
    window.addEventListener("storage", () => {
        renderDevices();
    });

    // Initialize
    roomTitle.textContent = currentRoom;
    updateRoomDropdown();
    renderDevices();
    setupScheduleChecker();
    checkSchedulesNow();
});

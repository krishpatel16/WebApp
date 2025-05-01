function safeRefreshNotifications() {
    if (typeof refreshNotifications === "function") {
        refreshNotifications();
    } else {
        console.log("📭 refreshNotifications not available (maybe not on notifications page).");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const scheduleModal = document.getElementById("schedule-modal"); // Target the actual modal element
    const closeScheduleBtn = document.getElementById("close-schedule-modal");
    const saveScheduleBtn = document.getElementById("save-schedule-btn");
    
    if (closeScheduleBtn) {
        closeScheduleBtn.addEventListener("click", () => {
            // Close the modal by setting display style to "none"
            scheduleModal.style.display = "none";
            console.log("✅ Closed schedule modal.");
        });
    } else {
        console.warn("❌ Close button for schedule modal not found.");
    }

    if (saveScheduleBtn) {
        saveScheduleBtn.addEventListener("click", function() {
            const deviceName = document.getElementById("schedule-device-name").textContent;
            const turnOnTime = document.getElementById("turnOnTime").value;
            const turnOffTime = document.getElementById("turnOffTime").value;
            const currentRoom = document.getElementById("currentRoom")?.textContent || "Living Room";

            
    
            if (!turnOnTime || !turnOffTime) {
                alert("Please select both Turn On and Turn Off time.");
                return;
            }
    
            const deviceSchedules = JSON.parse(localStorage.getItem("deviceSchedules")) || {};
            deviceSchedules.deviceName = deviceName;
            if (!deviceSchedules[currentRoom]) {
                deviceSchedules[currentRoom] = [];
            }

            const existingScheduleIndex = deviceSchedules[currentRoom].findIndex(schedule => schedule.deviceName === deviceName);
            
            if (existingScheduleIndex !== -1) {
                deviceSchedules[currentRoom][existingScheduleIndex] = { deviceName, turnOnTime, turnOffTime};
            } else {
                deviceSchedules[currentRoom].push({ deviceName, turnOnTime, turnOffTime });
            }

            localStorage.setItem("deviceSchedules", JSON.stringify(deviceSchedules));
            console.log("✅ Schedule saved:", deviceSchedules);
            alert('Schedule Saved Successfully!');
            
            // Close the modal after saving the schedule
            scheduleModal.style.display = "none";
            addNotification(`Schedule set for "${deviceName}" in "${currentRoom}" {ON: ${turnOnTime || "--"}, OFF: ${turnOffTime || "--"}}`);
            
            // Immediately update the UI to reflect scheduled state
            if (typeof renderDevices === "function") {
                renderDevices();
            }
        });
    } else {
        console.warn("❌ Save button for schedule modal not found.");
    }
});

function addNotification(message) {
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    const timestamp = new Date().toLocaleString();

    const exists = notifications.some(n => n.message === message && n.timestamp.startsWith(timestamp.slice(0, 16)));
    if (exists) return;

    notifications.push({ message, timestamp });
    localStorage.setItem("notifications", JSON.stringify(notifications));
    safeRefreshNotifications();
}

function logDeviceUsage(deviceName, room, action, timestamp) {
    const logs = JSON.parse(localStorage.getItem("deviceUsageLogs")) || [];
    logs.push({
        device: deviceName,
        room: room,
        action: action,
        timestamp: timestamp
    });
    localStorage.setItem("deviceUsageLogs", JSON.stringify(logs));
    window.dispatchEvent(new Event('deviceUsageUpdated'));
}

// Check every minute for scheduled tasks
// Replace the setInterval section with this:
setInterval(() => {
    const schedules = JSON.parse(localStorage.getItem("deviceSchedules")) || {};
    const devices = JSON.parse(localStorage.getItem("devices")) || {};
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"
    let devicesChanged = false;

    for (const room in schedules) {
        if (!devices[room]) continue;

        schedules[room].forEach((schedule) => {
            const { deviceName, turnOnTime, turnOffTime } = schedule;
            const device = devices[room].find(d => d.name === deviceName);
            if (!device) return;
            
            // Track last action time to avoid repeat triggering
            if (!schedule.lastAction) schedule.lastAction = "";

            // Turn ON
            if (turnOnTime && currentTime === turnOnTime && schedule.lastAction !== `on-${currentTime}`) {
                if (!device.state) {
                    device.state = true;
                    schedule.lastAction = `on-${currentTime}`;
                    addNotification(`Auto Turned ON "${deviceName}" in "${room}" as scheduled.`);
                    logDeviceUsage(deviceName, room, "Scheduled On", new Date().toLocaleString());
                    devicesChanged = true;
                }
            }

            // Turn OFF
            if (turnOffTime && currentTime === turnOffTime && schedule.lastAction !== `off-${currentTime}`) {
                if (device.state) {
                    device.state = false;
                    schedule.lastAction = `off-${currentTime}`;
                    addNotification(`Auto Turned OFF "${deviceName}" in "${room}" as scheduled.`);
                    logDeviceUsage(deviceName, room, "Scheduled Off", new Date().toLocaleString());
                    devicesChanged = true;
                }
            }
        });
    }

    if (devicesChanged) {
        localStorage.setItem("devices", JSON.stringify(devices));
        // Trigger UI update without page reload
        if (typeof renderDevices === "function") {
            renderDevices();
        }
        // Also dispatch storage event for other tabs
        window.dispatchEvent(new Event('storage'));
    }
}, 60000); // every 60 seconds

// Force first check on page load (within a second)
setTimeout(() => {
    window.dispatchEvent(new Event("storage"));
}, 1000);


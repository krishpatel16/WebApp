document.addEventListener('DOMContentLoaded', function () {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    loadNotifications();

    document.getElementById('clearAllBtn').addEventListener('click', () => {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <p>Are you sure you want to clear All Notifications ?</p>
                <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                    <button id="confirmClearAll" class="modal-btn confirm-btn">OK</button>
                    <button id="cancelClearAll" class="modal-btn cancel-btn">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = "block";
    
        document.getElementById("cancelClearAll").onclick = () => {
            modal.remove();
        };
    
        document.getElementById("confirmClearAll").onclick = () => {
            localStorage.removeItem('deviceUsageLogs');
            loadNotifications();
            modal.remove();
            window.dispatchEvent(new Event("deviceLogUpdated"));
        };
    });
    window.addEventListener('deviceLogUpdated', loadNotifications);
});

function loadNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;

    notificationsList.innerHTML = '';

    const deviceLogs = JSON.parse(localStorage.getItem('deviceUsageLogs')) || [];

    if (deviceLogs.length === 0) {
        notificationsList.innerHTML = `
            <div class="empty-state">
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No Notifications" class="empty-icon">
                <p>No notifications to show.</p>
            </div>
        `;
        return;
    }

    // Group logs by device and room
    const groupedLogs = {};
    deviceLogs.forEach(log => {
        const key = `${log.device}-${log.room}`;
        if (!groupedLogs[key]) {
            groupedLogs[key] = [];
        }
        groupedLogs[key].push(log);
    });

    // Get the last 50 device-room combinations
    const recentKeys = Object.keys(groupedLogs).slice(-50).reverse();

    recentKeys.forEach(key => {
        const logs = groupedLogs[key];
        const device = logs[0].device;
        const room = logs[0].room;
        
        // Sort logs by timestamp (newest first)
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';

        const messageDiv = document.createElement('div');
        messageDiv.className = 'notification-message';

        // Find the most recent on/off pair
        let lastOn = null;
        let lastOff = null;
        logs.forEach(log => {
            if (log.action === 'Turned On' && !lastOn) {
                lastOn = log.timestamp;
            } else if (log.action === 'Turned Off' && !lastOff) {
                lastOff = log.timestamp;
            }
        });

        let message = `<strong>Device "${device}" in "${room}"</strong><br>`;
        if (lastOn) {
            message += `Turned On: ${formatTimestamp(lastOn)}<br>`;
        }
        if (lastOff) {
            message += `Turned Off: ${formatTimestamp(lastOff)}`;
        }

        messageDiv.innerHTML = message;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'notification-delete-btn';
        deleteBtn.title = 'Delete Notification';
        deleteBtn.textContent = '✖';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Delete all logs for this device-room combination
            deleteDeviceLogs(device, room);
        });

        notificationItem.appendChild(messageDiv);
        notificationItem.appendChild(deleteBtn);
        notificationsList.appendChild(notificationItem);
    });
}

function deleteDeviceLogs(device, room) {
    const deviceLogs = JSON.parse(localStorage.getItem('deviceUsageLogs')) || [];
    const updatedLogs = deviceLogs.filter(log => 
        !(log.device === device && log.room === room)
    );
    localStorage.setItem('deviceUsageLogs', JSON.stringify(updatedLogs));
    loadNotifications();
}

function formatTimestamp(isoString) {
    if (!isoString) return "Unknown Time";
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}




// document.addEventListener('DOMContentLoaded', function () {
//     const notificationsList = document.getElementById('notificationsList');
//     if (!notificationsList) return;
//     loadNotifications();

//     document.getElementById('clearAllBtn').addEventListener('click', () => {
//         if (confirm('Are you sure you want to clear all notifications?')) {
//             localStorage.removeItem('notifications');
//             loadNotifications();
//         }
//     });
// });

// function loadNotifications() {
//     const notificationsList = document.getElementById('notificationsList');
//     if (!notificationsList) return;

//     notificationsList.innerHTML = '';

//     const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

//     if (notifications.length === 0) {
//         notificationsList.innerHTML = `
//         <div class="empty-state">
//                 <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No Notifications" class="empty-icon">
//                 <p>No notifications to show.</p>
//             </div>
//         `;
//         return;
//     }

//     notifications.forEach((notification, index) => {
//         const notificationElement = document.createElement('div');
//         notificationElement.className = 'notification-item';

//         const messageSpan = document.createElement('span');
//         messageSpan.textContent = notification.message;
    
//         const deleteBtn = document.createElement('button');
//         deleteBtn.className = 'notification-delete-btn';
//         deleteBtn.title = 'Delete Notification';
//         deleteBtn.textContent = '✖';
//         deleteBtn.addEventListener('click', () => {
//             deleteNotification(index);
//         });

//         notificationElement.appendChild(messageSpan);
//         notificationElement.appendChild(deleteBtn);
//         notificationsList.appendChild(notificationElement);
//     });
// }

// function deleteNotification(index) {
//     const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
//     notifications.splice(index, 1);
//     localStorage.setItem('notifications', JSON.stringify(notifications));
//     loadNotifications();
// }
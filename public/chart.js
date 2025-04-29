document.addEventListener('DOMContentLoaded', function () {
    const powerChartEl = document.getElementById('powerChart');
    const usageTable = document.getElementById('usageHistoryTable');
    if (!powerChartEl || !usageTable) {
        console.log("Not on charts page - skipping initialization");
        return;
    }
    console.log("📈 Charts page loaded");

    const role = localStorage.getItem('userRole');
    if (!role) {
        window.location.href = 'login.html';
        return;
    }
    if (role === 'Guest') {
        const mainContent = document.querySelector('main');
        if (mainContent) mainContent.style.display = 'none';

        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <p>Guests do not have access to usage charts.</p>
                <div style="display: flex; justify-content: space-between; margin-top: 15px;">
                    <button id="guest-ok-btn">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = "flex";

        document.getElementById("guest-ok-btn").onclick = () => {
            modal.remove();
            window.location.href = 'index.html';
        };
        return; // prevent further script execution for guests
    }

    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("startDate").value = today;
    document.getElementById("endDate").value = today;
    loadDeviceLogs();

    // Listen for updates
    window.addEventListener('deviceLogUpdated', function () {
        console.log("🎯 deviceLogUpdated event caught by charts page");
        loadDeviceLogs();
    });

    document.getElementById("startDate").addEventListener("change", loadDeviceLogs);
    document.getElementById("endDate").addEventListener("change", loadDeviceLogs);
});

// Load and display logs based on date filters
function loadDeviceLogs() {
    console.group("📋 Loading Device Logs");

    let logs = JSON.parse(localStorage.getItem("deviceUsageLogs")) || [];

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate || endDate) {
        logs = logs.filter(log => {
            const logDate = new Date(log.timestamp);
            if (startDate && logDate < new Date(startDate)) return false;
            if (endDate && logDate > new Date(endDate + "T23:59:59")) return false;
            return true;
        });
    }

    const tableBody = document.querySelector("#usageHistoryTable tbody");
    tableBody.innerHTML = '';

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    logs.forEach(log => {
        const row = document.createElement('tr');
        const logDate = new Date(log.timestamp);
        const formattedDate = `${String(logDate.getDate()).padStart(2, '0')}-${String(logDate.getMonth() + 1).padStart(2, '0')}-${logDate.getFullYear()}`;
        const formattedTime = logDate.toLocaleTimeString();

        row.innerHTML = `
            <td>${log.device}</td>
            <td>${log.room}</td>
            <td>${log.action}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
        `;
        tableBody.appendChild(row);
    });

    console.log("✅ Table updated successfully");
    console.groupEnd();

    updatePowerConsumptionChart(logs);
    updateBillEstimation(logs);
}

// Chart display
function updatePowerConsumptionChart(logs) {
    if (!logs || !Array.isArray(logs)) {
        console.warn("🚫 No logs to render chart.");
        return;
    }

    const ctx = document.getElementById('powerChart').getContext('2d');
    const deviceUsage = {};

    logs.forEach(log => {
        if (!deviceUsage[log.device]) {
            deviceUsage[log.device] = {
                room: log.room,
                onTime: 0,
                lastState: null,
                lastTimestamp: null
            };
        }

        if (log.action.includes('On')) {
            deviceUsage[log.device].lastState = 'On';
            deviceUsage[log.device].lastTimestamp = new Date(log.timestamp);
        } else if (log.action.includes('Off') && deviceUsage[log.device].lastState === 'On') {
            const duration = (new Date(log.timestamp) - deviceUsage[log.device].lastTimestamp) / (1000 * 60 * 60);
            deviceUsage[log.device].onTime += duration;
            deviceUsage[log.device].lastState = 'Off';
        }
    });

    const labels = Object.keys(deviceUsage).map(device => `${device} (${deviceUsage[device].room})`);
    const data = Object.values(deviceUsage).map(usage => usage.onTime * 0.1);

    if (window.powerChart && window.powerChart.data) {
        window.powerChart.data.labels = labels;
        window.powerChart.data.datasets[0].data = data;
        window.powerChart.update();
    } else {
        window.powerChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Power Usage (kWh)',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }]
            }
        });
    }
}

// Estimated bill
function updateBillEstimation(logs) {
    const totalKwh = logs.reduce((total, log) => {
        return total + (log.action.includes('On') ? 0.1 : 0);
    }, 0);

    document.getElementById('bill-estimation').textContent =
        `Estimated Monthly Bill: $${(totalKwh * 5).toFixed(2)} (${totalKwh.toFixed(2)} kWh)`;
}

// Export to PDF (filtered)
document.getElementById("exportPDFBtn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Device Usage History", 14, 16);

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    let logs = JSON.parse(localStorage.getItem("deviceUsageLogs")) || [];

    if (startDate || endDate) {
        logs = logs.filter(log => {
            const logDate = new Date(log.timestamp);
            if (startDate && logDate < new Date(startDate)) return false;
            if (endDate && logDate > new Date(endDate + "T23:59:59")) return false;
            return true;
        });
    }

    const rows = logs.map(log => {
        const logDate = new Date(log.timestamp);
        const formattedDate = `${String(logDate.getDate()).padStart(2, '0')}-${String(logDate.getMonth() + 1).padStart(2, '0')}-${logDate.getFullYear()}`;
        const formattedTime = logDate.toLocaleTimeString();
        return [log.device, log.room, log.action, formattedDate, formattedTime];
    });

    doc.autoTable({
        head: [["Device", "Room", "Action", "Date", "Time"]],
        body: rows,
        startY: 20
    });

    doc.save("Device_Usage_History.pdf");
});

// Delete logs confirmation modal
document.getElementById("deleteLogsBtn").addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <p>Are you sure you want to delete logs within the selected date range?</p>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <button id="confirmDelete">OK</button>
                <button id="cancelDelete">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "block";

    document.getElementById("cancelDelete").onclick = () => {
        modal.remove();
    };

    document.getElementById("confirmDelete").onclick = () => {
        let logs = JSON.parse(localStorage.getItem("deviceUsageLogs")) || [];

        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        const filteredLogs = logs.filter(log => {
            const logDate = new Date(log.timestamp);
            if (startDate && logDate >= new Date(startDate) &&
                endDate && logDate <= new Date(endDate + "T23:59:59")) {
                return false;
            }
            return true;
        });

        localStorage.setItem("deviceUsageLogs", JSON.stringify(filteredLogs));
        console.log("🗑️ Deleted logs in range. Remaining logs:", filteredLogs);

        window.dispatchEvent(new Event("deviceLogUpdated"));
        modal.remove();
    };
});


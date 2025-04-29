document.addEventListener('DOMContentLoaded', () => {
    const roleForm = document.getElementById('role-form');
    const roleSelect = document.getElementById('role');
    const usernameInput = document.getElementById('username');
    const loginError = document.getElementById('login-error');
    const usageHistoryTableBody = document.querySelector('#usageHistoryTable tbody');
    const exportPDFBtn = document.getElementById('exportPDFBtn');
    const deleteLogsBtn = document.getElementById('deleteLogsBtn');
    const filterLogsBtn = document.getElementById('filterLogsBtn');

    roleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedRole = roleSelect.value.trim();
        const username = usernameInput.value.trim();

        if (!selectedRole || !username) {
            loginError.textContent = 'Please fill in all fields.';
            return;
        }

        // Save role in localStorage
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('username', username);
        logLoginActivity(username, selectedRole);

        // Redirect to home page
        window.location.href = 'index.html';
    });

    function logLoginActivity(username, role) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;  // DD-MM-YYYY format
        
        // Format time as 12-hour format with AM/PM (HH:MM:SS AM/PM)
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
        activities.unshift({
            username,
            role,
            date: formattedDate,
            time: formattedTime
        });
        localStorage.setItem('loginActivities', JSON.stringify(activities));
        loadLoginHistory(); // Refresh table
    }

    function loadLoginHistory() {
        const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
        usageHistoryTableBody.innerHTML = '';

        activities.forEach(activity => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${activity.username}</td>
                <td>${activity.role}</td>
                <td>${activity.date}</td>
                <td>${activity.time}</td>
            `;
            usageHistoryTableBody.appendChild(tr);
        });
    }

    function exportTableToPDF() {
        const table = document.getElementById('usageHistoryTable');
        const newWin = window.open("");
        newWin.document.write('<html><head><title>Login Activity Report</title></head><body>');
        newWin.document.write(table.outerHTML);
        newWin.document.write('</body></html>');
        newWin.document.close();
        newWin.print();
    }

    function parseDateString(dateStr) {
        // Convert from DD-MM-YYYY to Date object
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    function filterLogs() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
        const filterUsername = document.getElementById('filterUsername') ? document.getElementById('filterUsername').value.trim().toLowerCase() : '';

        usageHistoryTableBody.innerHTML = '';

        const filtered = activities.filter(activity => {
            const activityDate = parseDateString(activity.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            const usernameMatch = filterUsername ? activity.username.toLowerCase().includes(filterUsername) : true;
            
            if (start && activityDate < start) return false;
            if (end && activityDate > end) return false;
            if (!usernameMatch) return false;
            return true;
        });

        filtered.forEach(activity => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${activity.username}</td>
                <td>${activity.role}</td>
                <td>${activity.date}</td>
                <td>${activity.time}</td>
            `;
            usageHistoryTableBody.appendChild(tr);
        });
    }

    // Delete logs with modal confirmation
    deleteLogsBtn.addEventListener('click', () => {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <p>Are you sure you want to delete the filtered login logs?</p>
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
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const filterUsername = document.getElementById('filterUsername').value.trim().toLowerCase();
            
            let activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
            
            // Keep only logs that DON'T match the filter criteria
            const remainingActivities = activities.filter(activity => {
                const activityDate = parseDateString(activity.date);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate + "T23:59:59") : null;
                const usernameMatch = filterUsername ? activity.username.toLowerCase().includes(filterUsername) : false;
                
                // Check if the log should be deleted (return false to exclude it)
                const dateInRange = startDate && endDate 
                    ? (activityDate >= start && activityDate <= end)
                    : false;
                
                const shouldDelete = 
                    (startDate && endDate && dateInRange) || 
                    (filterUsername && usernameMatch);
                
                return !shouldDelete;
            });
        
            localStorage.setItem('loginActivities', JSON.stringify(remainingActivities));
            loadLoginHistory();
            modal.remove();
        };
    });

    // Event Listeners
    exportPDFBtn.addEventListener('click', exportTableToPDF);
    filterLogsBtn.addEventListener('click', filterLogs);

    loadLoginHistory();
});
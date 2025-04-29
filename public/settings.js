document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const userRole = localStorage.getItem("userRole"); // Should be set at login
  
    // Load previously selected theme
    if (localStorage.getItem("darkMode") === "true") {
      body.classList.add("dark-mode");
      darkModeToggle.checked = true;
    }
  
    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });
  
    document.getElementById("profile-btn").addEventListener("click", () => {
      alert("Profile settings would appear here (to be implemented).");
    });
  
    document.getElementById("logout-btn").addEventListener("click", () => {
      alert("Logging out... (you can implement session clearing here)");
      localStorage.clear();
      // Redirect to login page if needed
      window.location.href = "login.html";
    });

    // Manage Users - Only for Admin
  if (userRole === "Admin") {
    document.getElementById("manage-users-card").style.display = "block";
    setupPermissionsTable();
  }

  function setupPermissionsTable() {
    const features = [
      "View Devices",
      "Control Devices",
      "Add/Remove Devices",
      "Schedule Devices",
      "View Usage History / Charts",
      "Voice Control",
      "Manage Users (Add/Delete)",
      "View Notifications",
      "Modify Settings (Theme etc.)"
    ];

    const tableBody = document.getElementById("permissions-table-body");

    // Load existing or default permissions
    const permissions = JSON.parse(localStorage.getItem("rolePermissions")) || {
      Admin: features.map(() => true),
      "Family Member": [true, true, false, true, true, true, false, true, true],
      Guest: [true, true, false, false, false, false, false, true, false],
    };

    tableBody.innerHTML = "";

    features.forEach((feature, index) => {
      const row = document.createElement("tr");
      const featureCell = document.createElement("td");
      featureCell.textContent = feature;
      row.appendChild(featureCell);

      ["Admin", "Family Member", "Guest"].forEach(role => {
        const cell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = permissions[role][index];
        checkbox.dataset.role = role;
        checkbox.dataset.index = index;
        cell.appendChild(checkbox);
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });

    document.getElementById("save-permissions-btn").addEventListener("click", () => {
      const updated = {
        Admin: [],
        "Family Member": [],
        Guest: []
      };

      document.querySelectorAll("#permissions-table-body input[type='checkbox']").forEach(input => {
        updated[input.dataset.role][input.dataset.index] = input.checked;
      });

      localStorage.setItem("rolePermissions", JSON.stringify(updated));
      
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
          <div class="modal-content">
              <p>Permission Updated.</p>
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
    });
  }
});
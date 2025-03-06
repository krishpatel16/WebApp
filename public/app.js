document.addEventListener("DOMContentLoaded", () => {
    const roomList = document.getElementById("room-list");
    const roomTitle = document.getElementById("room-title");
    const addRoomBtn = document.getElementById("add-room-btn");
    const addDeviceBtn = document.getElementById("add-device-btn");
    const deviceList = document.getElementById("device-list");
    const modal = document.getElementById("add-modal");
    const applyBtn = document.getElementById("apply-btn");
    const itemName = document.getElementById("item-name");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const sidebar = document.getElementById("sidebar");
    const closeSidebarBtn = document.getElementById("close-btn");
    const deleteRoomBtn = document.getElementById("delete-room-btn");


    let currentRoom = "Living Room";
    let isAddingDevice = false;

    let rooms = JSON.parse(localStorage.getItem("rooms")) || ["Living Room", "Bedroom", "Bathroom"];
    let devices = JSON.parse(localStorage.getItem("devices")) || {};

    function renderRooms() {
        roomList.innerHTML = "";
        rooms.forEach(room => {
            let roomTab = document.createElement("span");
            roomTab.classList.add("room-tab");
            roomTab.textContent = room;
            roomTab.dataset.room = room;
            roomTab.addEventListener("click", () => {
                currentRoom = room;
                roomTitle.textContent = currentRoom;
                renderDevices();
            });
            roomList.appendChild(roomTab);
        });
        roomList.appendChild(hamburgerMenu);
    }

function renderDevices() {
    deviceList.innerHTML = "";
    if (!devices[currentRoom]) devices[currentRoom] = [];

    devices[currentRoom].forEach((device, index) => {
        const deviceDiv = document.createElement("div");
        deviceDiv.classList.add("device");

        // Create elements for each column
        const nameSpan = document.createElement("span");
        nameSpan.textContent = device.name;

        const statusSpan = document.createElement("span");
        statusSpan.textContent = device.state ? "On" : "Off";

        const actionDiv = document.createElement("div"); // Action container
        actionDiv.style.display = "flex";
        actionDiv.style.justifyContent = "center";
        actionDiv.style.gap = "10px";

        // Toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggle-btn");
        if (device.state) {
            toggleBtn.classList.add("active");
            toggleBtn.textContent = "Turn Off";
        } else {
            toggleBtn.textContent = "Turn On";
        }
        toggleBtn.addEventListener("click", () => {
            devices[currentRoom][index].state = !devices[currentRoom][index].state;
            saveDevices();
            renderDevices();
        });

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            devices[currentRoom].splice(index, 1);
            saveDevices();
            renderDevices();
        });

        // Append buttons to action div
        actionDiv.appendChild(toggleBtn);
        actionDiv.appendChild(removeBtn);

        // Append elements to device div
        deviceDiv.appendChild(nameSpan);
        deviceDiv.appendChild(statusSpan);
        deviceDiv.appendChild(actionDiv);

        deviceList.appendChild(deviceDiv);
    });

    saveDevices();
}


    addRoomBtn.addEventListener("click", () => {
        isAddingDevice = false;
        modal.style.display = "block";
    });

    addDeviceBtn.addEventListener("click", () => {
        isAddingDevice = true;
        modal.style.display = "block";
    });

    applyBtn.addEventListener("click", () => {
        if (itemName.value.trim() === "") return;

        if (isAddingDevice) {
            if (!devices[currentRoom]) devices[currentRoom] = [];
            devices[currentRoom].push({ name: itemName.value, state: false });
        } else {
            rooms.push(itemName.value);
        }
        saveDevices();
        modal.style.display = "none";
        itemName.value = "";
        renderDevices();
        renderRooms();
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
            delete devices[currentRoom]; // Remove associated devices
            currentRoom = rooms[0]; // Set to first remaining room
            saveDevices();
            renderRooms();
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

    renderRooms();
    renderDevices();
});


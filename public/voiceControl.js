// voiceControl.js

// Device and room data should ideally be passed/shared from app.js. For demo, we'll hardcode sample names.
const availableRooms = ['Living room', 'Kitchen', 'Bedroom'];
const availableDevices = ['LED', 'Fan', 'Bulb', 'Light'];

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

let isListening = false;

// Call this to start voice recognition
function startVoiceControl() {
    if (isListening) return;
    recognition.start();
    isListening = true;
    updateVoiceButton('listening'); // ✅
    console.log("Voice control activated...");
}

recognition.onend = function () {
    isListening = false;
    updateVoiceButton('idle'); // ✅
};

function handleVoiceCommand(command) {
    const turnOnMatch = command.match(/turn on (.+?)(?: of (.+))?/);
    const turnOffMatch = command.match(/turn off (.+?)(?: of (.+))?/);

    let action = '';
    let device = '';
    let room = '';

    if (turnOnMatch) {
        action = 'on';
        device = formatDeviceName(turnOnMatch[1]);
        room = formatRoomName(turnOnMatch[2]);
    } else if (turnOffMatch) {
        action = 'off';
        device = formatDeviceName(turnOffMatch[1]);
        room = formatRoomName(turnOffMatch[2]);
    } else {
        alert("Couldn't understand the command. Try again.");
        return;
    }

    // If room is not specified, assume the currently active tab/room
    if (!room) {
        const activeRoomElement = document.querySelector('.room-tab.active');
        room = activeRoomElement ? activeRoomElement.textContent.trim() : null;
    }

    if (!device || !room) {
        alert("Device or room not recognized.");
        return;
    }

    console.log(`Executing: Turn ${action} ${device} in ${room}`);

    // Find the corresponding device button on the page
    const deviceRow = Array.from(document.querySelectorAll('.device-row')).find(row => {
        const deviceName = row.querySelector('.device-name')?.textContent.trim().toLowerCase();
        const roomName = row.getAttribute('data-room')?.toLowerCase();
        return deviceName === device.toLowerCase() && roomName === room.toLowerCase();
    });

    if (deviceRow) {
        const actionBtn = deviceRow.querySelector(`.turn-${action}-btn`);
        if (actionBtn) {
            actionBtn.click(); // Trigger the existing turn on/off logic
        } else {
            alert(`Button for turning ${action} ${device} in ${room} not found.`);
        }
    } else {
        alert(`Device "${device}" in "${room}" not found.`);
    }
}

// Helper to format device name
function formatDeviceName(name) {
    if (!name) return null;
    return availableDevices.find(d => name.includes(d.toLowerCase())) || name;
}

// Helper to format room name
function formatRoomName(name) {
    if (!name) return null;
    return availableRooms.find(r => name.includes(r.toLowerCase())) || name;
}

// Attach voice control to the button with ID 'voice-control-btn'
document.addEventListener('DOMContentLoaded', () => {
    const voiceBtn = document.getElementById('voice-control-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            startVoiceControl();
        });
    }
});

function updateVoiceButton(state) {
    const btn = document.getElementById('voice-control-btn');
    if (!btn) return;

    if (state === 'listening') {
        btn.textContent = '🔴 Listening...';
        btn.classList.remove('idle');
        btn.classList.add('listening');
    } else {
        btn.textContent = '🎤 Voice Command';
        btn.classList.remove('listening');
        btn.classList.add('idle');
    }
}



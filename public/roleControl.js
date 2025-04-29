// roleControl.js

document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('userRole');

    if (!role) {
        alert("You must select a role first.");
        window.location.href = 'login.html';
        return;
    }

    // Apply restrictions based on role
    applyRoleAccess(role);
});

function applyRoleAccess(role) {
    if (role === 'Guest') {
        hideElementById('settings-link');
        hideElementById('charts-link');
        // You can also disable buttons or sections if needed
    } else if (role === 'Family') {
        hideElementById('settings-link'); // Family can't access Settings
    }
    // Admin has full access, no restrictions
}

function hideElementById(id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'none';
    }
}

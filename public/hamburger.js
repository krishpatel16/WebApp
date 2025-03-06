document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const sidebar = document.getElementById("sidebar");
    const closeSidebarBtn = document.getElementById("close-btn");

    // Open sidebar when hamburger menu is clicked
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", () => {
            sidebar.style.display = "block";
        });
    }

    // Close sidebar when close button is clicked
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", () => {
            sidebar.style.display = "none";
        });
    }
});
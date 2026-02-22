// --- Navigation Logic ---
window.switchView = function(viewId, menuId, element) {
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => view.classList.remove('active-view'));
    const target = document.getElementById('view-' + viewId);
    if (target) target.classList.add('active-view');

    const menuItems = document.querySelectorAll('.sidebar ul li');
    menuItems.forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');
}

window.toggleSidebar = function() {
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('active-sidebar');
    overlay.classList.toggle('active');
}

// --- Backend Connection Logic ---
async function loadDashboardData() {
    try {
        const response = await fetch('http://localhost:3000/api/user/stats');
        const data = await response.json();

        document.getElementById('val-calories').innerHTML = `${data.calories} <span class="unit">kcal</span>`;
        document.getElementById('val-steps').innerHTML = `${data.steps} <span class="unit">/ 10k</span>`;
        document.getElementById('val-sleep').innerHTML = `${data.sleep} <span class="unit">hours</span>`;

        console.log("Live data synced!");
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadDashboardData);

// Run the load function when the page opens
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    console.log("CoreCrafters 2.0 Loaded");
});
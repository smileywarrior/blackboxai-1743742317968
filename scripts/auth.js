// Dummy user data (will be moved to data.js later)
const dummyUser = {
    username: "demo_user",
    password: "demo123"
};

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('errorMessage');
    
    if (username === dummyUser.username && password === dummyUser.password) {
        // Store user session
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorElement.textContent = 'Invalid username or password';
        errorElement.classList.remove('hidden');
    }
});

// Check if user is logged in when accessing dashboard
function checkAuth() {
    if (window.location.pathname.includes('dashboard.html')) {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'index.html';
        }
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Make logout function available globally
window.logout = logout;

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);
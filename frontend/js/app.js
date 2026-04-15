// Configuration - Auto-detect environment
const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://agrocarbon-api.onrender.com';

console.log('🌐 API URL:', API);

// Global variables
let authToken = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AgroCarbon AI Initialized");
    checkAuthState();
    setupEventListeners();
    
    if (authToken) {
        showUploadSection();
    }
});

function checkAuthState() {
    if (authToken && currentUser) {
        const userDisplay = document.getElementById('user-display');
        const userName = document.getElementById('user-name');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (userDisplay) userDisplay.style.display = 'inline';
        if (userName) userName.textContent = currentUser.name || currentUser.email;
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
    }
}

function setupEventListeners() {
    const imageInput = document.getElementById("image-input");
    if (imageInput) {
        imageInput.addEventListener("change", handleImageSelect);
    }
}

function handleImageSelect() {
    const file = this.files[0];
    if (!file) return;

    const preview = document.getElementById("image-preview");
    const placeholder = document.getElementById("upload-placeholder");
    const uploadBtn = document.getElementById("upload-btn");

    if (preview) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
    if (placeholder) placeholder.style.display = "none";
    if (uploadBtn) uploadBtn.disabled = false;
}

// ================= REGISTER =================
async function handleRegister() {
    const name = document.getElementById("reg-name")?.value.trim();
    const email = document.getElementById("reg-email")?.value.trim();
    const password = document.getElementById("reg-password")?.value;
    const latitude = document.getElementById("reg-lat")?.value;
    const longitude = document.getElementById("reg-lng")?.value;

    if (!name || !email || !password || !latitude || !longitude) {
        alert("Please fill all fields");
        return;
    }

    const data = { name, email, password, latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

    try {
        const response = await fetch(`${API}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert("Registration successful! Please login.");
            bootstrap.Modal.getInstance(document.getElementById("registerModal"))?.hide();
            document.getElementById("register-form").reset();
            setTimeout(() => new bootstrap.Modal(document.getElementById("loginModal")).show(), 500);
        } else {
            alert(result.message || "Registration failed");
        }
    } catch (error) {
        alert("Cannot connect to server");
    }
}

// ================= LOGIN =================
async function handleLogin() {
    const email = document.getElementById("login-email")?.value.trim();
    const password = document.getElementById("login-password")?.value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            authToken = result.token;
            currentUser = result.user;
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(currentUser));
            checkAuthState();
            bootstrap.Modal.getInstance(document.getElementById("loginModal"))?.hide();
            document.getElementById("login-form").reset();
            alert("Login successful!");
            showUploadSection();
        } else {
            alert(result.message || "Login failed");
        }
    } catch (error) {
        alert("Cannot connect to server");
    }
}

// ================= UPLOAD =================
async function uploadImage() {
    const file = document.getElementById("image-input")?.files[0];
    if (!file) { alert("Select an image"); return; }
    if (!authToken) { alert("Please login first"); return; }

    const formData = new FormData();
    formData.append("image", file);

    document.getElementById("loading-indicator").style.display = "block";
    document.getElementById("results-section").style.display = "none";

    try {
        const response = await fetch(`${API}/api/upload`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${authToken}` },
            body: formData
        });

        const result = await response.json();
        document.getElementById("loading-indicator").style.display = "none";

        if (result.success) {
            const data = result.data || result;
            document.getElementById("biomass-value").textContent = `${data.biomassEstimate?.value || 0} kg`;
            document.getElementById("confidence-value").textContent = `${((data.biomassEstimate?.confidence || 0.7) * 100).toFixed(1)}%`;
            document.getElementById("metadata-content").textContent = JSON.stringify(data, null, 2);
            document.getElementById("results-section").style.display = "block";
        } else {
            alert("Upload failed");
        }
    } catch (error) {
        document.getElementById("loading-indicator").style.display = "none";
        alert("Upload failed");
    }
}

function showUploadSection() {
    document.getElementById("home-section").style.display = "none";
    document.getElementById("upload-section").style.display = "block";
}

function showHomeSection() {
    document.getElementById("home-section").style.display = "block";
    document.getElementById("upload-section").style.display = "none";
}

function logout() {
    authToken = null; currentUser = null;
    localStorage.removeItem('token'); localStorage.removeItem('user');
    document.getElementById('user-display').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
    showHomeSection();
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                document.getElementById("reg-lat").value = pos.coords.latitude.toFixed(6);
                document.getElementById("reg-lng").value = pos.coords.longitude.toFixed(6);
            },
            () => alert("Could not get location")
        );
    }
}

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.uploadImage = uploadImage;
window.showUploadSection = showUploadSection;
window.showHomeSection = showHomeSection;
window.getCurrentLocation = getCurrentLocation;
window.logout = logout;

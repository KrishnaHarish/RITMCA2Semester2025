// Authentication management
class AuthManager {
    constructor() {
        this.token = localStorage.getItem('authToken');
        this.user = this.token ? JSON.parse(localStorage.getItem('user') || '{}') : null;
        this.updateUI();
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Login
    async login(identifier, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.data.user;
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateUI();
                this.showAlert('Login successful!', 'success');
                return true;
            } else {
                this.showAlert(data.message, 'danger');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showAlert('Login failed. Please try again.', 'danger');
            return false;
        }
    }

    // Register
    async register(userData) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.data.user;
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateUI();
                this.showAlert('Registration successful!', 'success');
                return true;
            } else {
                if (data.errors) {
                    this.showAlert(data.errors.join('<br>'), 'danger');
                } else {
                    this.showAlert(data.message, 'danger');
                }
                return false;
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showAlert('Registration failed. Please try again.', 'danger');
            return false;
        }
    }

    // Logout
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.updateUI();
        this.showAlert('Logged out successfully!', 'info');
    }

    // Update UI based on authentication status
    updateUI() {
        const navbarAuth = document.getElementById('navbar-auth');
        const createRecipeBtn = document.getElementById('create-recipe-btn');
        
        if (!navbarAuth) return;

        if (this.isAuthenticated()) {
            navbarAuth.innerHTML = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i>${this.user.firstName} ${this.user.lastName}
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/profile"><i class="fas fa-user me-2"></i>Profile</a></li>
                        <li><a class="dropdown-item" href="/create-recipe"><i class="fas fa-plus me-2"></i>Create Recipe</a></li>
                        <li><a class="dropdown-item" href="/recipes/favorites"><i class="fas fa-heart me-2"></i>Favorites</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="auth.logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                    </ul>
                </li>
            `;
            
            // Show create recipe button
            if (createRecipeBtn) {
                createRecipeBtn.style.display = 'inline-block';
            }
        } else {
            navbarAuth.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>
            `;
            
            // Hide create recipe button and redirect to login if clicked
            if (createRecipeBtn) {
                createRecipeBtn.onclick = (e) => {
                    e.preventDefault();
                    this.showAlert('Please login to create recipes', 'warning');
                    setTimeout(() => window.location.href = '/login', 1500);
                };
            }
        }
    }

    // Get authorization headers
    getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
    }

    // Make authenticated API request
    async apiRequest(url, options = {}) {
        if (this.isAuthenticated()) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${this.token}`
            };
        }

        const response = await fetch(url, options);
        
        // Handle unauthorized responses
        if (response.status === 401) {
            this.logout();
            this.showAlert('Session expired. Please login again.', 'warning');
            window.location.href = '/login';
            return null;
        }

        return response;
    }

    // Show alert message
    showAlert(message, type = 'info') {
        const alertContainer = document.getElementById('alert-container');
        if (!alertContainer) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        alertContainer.appendChild(alert);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

// Create global auth instance
const auth = new AuthManager();

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    auth.updateUI();
});
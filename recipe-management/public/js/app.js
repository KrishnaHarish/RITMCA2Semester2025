/**
 * Main JavaScript file for Recipe Management System
 * Handles common functionality across all pages
 */

// Global app configuration
const app = {
    apiBase: '/api',
    currentUser: null,
    
    // Initialize the application
    init() {
        this.setupAxiosDefaults();
        this.checkAuthStatus();
        this.setupEventListeners();
        this.updateNavigation();
    },
    
    // Configure Axios defaults
    setupAxiosDefaults() {
        axios.defaults.baseURL = this.apiBase;
        axios.defaults.withCredentials = true;
        
        // Add response interceptor for handling errors
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    const { status, data } = error.response;
                    
                    // Handle authentication errors
                    if (status === 401) {
                        this.currentUser = null;
                        this.updateNavigation();
                        
                        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                            this.showAlert('Please log in to continue', 'warning');
                        }
                    }
                    
                    // Handle validation errors
                    if (status === 400 && data.errors) {
                        const errorMessage = data.errors.map(err => err.message).join(', ');
                        this.showAlert(errorMessage, 'danger');
                    } else {
                        this.showAlert(data.message || 'An error occurred', 'danger');
                    }
                } else {
                    this.showAlert('Network error. Please check your connection.', 'danger');
                }
                
                return Promise.reject(error);
            }
        );
    },
    
    // Check if user is authenticated
    async checkAuthStatus() {
        try {
            const response = await axios.get('/auth/me');
            this.currentUser = response.data.data.user;
        } catch (error) {
            this.currentUser = null;
        }
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Handle form submissions with loading states
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (submitBtn && !form.classList.contains('no-loading')) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
                submitBtn.disabled = true;
                
                // Reset button after 5 seconds as fallback
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
        
        // Handle file input changes
        document.addEventListener('change', function(e) {
            if (e.target.type === 'file') {
                app.handleFileInput(e.target);
            }
        });
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + / for search
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    },
    
    // Update navigation based on authentication status
    updateNavigation() {
        const navbarAuth = document.getElementById('navbarAuth');
        if (!navbarAuth) return;
        
        if (this.currentUser) {
            navbarAuth.innerHTML = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i>
                        ${this.currentUser.username}
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/dashboard"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a></li>
                        <li><a class="dropdown-item" href="/profile"><i class="fas fa-user-edit me-2"></i>Profile</a></li>
                        <li><a class="dropdown-item" href="/recipes/my-recipes"><i class="fas fa-book me-2"></i>My Recipes</a></li>
                        <li><a class="dropdown-item" href="/recipes/favorites"><i class="fas fa-heart me-2"></i>Favorites</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="app.logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                    </ul>
                </li>
            `;
        } else {
            navbarAuth.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>
            `;
        }
    },
    
    // Show alert message
    showAlert(message, type = 'info', duration = 5000) {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) return;
        
        const alertId = 'alert-' + Date.now();
        const alertHTML = `
            <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas fa-${this.getAlertIcon(type)} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        alertContainer.insertAdjacentHTML('beforeend', alertHTML);
        
        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => {
                const alert = document.getElementById(alertId);
                if (alert) {
                    const bsAlert = new bootstrap.Alert(alert);
                    bsAlert.close();
                }
            }, duration);
        }
    },
    
    // Get icon for alert type
    getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle',
            primary: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },
    
    // Handle file input changes
    handleFileInput(input) {
        const file = input.files[0];
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showAlert('Please select an image file', 'warning');
            input.value = '';
            return;
        }
        
        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showAlert('File size must be less than 5MB', 'warning');
            input.value = '';
            return;
        }
        
        // Show preview if preview container exists
        const previewContainer = input.dataset.preview;
        if (previewContainer) {
            this.showImagePreview(file, previewContainer);
        }
    },
    
    // Show image preview
    showImagePreview(file, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            container.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="uploaded-image-preview img-fluid">
            `;
        };
        reader.readAsDataURL(file);
    },
    
    // Logout user
    async logout() {
        try {
            await axios.post('/auth/logout');
            this.currentUser = null;
            this.updateNavigation();
            this.showAlert('Logged out successfully', 'success');
            
            // Redirect to home page
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        } catch (error) {
            this.showAlert('Error logging out', 'danger');
        }
    },
    
    // Format date
    formatDate(dateString, format = 'short') {
        const date = new Date(dateString);
        
        switch (format) {
            case 'short':
                return date.toLocaleDateString();
            case 'long':
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            case 'relative':
                return this.getRelativeTime(date);
            default:
                return date.toLocaleDateString();
        }
    },
    
    // Get relative time
    getRelativeTime(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 }
        ];
        
        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
            }
        }
        
        return 'just now';
    },
    
    // Format duration
    formatDuration(minutes) {
        if (!minutes) return 'Not specified';
        
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours > 0 && mins > 0) {
            return `${hours}h ${mins}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${mins}m`;
        }
    },
    
    // Show loading overlay
    showLoading() {
        const overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'spinner-overlay';
        overlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    },
    
    // Hide loading overlay
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.remove();
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});

// Export app for global access
window.app = app;
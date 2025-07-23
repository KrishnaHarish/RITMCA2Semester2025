/**
 * Authentication related JavaScript for Recipe Management System
 * Handles login, registration, and user authentication
 */

const auth = {
    // Check if user is logged in
    isLoggedIn() {
        return app.currentUser !== null;
    },
    
    // Login user
    async login(credentials) {
        try {
            const response = await axios.post('/auth/login', credentials);
            
            if (response.data.success) {
                app.currentUser = response.data.data.user;
                app.updateNavigation();
                app.showAlert('Login successful!', 'success');
                return response.data;
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    
    // Register user
    async register(userData) {
        try {
            const response = await axios.post('/auth/register', userData);
            
            if (response.data.success) {
                app.currentUser = response.data.data.user;
                app.updateNavigation();
                app.showAlert('Registration successful! Welcome!', 'success');
                return response.data;
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    
    // Logout user
    async logout() {
        try {
            await axios.post('/auth/logout');
            app.currentUser = null;
            app.updateNavigation();
            app.showAlert('Logged out successfully', 'success');
            
            // Redirect to home if on protected page
            const protectedPaths = ['/dashboard', '/profile', '/recipes/create', '/recipes/my-recipes'];
            if (protectedPaths.some(path => window.location.pathname.startsWith(path))) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
            app.showAlert('Error logging out', 'danger');
        }
    },
    
    // Update profile
    async updateProfile(profileData) {
        try {
            const response = await axios.put('/auth/profile', profileData);
            
            if (response.data.success) {
                app.currentUser = { ...app.currentUser, ...response.data.data.user };
                app.updateNavigation();
                app.showAlert('Profile updated successfully', 'success');
                return response.data;
            }
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    },
    
    // Change password
    async changePassword(passwordData) {
        try {
            const response = await axios.put('/auth/password', passwordData);
            
            if (response.data.success) {
                app.showAlert('Password changed successfully', 'success');
                return response.data;
            }
        } catch (error) {
            console.error('Password change error:', error);
            throw error;
        }
    },
    
    // Validate password strength
    validatePassword(password) {
        const requirements = {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        const score = Object.values(requirements).filter(Boolean).length;
        
        return {
            isValid: requirements.length && requirements.uppercase && requirements.lowercase && requirements.number,
            score,
            strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
            requirements
        };
    }
};

// Export for global access
window.auth = auth;
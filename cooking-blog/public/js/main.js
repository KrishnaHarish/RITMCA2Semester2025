// Main application JavaScript

// Utility functions
const utils = {
    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Format time duration
    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    },

    // Generate star rating HTML
    generateStars(rating, maxStars = 5) {
        let starsHTML = '';
        for (let i = 1; i <= maxStars; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        return starsHTML;
    },

    // Truncate text
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },

    // Show loading spinner
    showLoading(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (container) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `;
        }
    },

    // Hide loading spinner
    hideLoading(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (container) {
            const spinner = container.querySelector('.spinner-border');
            if (spinner) {
                spinner.closest('.text-center').remove();
            }
        }
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Recipe management
const recipeManager = {
    // Get recipes with filters
    async getRecipes(filters = {}) {
        try {
            const params = new URLSearchParams(filters);
            const response = await fetch(`/api/recipes?${params}`);
            const data = await response.json();
            
            if (data.success) {
                return data.data.recipes;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            auth.showAlert('Failed to load recipes', 'danger');
            return [];
        }
    },

    // Get single recipe
    async getRecipe(id) {
        try {
            const response = await auth.apiRequest(`/api/recipes/${id}`);
            if (!response) return null;
            
            const data = await response.json();
            
            if (data.success) {
                return data.data.recipe;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            auth.showAlert('Failed to load recipe', 'danger');
            return null;
        }
    },

    // Create recipe card HTML
    createRecipeCard(recipe) {
        const difficultyClass = `difficulty-${recipe.difficulty.toLowerCase()}`;
        
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card recipe-card h-100">
                    <img src="${recipe.imageUrl || '/images/default-recipe.jpg'}" 
                         class="card-img-top" alt="${recipe.title}"
                         onerror="this.src='/images/default-recipe.jpg'">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${utils.truncateText(recipe.title, 50)}</h5>
                        <p class="card-text text-muted flex-grow-1">
                            ${utils.truncateText(recipe.description, 100)}
                        </p>
                        
                        <div class="recipe-meta mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="rating-stars">
                                    ${utils.generateStars(recipe.averageRating || 0)}
                                    <span class="ms-1">(${recipe.ratingsCount || 0})</span>
                                </div>
                                <span class="badge ${difficultyClass}">${recipe.difficulty}</span>
                            </div>
                            
                            <div class="d-flex justify-content-between text-muted small">
                                <span><i class="fas fa-clock"></i> ${utils.formatTime(recipe.totalTime)}</span>
                                <span><i class="fas fa-users"></i> ${recipe.servings}</span>
                                <span><i class="fas fa-eye"></i> ${recipe.views}</span>
                            </div>
                            
                            <div class="mt-2">
                                <span class="badge bg-secondary me-1">${recipe.category}</span>
                                <span class="badge bg-info">${recipe.cuisine}</span>
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                By ${recipe.author.firstName} ${recipe.author.lastName}
                            </small>
                            <a href="/recipes/${recipe._id}" class="btn btn-primary btn-sm">View Recipe</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Render recipes in container
    renderRecipes(recipes, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (recipes.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-4">
                    <i class="fas fa-utensils fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">No recipes found</h5>
                    <p class="text-muted">Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        container.innerHTML = recipes.map(recipe => this.createRecipeCard(recipe)).join('');
    },

    // Rate recipe
    async rateRecipe(recipeId, rating, comment = '') {
        try {
            const response = await auth.apiRequest(`/api/recipes/${recipeId}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating, comment })
            });

            if (!response) return false;

            const data = await response.json();
            
            if (data.success) {
                auth.showAlert('Recipe rated successfully!', 'success');
                return true;
            } else {
                auth.showAlert(data.message, 'danger');
                return false;
            }
        } catch (error) {
            console.error('Error rating recipe:', error);
            auth.showAlert('Failed to rate recipe', 'danger');
            return false;
        }
    },

    // Toggle favorite
    async toggleFavorite(recipeId) {
        try {
            const response = await auth.apiRequest(`/api/recipes/${recipeId}/favorite`, {
                method: 'POST'
            });

            if (!response) return false;

            const data = await response.json();
            
            if (data.success) {
                auth.showAlert(data.message, 'success');
                return data.data.isFavorited;
            } else {
                auth.showAlert(data.message, 'danger');
                return false;
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            auth.showAlert('Failed to update favorite', 'danger');
            return false;
        }
    }
};

// Search and filter functionality
const searchManager = {
    currentFilters: {},

    // Initialize search
    init() {
        this.setupEventListeners();
        this.loadFromURL();
    },

    // Setup event listeners
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', utils.debounce((e) => {
                this.updateFilter('search', e.target.value);
            }, 500));
        }

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                e.preventDefault();
                const filterType = e.target.dataset.filter;
                const filterValue = e.target.dataset.value;
                this.toggleFilter(filterType, filterValue);
            }
        });
    },

    // Update filter
    updateFilter(key, value) {
        if (value && value.trim()) {
            this.currentFilters[key] = value.trim();
        } else {
            delete this.currentFilters[key];
        }
        this.applyFilters();
        this.updateURL();
    },

    // Toggle filter
    toggleFilter(key, value) {
        if (this.currentFilters[key] === value) {
            delete this.currentFilters[key];
        } else {
            this.currentFilters[key] = value;
        }
        this.applyFilters();
        this.updateURL();
        this.updateFilterButtons();
    },

    // Apply filters
    async applyFilters() {
        const container = document.getElementById('recipes-container');
        if (!container) return;

        utils.showLoading(container);
        const recipes = await recipeManager.getRecipes(this.currentFilters);
        recipeManager.renderRecipes(recipes, 'recipes-container');
    },

    // Update filter buttons visual state
    updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const filterType = btn.dataset.filter;
            const filterValue = btn.dataset.value;
            
            if (this.currentFilters[filterType] === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    // Update URL with current filters
    updateURL() {
        const params = new URLSearchParams(this.currentFilters);
        const newURL = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newURL);
    },

    // Load filters from URL
    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        for (const [key, value] of params) {
            this.currentFilters[key] = value;
        }
        this.updateFilterButtons();
    }
};

// Form validation
const formValidator = {
    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate password strength
    isValidPassword(password) {
        return password.length >= 6;
    },

    // Show field error
    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.add('is-invalid');
        }
        
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    },

    // Clear field error
    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.remove('is-invalid');
        }
        
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    },

    // Clear all errors
    clearAllErrors(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.querySelectorAll('.is-invalid').forEach(field => {
                field.classList.remove('is-invalid');
            });
            form.querySelectorAll('.invalid-feedback').forEach(error => {
                error.style.display = 'none';
            });
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search manager if on recipes page
    if (window.location.pathname.includes('/recipes')) {
        searchManager.init();
    }
    
    // Setup smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Setup form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
});
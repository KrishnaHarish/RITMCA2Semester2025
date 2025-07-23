// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    await loadPopularRecipes();
    await loadHighlyRatedRecipes();
});

// Load popular recipes
async function loadPopularRecipes() {
    try {
        const response = await fetch('/api/recipes/popular?limit=6');
        const data = await response.json();
        
        if (data.success && data.data.recipes.length > 0) {
            recipeManager.renderRecipes(data.data.recipes, 'popular-recipes');
        } else {
            document.getElementById('popular-recipes').innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">No popular recipes yet. Be the first to share!</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading popular recipes:', error);
        document.getElementById('popular-recipes').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Failed to load popular recipes</p>
            </div>
        `;
    }
}

// Load highly rated recipes
async function loadHighlyRatedRecipes() {
    try {
        const response = await fetch('/api/recipes/highly-rated?limit=6');
        const data = await response.json();
        
        if (data.success && data.data.recipes.length > 0) {
            recipeManager.renderRecipes(data.data.recipes, 'highly-rated-recipes');
        } else {
            document.getElementById('highly-rated-recipes').innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">No highly rated recipes yet. Start rating recipes!</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading highly rated recipes:', error);
        document.getElementById('highly-rated-recipes').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Failed to load highly rated recipes</p>
            </div>
        `;
    }
}
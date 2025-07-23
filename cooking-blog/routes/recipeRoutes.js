const express = require('express');
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  rateRecipe,
  toggleFavorite,
  getPopularRecipes,
  getHighlyRatedRecipes,
  getFavoriteRecipes
} = require('../controllers/recipeController');
const { auth, optionalAuth } = require('../middleware/auth');
const { validate, recipeSchemas } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/popular', getPopularRecipes);
router.get('/highly-rated', getHighlyRatedRecipes);

// Routes that can work with or without authentication
router.get('/', optionalAuth, getRecipes);
router.get('/user/:userId', optionalAuth, getUserRecipes);
router.get('/:id', optionalAuth, getRecipe);

// Protected routes
router.use(auth); // Apply auth middleware to all routes below

// Recipe CRUD operations
router.post('/', validate(recipeSchemas.create), createRecipe);
router.put('/:id', validate(recipeSchemas.update), updateRecipe);
router.delete('/:id', deleteRecipe);

// Recipe interactions
router.post('/:id/rate', validate(recipeSchemas.rating), rateRecipe);
router.post('/:id/favorite', toggleFavorite);

// User's favorite recipes
router.get('/user/favorites', getFavoriteRecipes);

module.exports = router;
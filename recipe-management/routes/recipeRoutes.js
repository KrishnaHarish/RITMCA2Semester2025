const express = require('express');
const rateLimit = require('express-rate-limit');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { uploadWithErrorHandling, validateUploadedFile } = require('../middleware/upload');
const { 
  validate, 
  validateRecipeCreation, 
  validateRecipeUpdate, 
  validateObjectId, 
  validatePagination, 
  validateRecipeQuery 
} = require('../middleware/validation');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  uploadRecipeImage,
  deleteRecipeImage,
  addToFavorites,
  removeFromFavorites,
  getFavoriteRecipes,
  getMyRecipes,
  searchRecipes
} = require('../controllers/recipeController');

const router = express.Router();

/**
 * Rate limiting for recipe creation and modification
 */
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 recipe creations per hour
  message: {
    success: false,
    message: 'Too many recipe creation attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // limit each IP to 50 image uploads per hour
  message: {
    success: false,
    message: 'Too many image upload attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Recipe Routes
 */

/**
 * @route   GET /api/recipes
 * @desc    Get all public recipes with pagination and filtering
 * @access  Public
 * @query   page, limit, category, difficulty, cuisine, search, sortBy, sortOrder
 */
router.get('/', 
  optionalAuth, // Optional auth to check if user has favorited recipes
  validate([...validatePagination, ...validateRecipeQuery]),
  getAllRecipes
);

/**
 * @route   GET /api/recipes/search
 * @desc    Search recipes by text
 * @access  Public
 * @query   q (search query), page, limit
 */
router.get('/search', 
  optionalAuth,
  validate([
    ...validatePagination,
    require('express-validator').query('q')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Search query must be 1-100 characters long')
  ]),
  searchRecipes
);

/**
 * @route   GET /api/recipes/favorites
 * @desc    Get user's favorite recipes
 * @access  Private
 * @query   page, limit
 */
router.get('/favorites', 
  authenticateToken,
  validate(validatePagination),
  getFavoriteRecipes
);

/**
 * @route   GET /api/recipes/my-recipes
 * @desc    Get user's own recipes
 * @access  Private
 * @query   page, limit, isPublic
 */
router.get('/my-recipes', 
  authenticateToken,
  validate([
    ...validatePagination,
    require('express-validator').query('isPublic')
      .optional()
      .isBoolean()
      .withMessage('isPublic must be a boolean value')
  ]),
  getMyRecipes
);

/**
 * @route   POST /api/recipes
 * @desc    Create a new recipe
 * @access  Private
 */
router.post('/', 
  createLimiter,
  authenticateToken,
  uploadWithErrorHandling('image'),
  validateUploadedFile(false), // Image is optional for recipe creation
  validate(validateRecipeCreation),
  createRecipe
);

/**
 * @route   GET /api/recipes/:id
 * @desc    Get single recipe by ID
 * @access  Public
 */
router.get('/:id', 
  optionalAuth, // Optional auth to check if user has favorited this recipe
  validate(validateObjectId('id')),
  getRecipeById
);

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update a recipe
 * @access  Private (owner only)
 */
router.put('/:id', 
  authenticateToken,
  validate([...validateObjectId('id'), ...validateRecipeUpdate]),
  updateRecipe
);

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete a recipe
 * @access  Private (owner only)
 */
router.delete('/:id', 
  authenticateToken,
  validate(validateObjectId('id')),
  deleteRecipe
);

/**
 * @route   POST /api/recipes/:id/image
 * @desc    Upload recipe image
 * @access  Private (owner only)
 */
router.post('/:id/image', 
  uploadLimiter,
  authenticateToken,
  validate(validateObjectId('id')),
  uploadWithErrorHandling('image'),
  validateUploadedFile(true), // Image is required for this endpoint
  uploadRecipeImage
);

/**
 * @route   DELETE /api/recipes/:id/image
 * @desc    Delete recipe image
 * @access  Private (owner only)
 */
router.delete('/:id/image', 
  authenticateToken,
  validate(validateObjectId('id')),
  deleteRecipeImage
);

/**
 * @route   POST /api/recipes/:id/favorite
 * @desc    Add recipe to favorites
 * @access  Private
 */
router.post('/:id/favorite', 
  authenticateToken,
  validate(validateObjectId('id')),
  addToFavorites
);

/**
 * @route   DELETE /api/recipes/:id/favorite
 * @desc    Remove recipe from favorites
 * @access  Private
 */
router.delete('/:id/favorite', 
  authenticateToken,
  validate(validateObjectId('id')),
  removeFromFavorites
);

module.exports = router;
const { body, param, query, validationResult } = require('express-validator');
const { throwValidationError } = require('./errorHandler');

/**
 * Validation rules for user registration
 */
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be 3-30 characters long')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, hyphens, and underscores'),
    
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
    
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters')
];

/**
 * Validation rules for user login
 */
const validateUserLogin = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Email or username is required'),
    
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Validation rules for user profile update
 */
const validateUserUpdate = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be 3-30 characters long')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, hyphens, and underscores'),
    
  body('email')
    .optional()
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
    
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
    
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters')
];

/**
 * Validation rules for recipe creation
 */
const validateRecipeCreation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Recipe title must be 3-100 characters long'),
    
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Recipe description must be 10-500 characters long'),
    
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('At least one ingredient is required'),
    
  body('ingredients.*.name')
    .trim()
    .notEmpty()
    .withMessage('Ingredient name is required'),
    
  body('ingredients.*.amount')
    .trim()
    .notEmpty()
    .withMessage('Ingredient amount is required'),
    
  body('instructions')
    .isArray({ min: 1 })
    .withMessage('At least one instruction is required'),
    
  body('instructions.*.step')
    .isInt({ min: 1 })
    .withMessage('Instruction step must be a positive number'),
    
  body('instructions.*.description')
    .trim()
    .notEmpty()
    .withMessage('Instruction description is required'),
    
  body('category')
    .optional()
    .isIn(['appetizer', 'main', 'dessert', 'beverage', 'salad', 'soup', 'snack', 'breakfast', 'other'])
    .withMessage('Invalid recipe category'),
    
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Invalid difficulty level'),
    
  body('prepTime')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Prep time must be between 1 and 1440 minutes'),
    
  body('cookTime')
    .optional()
    .isInt({ min: 0, max: 1440 })
    .withMessage('Cook time must be between 0 and 1440 minutes'),
    
  body('servings')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Servings must be between 1 and 50'),
    
  body('cuisine')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Cuisine cannot exceed 50 characters'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
    
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Each tag cannot exceed 30 characters'),
    
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean value')
];

/**
 * Validation rules for recipe update
 */
const validateRecipeUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Recipe title must be 3-100 characters long'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Recipe description must be 10-500 characters long'),
    
  body('ingredients')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one ingredient is required'),
    
  body('instructions')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one instruction is required'),
    
  body('category')
    .optional()
    .isIn(['appetizer', 'main', 'dessert', 'beverage', 'salad', 'soup', 'snack', 'breakfast', 'other'])
    .withMessage('Invalid recipe category'),
    
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Invalid difficulty level'),
    
  body('prepTime')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Prep time must be between 1 and 1440 minutes'),
    
  body('cookTime')
    .optional()
    .isInt({ min: 0, max: 1440 })
    .withMessage('Cook time must be between 0 and 1440 minutes'),
    
  body('servings')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Servings must be between 1 and 50')
];

/**
 * Validation rules for MongoDB ObjectId parameters
 */
const validateObjectId = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} format`)
];

/**
 * Validation rules for pagination queries
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive number'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

/**
 * Validation rules for recipe search and filtering
 */
const validateRecipeQuery = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be 1-100 characters long'),
    
  query('category')
    .optional()
    .isIn(['appetizer', 'main', 'dessert', 'beverage', 'salad', 'soup', 'snack', 'breakfast', 'other'])
    .withMessage('Invalid category filter'),
    
  query('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Invalid difficulty filter'),
    
  query('cuisine')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Cuisine filter cannot exceed 50 characters'),
    
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'title', 'favoriteCount', 'prepTime', 'cookTime'])
    .withMessage('Invalid sort field'),
    
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc', '1', '-1'])
    .withMessage('Sort order must be asc, desc, 1, or -1')
];

/**
 * Middleware to handle validation errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  
  next();
};

/**
 * Combined validation middleware that includes error handling
 * @param {Array} validationRules - Array of validation rules
 * @returns {Array} - Array of validation rules with error handling
 */
const validate = (validationRules) => {
  return [...validationRules, handleValidationErrors];
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateRecipeCreation,
  validateRecipeUpdate,
  validateObjectId,
  validatePagination,
  validateRecipeQuery,
  handleValidationErrors,
  validate
};
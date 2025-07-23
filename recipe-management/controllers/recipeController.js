const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { 
  asyncHandler, 
  throwNotFoundError, 
  throwAuthorizationError,
  throwValidationError,
  sendSuccess, 
  sendCreated, 
  sendUpdated, 
  sendDeleted 
} = require('../middleware/errorHandler');
const { deleteUploadedFile, getFileUrl } = require('../middleware/upload');

/**
 * Recipe Controller
 * Handles all recipe-related operations including CRUD, image upload, and favorites
 */

/**
 * Get all recipes with pagination and filtering
 * @route GET /api/recipes
 * @access Public
 */
const getAllRecipes = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    difficulty,
    cuisine,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Convert sortOrder to MongoDB format
  const sort = sortOrder === 'asc' || sortOrder === '1' ? 1 : -1;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    category,
    difficulty,
    cuisine,
    search,
    sortBy,
    sortOrder: sort
  };

  const result = await Recipe.findPublicRecipes(options);

  // Add image URLs to recipes
  result.recipes = result.recipes.map(recipe => ({
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null
  }));

  sendSuccess(res, result, 'Recipes retrieved successfully');
});

/**
 * Get single recipe by ID
 * @route GET /api/recipes/:id
 * @access Public
 */
const getRecipeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findOne({
    _id: id,
    isActive: true,
    isPublic: true
  }).populate('author', 'username firstName lastName');

  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Add image URL
  const recipeData = {
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null,
    isFavorited: req.user ? recipe.isFavoritedBy(req.user._id) : false
  };

  sendSuccess(res, { recipe: recipeData }, 'Recipe retrieved successfully');
});

/**
 * Create new recipe
 * @route POST /api/recipes
 * @access Private
 */
const createRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    category = 'other',
    difficulty = 'medium',
    prepTime,
    cookTime,
    servings = 4,
    cuisine,
    tags = [],
    isPublic = true,
    nutrition
  } = req.body;

  // Create recipe data
  const recipeData = {
    title,
    description,
    ingredients,
    instructions,
    category,
    difficulty,
    prepTime,
    cookTime,
    servings,
    cuisine,
    tags,
    isPublic,
    nutrition,
    author: req.user._id
  };

  // Add image info if uploaded
  if (req.uploadedFile) {
    recipeData.image = {
      filename: req.uploadedFile.filename,
      originalName: req.uploadedFile.originalName,
      mimetype: req.uploadedFile.mimetype,
      size: req.uploadedFile.size,
      path: req.uploadedFile.path
    };
  }

  const recipe = await Recipe.create(recipeData);

  // Update user's recipe count
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { recipesCreated: 1 }
  });

  // Populate author info
  await recipe.populate('author', 'username firstName lastName');

  // Add image URL
  const responseData = {
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null
  };

  sendCreated(res, { recipe: responseData }, 'Recipe created successfully');
});

/**
 * Update recipe
 * @route PUT /api/recipes/:id
 * @access Private (owner only)
 */
const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find recipe
  const recipe = await Recipe.findById(id);
  
  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Check ownership
  if (recipe.author.toString() !== userId.toString()) {
    throwAuthorizationError('You can only update your own recipes');
  }

  // Extract update fields
  const allowedUpdates = [
    'title', 'description', 'ingredients', 'instructions', 
    'category', 'difficulty', 'prepTime', 'cookTime', 
    'servings', 'cuisine', 'tags', 'isPublic', 'nutrition'
  ];

  const updateData = {};
  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  // Update recipe
  Object.assign(recipe, updateData);
  await recipe.save();

  // Populate author info
  await recipe.populate('author', 'username firstName lastName');

  // Add image URL
  const responseData = {
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null
  };

  sendUpdated(res, { recipe: responseData }, 'Recipe updated successfully');
});

/**
 * Delete recipe
 * @route DELETE /api/recipes/:id
 * @access Private (owner only)
 */
const deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find recipe
  const recipe = await Recipe.findById(id);
  
  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Check ownership
  if (recipe.author.toString() !== userId.toString()) {
    throwAuthorizationError('You can only delete your own recipes');
  }

  // Delete associated image file
  if (recipe.image && recipe.image.filename) {
    await deleteUploadedFile(recipe.image.filename);
  }

  // Remove recipe from users' favorites
  await User.updateMany(
    { favoriteRecipes: recipe._id },
    { $pull: { favoriteRecipes: recipe._id } }
  );

  // Delete recipe
  await Recipe.findByIdAndDelete(id);

  // Update user's recipe count
  await User.findByIdAndUpdate(userId, {
    $inc: { recipesCreated: -1 }
  });

  sendDeleted(res, 'Recipe deleted successfully');
});

/**
 * Upload recipe image
 * @route POST /api/recipes/:id/image
 * @access Private (owner only)
 */
const uploadRecipeImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Check if image was uploaded
  if (!req.uploadedFile) {
    throwValidationError('No image file uploaded');
  }

  // Find recipe
  const recipe = await Recipe.findById(id);
  
  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Check ownership
  if (recipe.author.toString() !== userId.toString()) {
    throwAuthorizationError('You can only upload images to your own recipes');
  }

  // Delete old image if exists
  if (recipe.image && recipe.image.filename) {
    await deleteUploadedFile(recipe.image.filename);
  }

  // Update recipe with new image
  recipe.image = {
    filename: req.uploadedFile.filename,
    originalName: req.uploadedFile.originalName,
    mimetype: req.uploadedFile.mimetype,
    size: req.uploadedFile.size,
    path: req.uploadedFile.path
  };

  await recipe.save();

  const responseData = {
    image: recipe.image,
    imageUrl: getFileUrl(recipe.image.filename)
  };

  sendUpdated(res, responseData, 'Recipe image uploaded successfully');
});

/**
 * Delete recipe image
 * @route DELETE /api/recipes/:id/image
 * @access Private (owner only)
 */
const deleteRecipeImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find recipe
  const recipe = await Recipe.findById(id);
  
  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Check ownership
  if (recipe.author.toString() !== userId.toString()) {
    throwAuthorizationError('You can only modify your own recipes');
  }

  // Check if image exists
  if (!recipe.image || !recipe.image.filename) {
    throwValidationError('Recipe has no image to delete');
  }

  // Delete image file
  await deleteUploadedFile(recipe.image.filename);

  // Remove image from recipe
  recipe.image = undefined;
  await recipe.save();

  sendDeleted(res, 'Recipe image deleted successfully');
});

/**
 * Add recipe to favorites
 * @route POST /api/recipes/:id/favorite
 * @access Private
 */
const addToFavorites = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find recipe
  const recipe = await Recipe.findOne({
    _id: id,
    isActive: true,
    isPublic: true
  });
  
  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Check if already favorited
  if (recipe.isFavoritedBy(userId)) {
    throwValidationError('Recipe is already in your favorites');
  }

  // Add to recipe's favorites
  await recipe.addToFavorites(userId);

  // Add to user's favorites
  const user = await User.findById(userId);
  await user.addToFavorites(recipe._id);

  sendSuccess(res, { 
    favoriteCount: recipe.favoriteCount 
  }, 'Recipe added to favorites successfully');
});

/**
 * Remove recipe from favorites
 * @route DELETE /api/recipes/:id/favorite
 * @access Private
 */
const removeFromFavorites = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find recipe
  const recipe = await Recipe.findById(id);
  
  if (!recipe) {
    throwNotFoundError('Recipe not found');
  }

  // Check if favorited
  if (!recipe.isFavoritedBy(userId)) {
    throwValidationError('Recipe is not in your favorites');
  }

  // Remove from recipe's favorites
  await recipe.removeFromFavorites(userId);

  // Remove from user's favorites
  const user = await User.findById(userId);
  await user.removeFromFavorites(recipe._id);

  sendSuccess(res, { 
    favoriteCount: recipe.favoriteCount 
  }, 'Recipe removed from favorites successfully');
});

/**
 * Get user's favorite recipes
 * @route GET /api/recipes/favorites
 * @access Private
 */
const getFavoriteRecipes = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const user = await User.findById(userId)
    .populate({
      path: 'favoriteRecipes',
      options: {
        skip: parseInt(skip),
        limit: parseInt(limit),
        sort: { createdAt: -1 }
      },
      populate: {
        path: 'author',
        select: 'username firstName lastName'
      }
    });

  // Add image URLs
  const favoriteRecipes = user.favoriteRecipes.map(recipe => ({
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null
  }));

  const total = await User.findById(userId).then(u => u.favoriteRecipes.length);

  const result = {
    recipes: favoriteRecipes,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };

  sendSuccess(res, result, 'Favorite recipes retrieved successfully');
});

/**
 * Get user's own recipes
 * @route GET /api/recipes/my-recipes
 * @access Private
 */
const getMyRecipes = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, isPublic } = req.query;

  const skip = (page - 1) * limit;
  const query = { author: userId, isActive: true };
  
  if (isPublic !== undefined) {
    query.isPublic = isPublic === 'true';
  }

  const [recipes, total] = await Promise.all([
    Recipe.find(query)
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Recipe.countDocuments(query)
  ]);

  // Add image URLs
  const recipesWithImages = recipes.map(recipe => ({
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null
  }));

  const result = {
    recipes: recipesWithImages,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };

  sendSuccess(res, result, 'Your recipes retrieved successfully');
});

/**
 * Search recipes
 * @route GET /api/recipes/search
 * @access Public
 */
const searchRecipes = asyncHandler(async (req, res) => {
  const { q: search, page = 1, limit = 10 } = req.query;

  if (!search) {
    throwValidationError('Search query is required');
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    search,
    sortBy: 'score', // Sort by text search score
    sortOrder: -1
  };

  const result = await Recipe.findPublicRecipes(options);

  // Add image URLs
  result.recipes = result.recipes.map(recipe => ({
    ...recipe.toObject(),
    imageUrl: recipe.image ? getFileUrl(recipe.image.filename) : null
  }));

  sendSuccess(res, result, 'Search results retrieved successfully');
});

module.exports = {
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
};
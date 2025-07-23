const Recipe = require('../models/Recipe');
const User = require('../models/User');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res, next) => {
  try {
    // Build query
    let query = Recipe.find({ isPublished: true });

    // Search functionality
    if (req.query.search) {
      query = query.find({
        $text: { $search: req.query.search }
      });
    }

    // Filter by category
    if (req.query.category) {
      query = query.find({ category: req.query.category });
    }

    // Filter by cuisine
    if (req.query.cuisine) {
      query = query.find({ cuisine: req.query.cuisine });
    }

    // Filter by difficulty
    if (req.query.difficulty) {
      query = query.find({ difficulty: req.query.difficulty });
    }

    // Filter by author
    if (req.query.author) {
      query = query.find({ author: req.query.author });
    }

    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query = query.find({ tags: { $in: tags } });
    }

    // Sorting
    let sortBy = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      sortFields.forEach(field => {
        if (field.startsWith('-')) {
          sortBy[field.substring(1)] = -1;
        } else {
          sortBy[field] = 1;
        }
      });
    } else {
      sortBy = { createdAt: -1 }; // Default sort by newest
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Execute query
    const recipes = await query
      .sort(sortBy)
      .skip(startIndex)
      .limit(limit)
      .populate('author', 'username firstName lastName profileImage')
      .lean();

    // Get total count for pagination
    const total = await Recipe.countDocuments(query.getQuery());

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: recipes.length,
      total,
      pagination,
      data: { recipes }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username firstName lastName profileImage bio')
      .populate('ratings.user', 'username firstName lastName');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if recipe is published or user is the author
    if (!recipe.isPublished && (!req.user || recipe.author._id.toString() !== req.user._id.toString())) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Increment view count if not the author
    if (!req.user || recipe.author._id.toString() !== req.user._id.toString()) {
      await recipe.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: { recipe }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = async (req, res, next) => {
  try {
    // Add author to req.body
    req.body.author = req.user._id;

    const recipe = await Recipe.create(req.body);

    // Populate author information
    await recipe.populate('author', 'username firstName lastName profileImage');

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: { recipe }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user is the owner or admin
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('author', 'username firstName lastName profileImage');

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: { recipe }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user is the owner or admin
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's recipes
// @route   GET /api/recipes/user/:userId
// @access  Public
const getUserRecipes = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Build query - only show published recipes unless it's the owner
    let query = { author: userId };
    if (!req.user || req.user._id.toString() !== userId) {
      query.isPublished = true;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const recipes = await Recipe.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('author', 'username firstName lastName profileImage')
      .lean();

    const total = await Recipe.countDocuments(query);

    res.status(200).json({
      success: true,
      count: recipes.length,
      total,
      data: { recipes, user: { username: user.username, firstName: user.firstName, lastName: user.lastName } }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate a recipe
// @route   POST /api/recipes/:id/rate
// @access  Private
const rateRecipe = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user is trying to rate their own recipe
    if (recipe.author.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot rate your own recipe'
      });
    }

    await recipe.addRating(req.user._id, rating, comment);

    // Populate the updated recipe
    await recipe.populate('ratings.user', 'username firstName lastName');

    res.status(200).json({
      success: true,
      message: 'Recipe rated successfully',
      data: { 
        recipe: {
          _id: recipe._id,
          averageRating: recipe.averageRating,
          ratingsCount: recipe.ratingsCount,
          ratings: recipe.ratings
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle favorite recipe
// @route   POST /api/recipes/:id/favorite
// @access  Private
const toggleFavorite = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    await recipe.toggleFavorite(req.user._id);

    const isFavorited = recipe.favorites.includes(req.user._id);

    res.status(200).json({
      success: true,
      message: isFavorited ? 'Recipe added to favorites' : 'Recipe removed from favorites',
      data: { 
        isFavorited,
        favoritesCount: recipe.favoritesCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular recipes
// @route   GET /api/recipes/popular
// @access  Public
const getPopularRecipes = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const recipes = await Recipe.getPopular(limit);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: { recipes }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get highly rated recipes
// @route   GET /api/recipes/highly-rated
// @access  Public
const getHighlyRatedRecipes = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const recipes = await Recipe.getHighlyRated(limit);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: { recipes }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's favorite recipes
// @route   GET /api/recipes/favorites
// @access  Private
const getFavoriteRecipes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const recipes = await Recipe.find({ 
      favorites: req.user._id,
      isPublished: true
    })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('author', 'username firstName lastName profileImage')
      .lean();

    const total = await Recipe.countDocuments({ 
      favorites: req.user._id,
      isPublished: true
    });

    res.status(200).json({
      success: true,
      count: recipes.length,
      total,
      data: { recipes }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
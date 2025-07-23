const mongoose = require('mongoose');

/**
 * Recipe Schema for Recipe Management System
 * Handles recipe data including ingredients, instructions, and metadata
 */
const recipeSchema = new mongoose.Schema({
  // Basic recipe information
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Recipe details
  ingredients: [{
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true
    },
    amount: {
      type: String,
      required: [true, 'Ingredient amount is required'],
      trim: true
    },
    unit: {
      type: String,
      trim: true,
      default: ''
    }
  }],
  
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: [true, 'Instruction description is required'],
      trim: true
    }
  }],
  
  // Recipe metadata
  category: {
    type: String,
    enum: ['appetizer', 'main', 'dessert', 'beverage', 'salad', 'soup', 'snack', 'breakfast', 'other'],
    default: 'other'
  },
  
  cuisine: {
    type: String,
    trim: true,
    maxlength: [50, 'Cuisine cannot exceed 50 characters']
  },
  
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  
  prepTime: {
    type: Number, // in minutes
    min: [1, 'Prep time must be at least 1 minute'],
    max: [1440, 'Prep time cannot exceed 24 hours']
  },
  
  cookTime: {
    type: Number, // in minutes
    min: [0, 'Cook time cannot be negative'],
    max: [1440, 'Cook time cannot exceed 24 hours']
  },
  
  servings: {
    type: Number,
    min: [1, 'Servings must be at least 1'],
    max: [50, 'Servings cannot exceed 50'],
    default: 4
  },
  
  // Image handling
  image: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String
  },
  
  // Author and social features
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipe must have an author']
  },
  
  favoritedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  favoriteCount: {
    type: Number,
    default: 0
  },
  
  // Recipe status and visibility
  isPublic: {
    type: Boolean,
    default: true
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Nutrition information (optional)
  nutrition: {
    calories: Number,
    protein: Number, // in grams
    carbs: Number,   // in grams
    fat: Number,     // in grams
    fiber: Number,   // in grams
    sugar: Number    // in grams
  },
  
  // Tags for better searchability
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better query performance
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });
recipeSchema.index({ author: 1 });
recipeSchema.index({ category: 1 });
recipeSchema.index({ difficulty: 1 });
recipeSchema.index({ createdAt: -1 });
recipeSchema.index({ favoriteCount: -1 });
recipeSchema.index({ isPublic: 1, isActive: 1 });

/**
 * Pre-save middleware to update timestamps and favorite count
 */
recipeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Update favorite count based on favoritedBy array
  this.favoriteCount = this.favoritedBy.length;
  
  // Sort instructions by step number
  if (this.instructions && this.instructions.length > 0) {
    this.instructions.sort((a, b) => a.step - b.step);
  }
  
  next();
});

/**
 * Pre-update middleware to update updatedAt field
 */
recipeSchema.pre(['updateOne', 'findOneAndUpdate'], function() {
  this.set({ updatedAt: Date.now() });
});

/**
 * Instance method to add user to favorites
 * @param {ObjectId} userId - User ID to add to favorites
 */
recipeSchema.methods.addToFavorites = async function(userId) {
  if (!this.favoritedBy.includes(userId)) {
    this.favoritedBy.push(userId);
    this.favoriteCount = this.favoritedBy.length;
    await this.save();
  }
};

/**
 * Instance method to remove user from favorites
 * @param {ObjectId} userId - User ID to remove from favorites
 */
recipeSchema.methods.removeFromFavorites = async function(userId) {
  this.favoritedBy = this.favoritedBy.filter(id => !id.equals(userId));
  this.favoriteCount = this.favoritedBy.length;
  await this.save();
};

/**
 * Instance method to get total cooking time
 * @returns {number} - Total time in minutes
 */
recipeSchema.methods.getTotalTime = function() {
  const prep = this.prepTime || 0;
  const cook = this.cookTime || 0;
  return prep + cook;
};

/**
 * Instance method to check if user has favorited this recipe
 * @param {ObjectId} userId - User ID to check
 * @returns {boolean} - Whether user has favorited this recipe
 */
recipeSchema.methods.isFavoritedBy = function(userId) {
  return this.favoritedBy.some(id => id.equals(userId));
};

/**
 * Static method to find recipes by author
 * @param {ObjectId} authorId - Author's user ID
 * @param {Object} options - Query options
 * @returns {Array} - Array of recipes
 */
recipeSchema.statics.findByAuthor = function(authorId, options = {}) {
  const query = { author: authorId, isActive: true };
  if (options.isPublic !== undefined) {
    query.isPublic = options.isPublic;
  }
  
  return this.find(query)
    .populate('author', 'username firstName lastName')
    .sort({ createdAt: -1 });
};

/**
 * Static method to find public recipes with pagination
 * @param {Object} options - Query options
 * @returns {Object} - Paginated results
 */
recipeSchema.statics.findPublicRecipes = async function(options = {}) {
  const {
    page = 1,
    limit = 10,
    category,
    difficulty,
    cuisine,
    search,
    sortBy = 'createdAt',
    sortOrder = -1
  } = options;
  
  const query = { isPublic: true, isActive: true };
  
  // Add filters
  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (cuisine) query.cuisine = new RegExp(cuisine, 'i');
  if (search) {
    query.$text = { $search: search };
  }
  
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder };
  
  const [recipes, total] = await Promise.all([
    this.find(query)
      .populate('author', 'username firstName lastName')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    this.countDocuments(query)
  ]);
  
  return {
    recipes,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Virtual for formatted prep time
 */
recipeSchema.virtual('formattedPrepTime').get(function() {
  if (!this.prepTime) return 'Not specified';
  const hours = Math.floor(this.prepTime / 60);
  const minutes = this.prepTime % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
});

/**
 * Virtual for formatted cook time
 */
recipeSchema.virtual('formattedCookTime').get(function() {
  if (!this.cookTime) return 'Not specified';
  const hours = Math.floor(this.cookTime / 60);
  const minutes = this.cookTime % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
});

// Ensure virtual fields are serialized
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
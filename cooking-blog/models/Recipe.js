const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
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
  ingredients: [{
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true
    },
    quantity: {
      type: String,
      required: [true, 'Ingredient quantity is required'],
      trim: true
    },
    unit: {
      type: String,
      trim: true,
      enum: {
        values: ['cup', 'cups', 'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons', 
                'gram', 'grams', 'kilogram', 'kilograms', 'pound', 'pounds', 
                'ounce', 'ounces', 'liter', 'liters', 'milliliter', 'milliliters',
                'piece', 'pieces', 'slice', 'slices', 'pinch', 'to taste', 'as needed'],
        message: 'Invalid unit type'
      }
    }
  }],
  instructions: [{
    step: {
      type: Number,
      required: [true, 'Step number is required']
    },
    description: {
      type: String,
      required: [true, 'Step description is required'],
      trim: true,
      maxlength: [500, 'Step description cannot exceed 500 characters']
    }
  }],
  imageUrl: {
    type: String,
    default: '/images/default-recipe.jpg',
    validate: {
      validator: function(v) {
        // Simple URL validation
        return !v || /^(https?:\/\/)|(\/images\/)/.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  category: {
    type: String,
    required: [true, 'Recipe category is required'],
    enum: {
      values: ['Appetizer', 'Main Course', 'Dessert', 'Breakfast', 'Lunch', 'Dinner', 
              'Snack', 'Beverage', 'Soup', 'Salad', 'Bread', 'Pasta', 'Vegetarian', 
              'Vegan', 'Gluten-Free', 'Other'],
      message: 'Invalid category'
    }
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine type is required'],
    enum: {
      values: ['Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'French', 
              'Japanese', 'Thai', 'Mediterranean', 'Middle Eastern', 'Korean', 
              'Spanish', 'Greek', 'British', 'German', 'Other'],
      message: 'Invalid cuisine type'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    }
  },
  prepTime: {
    type: Number,
    required: [true, 'Preparation time is required'],
    min: [1, 'Preparation time must be at least 1 minute'],
    max: [1440, 'Preparation time cannot exceed 24 hours']
  },
  cookTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [1, 'Cooking time must be at least 1 minute'],
    max: [1440, 'Cooking time cannot exceed 24 hours']
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
    min: [1, 'Recipe must serve at least 1 person'],
    max: [50, 'Maximum servings cannot exceed 50']
  },
  nutritionInfo: {
    calories: {
      type: Number,
      min: [0, 'Calories cannot be negative']
    },
    protein: {
      type: Number,
      min: [0, 'Protein cannot be negative']
    },
    carbs: {
      type: Number,
      min: [0, 'Carbohydrates cannot be negative']
    },
    fat: {
      type: Number,
      min: [0, 'Fat cannot be negative']
    },
    fiber: {
      type: Number,
      min: [0, 'Fiber cannot be negative']
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipe author is required']
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      maxlength: [200, 'Comment cannot exceed 200 characters'],
      trim: true
    }
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total time
recipeSchema.virtual('totalTime').get(function() {
  return this.prepTime + this.cookTime;
});

// Virtual for average rating
recipeSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

// Virtual for total ratings count
recipeSchema.virtual('ratingsCount').get(function() {
  return this.ratings.length;
});

// Virtual for favorites count
recipeSchema.virtual('favoritesCount').get(function() {
  return this.favorites.length;
});

// Indexes for better query performance
recipeSchema.index({ title: 'text', description: 'text' }); // Text search
recipeSchema.index({ category: 1, cuisine: 1 });
recipeSchema.index({ author: 1, createdAt: -1 });
recipeSchema.index({ isPublished: 1, createdAt: -1 });
recipeSchema.index({ 'ratings.rating': 1 });
recipeSchema.index({ views: -1 });

// Pre-save middleware to sort instructions by step number
recipeSchema.pre('save', function(next) {
  if (this.isModified('instructions')) {
    this.instructions.sort((a, b) => a.step - b.step);
  }
  next();
});

// Method to add a rating
recipeSchema.methods.addRating = function(userId, rating, comment = '') {
  // Remove existing rating from the same user
  this.ratings = this.ratings.filter(r => !r.user.equals(userId));
  
  // Add new rating
  this.ratings.push({
    user: userId,
    rating: rating,
    comment: comment
  });
  
  return this.save();
};

// Method to increment view count
recipeSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to toggle favorite
recipeSchema.methods.toggleFavorite = function(userId) {
  const favoriteIndex = this.favorites.indexOf(userId);
  
  if (favoriteIndex > -1) {
    // Remove from favorites
    this.favorites.splice(favoriteIndex, 1);
  } else {
    // Add to favorites
    this.favorites.push(userId);
  }
  
  return this.save({ validateBeforeSave: false });
};

// Static method to get popular recipes
recipeSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isPublished: true })
    .sort({ views: -1 })
    .limit(limit)
    .populate('author', 'username firstName lastName');
};

// Static method to get highly rated recipes
recipeSchema.statics.getHighlyRated = function(limit = 10) {
  return this.aggregate([
    { $match: { isPublished: true } },
    { $addFields: {
      avgRating: { $avg: '$ratings.rating' },
      ratingsCount: { $size: '$ratings' }
    }},
    { $match: { ratingsCount: { $gte: 3 } } }, // At least 3 ratings
    { $sort: { avgRating: -1, ratingsCount: -1 } },
    { $limit: limit }
  ]);
};

module.exports = mongoose.model('Recipe', recipeSchema);
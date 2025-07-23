const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema for Recipe Management System
 * Handles user authentication and profile information
 */
const userSchema = new mongoose.Schema({
  // Basic user information
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  
  // Profile information
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  
  // User preferences and statistics
  favoriteRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  
  recipesCreated: {
    type: Number,
    default: 0
  },
  
  // Account management
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastLogin: {
    type: Date
  },
  
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

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

/**
 * Pre-save middleware to hash password
 */
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    
    // Update the updatedAt field
    this.updatedAt = Date.now();
    
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Pre-update middleware to update updatedAt field
 */
userSchema.pre(['updateOne', 'findOneAndUpdate'], function() {
  this.set({ updatedAt: Date.now() });
});

/**
 * Instance method to check password
 * @param {string} candidatePassword - Password to check
 * @returns {boolean} - Whether password matches
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

/**
 * Instance method to get user's full name
 * @returns {string} - Full name or username if no first/last name
 */
userSchema.methods.getFullName = function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  } else if (this.firstName) {
    return this.firstName;
  }
  return this.username;
};

/**
 * Instance method to add recipe to favorites
 * @param {ObjectId} recipeId - Recipe ID to add to favorites
 */
userSchema.methods.addToFavorites = async function(recipeId) {
  if (!this.favoriteRecipes.includes(recipeId)) {
    this.favoriteRecipes.push(recipeId);
    await this.save();
  }
};

/**
 * Instance method to remove recipe from favorites
 * @param {ObjectId} recipeId - Recipe ID to remove from favorites
 */
userSchema.methods.removeFromFavorites = async function(recipeId) {
  this.favoriteRecipes = this.favoriteRecipes.filter(
    id => !id.equals(recipeId)
  );
  await this.save();
};

/**
 * Static method to find user by email or username
 * @param {string} identifier - Email or username
 * @returns {Object} - User object or null
 */
userSchema.statics.findByIdentifier = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier }
    ]
  }).select('+password');
};

/**
 * Virtual for user's recipe count (populated when needed)
 */
userSchema.virtual('recipeCount', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'author',
  count: true
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
const User = require('../models/User');
const { generateToken, setAuthCookie, clearAuthCookie } = require('../middleware/auth');
const { asyncHandler, throwValidationError, throwAuthError, sendSuccess, sendCreated } = require('../middleware/errorHandler');

/**
 * Authentication Controller
 * Handles user registration, login, logout, and authentication-related operations
 */

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName, bio } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throwValidationError('An account with this email already exists');
    } else {
      throwValidationError('This username is already taken');
    }
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password,
    firstName,
    lastName,
    bio
  });

  // Generate JWT token
  const token = generateToken(user);

  // Set authentication cookie
  setAuthCookie(res, token);

  // Remove password from response
  user.password = undefined;

  sendCreated(res, {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      favoriteRecipes: user.favoriteRecipes,
      recipesCreated: user.recipesCreated,
      createdAt: user.createdAt
    },
    token
  }, 'User registered successfully');
});

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  // Find user by email or username
  const user = await User.findByIdentifier(identifier);

  if (!user) {
    throwAuthError('Invalid credentials');
  }

  // Check if account is active
  if (!user.isActive) {
    throwAuthError('Account has been deactivated');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    throwAuthError('Invalid credentials');
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate JWT token
  const token = generateToken(user);

  // Set authentication cookie
  setAuthCookie(res, token);

  // Remove password from response
  user.password = undefined;

  sendSuccess(res, {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      favoriteRecipes: user.favoriteRecipes,
      recipesCreated: user.recipesCreated,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    },
    token
  }, 'Login successful');
});

/**
 * Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  // Clear authentication cookie
  clearAuthCookie(res);

  sendSuccess(res, null, 'Logout successful');
});

/**
 * Get current user profile
 * @route GET /api/auth/me
 * @access Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  // User is available from auth middleware
  const user = await User.findById(req.user._id)
    .populate('favoriteRecipes', 'title description image category difficulty')
    .populate('recipeCount');

  sendSuccess(res, {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      favoriteRecipes: user.favoriteRecipes,
      recipesCreated: user.recipesCreated,
      recipeCount: user.recipeCount,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }, 'User profile retrieved successfully');
});

/**
 * Update user profile
 * @route PUT /api/auth/profile
 * @access Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { username, email, firstName, lastName, bio } = req.body;
  const userId = req.user._id;

  // Check if username or email is being changed and already exists
  if (username || email) {
    const query = { _id: { $ne: userId } };
    
    if (username && email) {
      query.$or = [{ username }, { email }];
    } else if (username) {
      query.username = username;
    } else if (email) {
      query.email = email;
    }

    const existingUser = await User.findOne(query);
    
    if (existingUser) {
      if (existingUser.username === username) {
        throwValidationError('This username is already taken');
      } else if (existingUser.email === email) {
        throwValidationError('An account with this email already exists');
      }
    }
  }

  // Update user
  const updateData = {};
  if (username !== undefined) updateData.username = username;
  if (email !== undefined) updateData.email = email;
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (bio !== undefined) updateData.bio = bio;

  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');

  sendSuccess(res, {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      favoriteRecipes: user.favoriteRecipes,
      recipesCreated: user.recipesCreated,
      updatedAt: user.updatedAt
    }
  }, 'Profile updated successfully');
});

/**
 * Change password
 * @route PUT /api/auth/password
 * @access Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!currentPassword || !newPassword) {
    throwValidationError('Current password and new password are required');
  }

  if (newPassword.length < 6) {
    throwValidationError('New password must be at least 6 characters long');
  }

  // Get user with password
  const user = await User.findById(userId).select('+password');

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  
  if (!isCurrentPasswordValid) {
    throwAuthError('Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  sendSuccess(res, null, 'Password changed successfully');
});

/**
 * Deactivate user account
 * @route DELETE /api/auth/account
 * @access Private
 */
const deactivateAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Deactivate user account
  await User.findByIdAndUpdate(userId, { isActive: false });

  // Clear authentication cookie
  clearAuthCookie(res);

  sendSuccess(res, null, 'Account deactivated successfully');
});

/**
 * Refresh JWT token
 * @route POST /api/auth/refresh
 * @access Private
 */
const refreshToken = asyncHandler(async (req, res) => {
  const user = req.user;

  // Generate new JWT token
  const token = generateToken(user);

  // Set new authentication cookie
  setAuthCookie(res, token);

  sendSuccess(res, { token }, 'Token refreshed successfully');
});

/**
 * Get user statistics
 * @route GET /api/auth/stats
 * @access Private
 */
const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get user with populated recipe count
  const user = await User.findById(userId)
    .populate('recipeCount')
    .populate('favoriteRecipes');

  const stats = {
    recipesCreated: user.recipesCreated,
    recipeCount: user.recipeCount || 0,
    favoritesCount: user.favoriteRecipes.length,
    accountAge: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)), // days
    lastLogin: user.lastLogin
  };

  sendSuccess(res, { stats }, 'User statistics retrieved successfully');
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  deactivateAccount,
  refreshToken,
  getUserStats
};
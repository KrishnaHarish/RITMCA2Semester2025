const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware to verify JWT tokens
 * Protects routes that require user authentication
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from various sources
    let token;
    
    // Check Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check cookies for token
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Check x-auth-token header
    else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }
    
    // If no token provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is valid but user no longer exists.'
      });
    }
    
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated.'
      });
    }
    
    // Add user to request object
    req.user = user;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Handle different JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

/**
 * Optional authentication middleware
 * Adds user to request if token is valid, but doesn't require authentication
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    
    // Get token from various sources
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Invalid token, but we don't fail the request
        console.log('Optional auth - invalid token:', error.message);
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue anyway
  }
};

/**
 * Authorization middleware to check if user owns the resource
 * Used for protecting user-specific operations
 */
const authorizeOwner = (resourceUserField = 'author') => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.'
        });
      }
      
      // Get resource user ID from request params, body, or resource object
      let resourceUserId;
      
      if (req.resource && req.resource[resourceUserField]) {
        resourceUserId = req.resource[resourceUserField].toString();
      } else if (req.params.userId) {
        resourceUserId = req.params.userId;
      } else if (req.body[resourceUserField]) {
        resourceUserId = req.body[resourceUserField].toString();
      }
      
      // Check if user owns the resource
      if (resourceUserId && resourceUserId !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own resources.'
        });
      }
      
      next();
    } catch (error) {
      console.error('Authorization middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during authorization.'
      });
    }
  };
};

/**
 * Middleware to check if user has admin privileges
 * (For future admin features)
 */
const requireAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }
    
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required.'
      });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during admin check.'
    });
  }
};

/**
 * Generate JWT token for user
 * @param {Object} user - User object
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'recipe-management-system',
      audience: 'recipe-app-users'
    }
  );
};

/**
 * Set authentication cookie
 * @param {Object} res - Express response object
 * @param {string} token - JWT token
 */
const setAuthCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict' // CSRF protection
  };
  
  res.cookie('token', token, cookieOptions);
};

/**
 * Clear authentication cookie
 * @param {Object} res - Express response object
 */
const clearAuthCookie = (res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

module.exports = {
  authenticateToken,
  optionalAuth,
  authorizeOwner,
  requireAdmin,
  generateToken,
  setAuthCookie,
  clearAuthCookie
};
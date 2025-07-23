/**
 * Global error handler middleware for Recipe Management System
 * Handles all application errors and returns consistent error responses
 */

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error Details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      statusCode: 404,
      message
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    
    // Extract field name from error
    const field = Object.keys(err.keyValue)[0];
    if (field === 'email') {
      message = 'An account with this email already exists';
    } else if (field === 'username') {
      message = 'This username is already taken';
    }
    
    error = {
      statusCode: 400,
      message
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    error = {
      statusCode: 400,
      message: messages.join(', ')
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      statusCode: 401,
      message: 'Invalid token'
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      statusCode: 401,
      message: 'Token expired'
    };
  }

  // File upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      statusCode: 400,
      message: 'File size too large'
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = {
      statusCode: 400,
      message: 'Unexpected file field'
    };
  }

  // Database connection errors
  if (err.name === 'MongooseServerSelectionError') {
    error = {
      statusCode: 500,
      message: 'Database connection failed'
    };
  }

  // Default error response
  const statusCode = error.statusCode || err.statusCode || 500;
  const message = error.message || 'Server Error';

  // Don't send stack trace in production
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(response);
};

/**
 * 404 handler for unknown routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Async handler wrapper to catch async errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function with error handling
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom error class for application-specific errors
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Helper function to create and throw validation errors
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
const throwValidationError = (message, statusCode = 400) => {
  throw new AppError(message, statusCode);
};

/**
 * Helper function to create and throw authentication errors
 * @param {string} message - Error message
 */
const throwAuthError = (message = 'Authentication failed') => {
  throw new AppError(message, 401);
};

/**
 * Helper function to create and throw authorization errors
 * @param {string} message - Error message
 */
const throwAuthorizationError = (message = 'Access denied') => {
  throw new AppError(message, 403);
};

/**
 * Helper function to create and throw not found errors
 * @param {string} message - Error message
 */
const throwNotFoundError = (message = 'Resource not found') => {
  throw new AppError(message, 404);
};

/**
 * Response helper functions for consistent API responses
 */
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const sendError = (res, message = 'Error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  res.status(statusCode).json(response);
};

const sendCreated = (res, data, message = 'Resource created successfully') => {
  sendSuccess(res, data, message, 201);
};

const sendUpdated = (res, data, message = 'Resource updated successfully') => {
  sendSuccess(res, data, message, 200);
};

const sendDeleted = (res, message = 'Resource deleted successfully') => {
  sendSuccess(res, null, message, 200);
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler,
  AppError,
  throwValidationError,
  throwAuthError,
  throwAuthorizationError,
  throwNotFoundError,
  sendSuccess,
  sendError,
  sendCreated,
  sendUpdated,
  sendDeleted
};
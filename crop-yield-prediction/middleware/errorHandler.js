/**
 * Error handling middleware
 * Handles all errors thrown in the application
 */
const errorHandler = (error, req, res, _next) => {
  console.error('Error caught by middleware:', error);

  // Default error object
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error'
  };

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map(val => val.message).join(', ');
    customError = {
      statusCode: 400,
      message: `Validation Error: ${message}`
    };
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    customError = {
      statusCode: 400,
      message: `Duplicate field value: ${field}. Please use another value.`
    };
  }

  // Mongoose bad ObjectId
  if (error.name === 'CastError') {
    customError = {
      statusCode: 400,
      message: 'Invalid ID format'
    };
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    customError = {
      statusCode: 401,
      message: 'Invalid token'
    };
  }

  if (error.name === 'TokenExpiredError') {
    customError = {
      statusCode: 401,
      message: 'Token expired'
    };
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = errorHandler;
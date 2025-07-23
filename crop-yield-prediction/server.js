const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import routes
const cropRoutes = require('./routes/cropRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
})); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
let isDbConnected = false;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_yield_prediction')
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  isDbConnected = true;
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  console.log('⚠️  Server will continue without database functionality');
  isDbConnected = false;
});

// Middleware to check database connection
const checkDbConnection = (req, res, next) => {
  if (!isDbConnected) {
    return res.status(503).json({
      success: false,
      error: 'Database connection unavailable',
      message: 'The database service is currently unavailable. Please try again later.',
      code: 'DB_CONNECTION_ERROR'
    });
  }
  next();
};

// Routes with database connection middleware
app.use('/api/v1/crops', checkDbConnection, cropRoutes);
app.use('/api/v1/predictions', checkDbConnection, predictionRoutes);

// Serve the main application page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Crop Yield Prediction System is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Crop Yield Prediction System server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access the application at: http://localhost:${PORT}`);
});

module.exports = app;
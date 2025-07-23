const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import routes (we'll create mock versions)
const cropRoutes = require('./routes/cropRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection (with fallback for testing)
const connectDB = async () => {
  try {
    // Only try to connect to MongoDB if it's available
    if (process.env.NODE_ENV !== 'test') {
      const mongoose = require('mongoose');
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_yield_prediction', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connected to MongoDB successfully');
    } else {
      console.log('📝 Running in test mode without MongoDB');
    }
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed, running in demo mode:', error.message);
    console.log('📝 The application will work with mock data for demonstration');
  }
};

connectDB();

// Routes
app.use('/api/v1/crops', cropRoutes);
app.use('/api/v1/predictions', predictionRoutes);

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
    environment: process.env.NODE_ENV || 'development',
    database: 'MongoDB connection status varies - check server logs'
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
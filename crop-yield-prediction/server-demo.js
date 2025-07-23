const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import test routes (no database required)
const cropRoutes = require('./routes/cropRoutes-test');
const predictionRoutes = require('./routes/predictionRoutes-test');

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

console.log('🚀 Starting Crop Yield Prediction System in Demo Mode');
console.log('📝 No database connection required - using mock data');

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
    message: 'Crop Yield Prediction System is running in Demo Mode',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Demo mode - using mock data (no database required)',
    features: [
      'Yield Prediction with multi-factor algorithm',
      'Mock crop data management',
      'Statistical analytics',
      'Intelligent recommendations',
      'Responsive web interface'
    ]
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
  console.log(`🚀 Crop Yield Prediction System running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access the application at: http://localhost:${PORT}`);
  console.log('🎯 Demo Mode: All functionality available with mock data');
  console.log(`📋 Try the health check: http://localhost:${PORT}/health`);
});

module.exports = app;
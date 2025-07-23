const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'"]
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cooking_blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Running in demo mode without database connection');
    console.log('📋 To connect to MongoDB:');
    console.log('   1. Install MongoDB locally or use MongoDB Atlas');
    console.log('   2. Update MONGODB_URI in .env file');
    console.log('   3. Restart the application');
  }
};

// Connect to database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Serve the main application page
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Cooking Blog - Delicious Recipes & Culinary Adventures',
    user: null 
  });
});

// Recipe pages
app.get('/recipes', (req, res) => {
  res.render('recipes', { 
    title: 'All Recipes - Cooking Blog',
    user: null 
  });
});

app.get('/recipes/:id', (req, res) => {
  res.render('recipe-detail', { 
    title: 'Recipe - Cooking Blog',
    user: null,
    recipeId: req.params.id
  });
});

app.get('/create-recipe', (req, res) => {
  res.render('create-recipe', { 
    title: 'Create Recipe - Cooking Blog',
    user: null 
  });
});

// Auth pages
app.get('/login', (req, res) => {
  res.render('login', { 
    title: 'Login - Cooking Blog',
    user: null 
  });
});

app.get('/register', (req, res) => {
  res.render('register', { 
    title: 'Register - Cooking Blog',
    user: null 
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', { 
    title: 'Profile - Cooking Blog',
    user: null 
  });
});

// API Documentation
app.get('/api', (req, res) => {
  res.json({
    message: 'Cooking Blog API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        profile: 'GET /api/auth/me',
        updateProfile: 'PUT /api/auth/profile',
        changePassword: 'PUT /api/auth/password',
        deleteAccount: 'DELETE /api/auth/account'
      },
      recipes: {
        getAllRecipes: 'GET /api/recipes',
        getRecipe: 'GET /api/recipes/:id',
        createRecipe: 'POST /api/recipes',
        updateRecipe: 'PUT /api/recipes/:id',
        deleteRecipe: 'DELETE /api/recipes/:id',
        getUserRecipes: 'GET /api/recipes/user/:userId',
        rateRecipe: 'POST /api/recipes/:id/rate',
        toggleFavorite: 'POST /api/recipes/:id/favorite',
        getPopular: 'GET /api/recipes/popular',
        getHighlyRated: 'GET /api/recipes/highly-rated',
        getFavorites: 'GET /api/recipes/user/favorites'
      }
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Cooking Blog Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    res.status(404).json({
      success: false,
      message: 'API endpoint not found'
    });
  } else {
    res.status(404).render('404', { 
      title: 'Page Not Found - Cooking Blog',
      user: null 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cooking Blog server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access the application at: http://localhost:${PORT}`);
  console.log(`📚 API documentation available at: http://localhost:${PORT}/api`);
});

module.exports = app;
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import utilities and middleware
const { connectDB } = require('./utils/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Create Express application
const app = express();

// Set up view engine and layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup layout middleware for EJS
app.use((req, res, next) => {
  res.renderWithLayout = (view, locals = {}) => {
    // Extract page-specific content
    app.render(view, locals, (err, html) => {
      if (err) return next(err);
      
      // Render with layout
      res.render('layout', {
        ...locals,
        body: html
      });
    });
  };
  next();
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://stackpath.bootstrapcdn.com"],
    },
  },
}));

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing middleware
app.use(require('cookie-parser')());

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Frontend Routes (EJS templates)

/**
 * @route   GET /
 * @desc    Home page
 * @access  Public
 */
app.get('/', (req, res) => {
  res.renderWithLayout('index', {
    title: 'Recipe Management System',
    user: null // We'll add user data later with middleware
  });
});

/**
 * @route   GET /login
 * @desc    Login page
 * @access  Public
 */
app.get('/login', (req, res) => {
  res.renderWithLayout('auth/login', {
    title: 'Login - Recipe Management System'
  });
});

/**
 * @route   GET /register
 * @desc    Registration page
 * @access  Public
 */
app.get('/register', (req, res) => {
  res.renderWithLayout('auth/register', {
    title: 'Register - Recipe Management System'
  });
});

/**
 * @route   GET /recipes
 * @desc    Recipes listing page
 * @access  Public
 */
app.get('/recipes', (req, res) => {
  res.render('recipes/index', {
    title: 'Recipes - Recipe Management System'
  });
});

/**
 * @route   GET /recipes/create
 * @desc    Create recipe page
 * @access  Private
 */
app.get('/recipes/create', (req, res) => {
  res.render('recipes/create', {
    title: 'Create Recipe - Recipe Management System'
  });
});

/**
 * @route   GET /recipes/:id
 * @desc    Recipe detail page
 * @access  Public
 */
app.get('/recipes/:id', (req, res) => {
  res.render('recipes/detail', {
    title: 'Recipe Details - Recipe Management System',
    recipeId: req.params.id
  });
});

/**
 * @route   GET /dashboard
 * @desc    User dashboard
 * @access  Private
 */
app.get('/dashboard', (req, res) => {
  res.render('dashboard/index', {
    title: 'Dashboard - Recipe Management System'
  });
});

/**
 * @route   GET /profile
 * @desc    User profile page
 * @access  Private
 */
app.get('/profile', (req, res) => {
  res.render('profile/index', {
    title: 'Profile - Recipe Management System'
  });
});

/**
 * @route   GET /health
 * @desc    Health check endpoint
 * @access  Public
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Recipe Management System is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: require('./package.json').version
  });
});

/**
 * @route   GET /api
 * @desc    API information endpoint
 * @access  Public
 */
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Recipe Management System API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        profile: 'GET /api/auth/me',
        updateProfile: 'PUT /api/auth/profile',
        changePassword: 'PUT /api/auth/password'
      },
      recipes: {
        getAll: 'GET /api/recipes',
        getById: 'GET /api/recipes/:id',
        create: 'POST /api/recipes',
        update: 'PUT /api/recipes/:id',
        delete: 'DELETE /api/recipes/:id',
        uploadImage: 'POST /api/recipes/:id/image',
        favorite: 'POST /api/recipes/:id/favorite',
        unfavorite: 'DELETE /api/recipes/:id/favorite',
        search: 'GET /api/recipes/search'
      }
    },
    documentation: 'See README.md for detailed API documentation'
  });
});

// 404 handler for unknown routes
app.use(notFound);

// Error handling middleware (should be last)
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe_management';

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB(MONGODB_URI);
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log('🚀 Recipe Management System started successfully!');
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Server: http://localhost:${PORT}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`📖 Health: http://localhost:${PORT}/health`);
      console.log('💡 Press Ctrl+C to stop the server');
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n🛑 ${signal} received. Starting graceful shutdown...`);
      
      server.close(async (err) => {
        if (err) {
          console.error('❌ Error during server shutdown:', err);
          process.exit(1);
        }
        
        try {
          const { disconnectDB } = require('./utils/database');
          await disconnectDB();
          console.log('✅ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during database disconnect:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
if (require.main === module) {
  startServer();
}

module.exports = app;
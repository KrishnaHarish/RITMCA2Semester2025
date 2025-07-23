const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

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
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://stackpath.bootstrapcdn.com", "https://cdnjs.cloudflare.com"],
    },
  },
}));

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing middleware
app.use(require('cookie-parser')());

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Demo API Routes (without database)
app.get('/api/recipes', (req, res) => {
  res.json({
    success: true,
    message: 'Recipes retrieved successfully',
    data: {
      recipes: [
        {
          _id: '1',
          title: 'Chocolate Chip Cookies',
          description: 'Classic homemade chocolate chip cookies that are crispy on the edges and soft in the center.',
          category: 'dessert',
          difficulty: 'easy',
          prepTime: 15,
          cookTime: 12,
          servings: 24,
          favoriteCount: 45,
          imageUrl: null,
          author: {
            username: 'baker_jane',
            firstName: 'Jane',
            lastName: 'Doe'
          },
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Spaghetti Carbonara',
          description: 'Authentic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
          category: 'main',
          difficulty: 'medium',
          prepTime: 10,
          cookTime: 20,
          servings: 4,
          favoriteCount: 32,
          imageUrl: null,
          author: {
            username: 'chef_mario',
            firstName: 'Mario',
            lastName: 'Rossi'
          },
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: 'Caesar Salad',
          description: 'Fresh romaine lettuce with homemade Caesar dressing, croutons, and parmesan cheese.',
          category: 'salad',
          difficulty: 'easy',
          prepTime: 20,
          cookTime: 0,
          servings: 4,
          favoriteCount: 28,
          imageUrl: null,
          author: {
            username: 'healthy_chef',
            firstName: 'Sarah',
            lastName: 'Green'
          },
          createdAt: new Date().toISOString()
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 3,
        pages: 1
      }
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Not authenticated'
  });
});

// Frontend Routes (EJS templates)
app.get('/', (req, res) => {
  res.renderWithLayout('index', {
    title: 'Recipe Management System',
    user: null
  });
});

app.get('/login', (req, res) => {
  res.renderWithLayout('auth/login', {
    title: 'Login - Recipe Management System'
  });
});

app.get('/register', (req, res) => {
  res.renderWithLayout('auth/register', {
    title: 'Register - Recipe Management System'
  });
});

app.get('/recipes', (req, res) => {
  res.render('recipes/index', {
    title: 'Recipes - Recipe Management System'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Recipe Management System is running (Demo Mode)',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: require('./package.json').version,
    mode: 'demo'
  });
});

// API information endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Recipe Management System API (Demo Mode)',
    version: '1.0.0',
    mode: 'demo',
    note: 'This is a demo version. Full functionality requires MongoDB connection.',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        profile: 'GET /api/auth/me'
      },
      recipes: {
        getAll: 'GET /api/recipes',
        getById: 'GET /api/recipes/:id',
        create: 'POST /api/recipes',
        update: 'PUT /api/recipes/:id',
        delete: 'DELETE /api/recipes/:id'
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// Server configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log('🚀 Recipe Management System (Demo) started successfully!');
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`📖 Health: http://localhost:${PORT}/health`);
  console.log('⚠️  Note: Running in demo mode without database');
  console.log('💡 Press Ctrl+C to stop the server');
});

module.exports = app;
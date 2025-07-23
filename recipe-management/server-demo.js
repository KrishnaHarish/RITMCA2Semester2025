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
          title: 'Fettuccine Alfredo',
          description: 'Creamy and rich pasta dish with butter, garlic, and Parmigiano Reggiano cheese.',
          category: 'main',
          difficulty: 'medium',
          prepTime: 10,
          cookTime: 15,
          servings: 4,
          favoriteCount: 45,
          imageUrl: 'https://hips.hearstapps.com/delish/assets/17/36/1504715566-delish-fettuccine-alfredo.jpg',
          ingredients: [
            { name: 'Fettuccine', amount: '1', unit: 'packet' },
            { name: 'Butter', amount: '1', unit: 'cup' },
            { name: 'Garlic', amount: '5', unit: 'cloves' },
            { name: 'Heavy whipping cream', amount: '1', unit: 'cup' },
            { name: 'Parmigiano Reggiano and Romano cheese', amount: '1', unit: 'cup' },
            { name: 'Nutmeg', amount: '2', unit: 'tablespoons' }
          ],
          instructions: [
            'Cook the pasta according to package directions',
            'Prepare sauce: Melt the butter over medium heat',
            'Add the garlic, and cook and stir for one minute',
            'Gradually stir in the cream',
            'Bring the mixture to a gentle boil',
            'Add the cheese and bring the pasta and sauce together'
          ],
          author: {
            username: 'chef_italiano',
            firstName: 'Antonio',
            lastName: 'Rossi'
          },
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Papaya Salad',
          description: 'Fresh and vibrant Thai-style papaya salad with a tangy dressing.',
          category: 'salad',
          difficulty: 'easy',
          prepTime: 15,
          cookTime: 0,
          servings: 4,
          favoriteCount: 32,
          imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.38DmydQQkIyEvdMBeHqf9AHaEX&pid=Api&P=0&h=180',
          ingredients: [
            { name: 'Rice vinegar', amount: '1/3', unit: 'cup' },
            { name: 'Sweet chili sauce', amount: '4', unit: 'tablespoons' },
            { name: 'Soy sauce', amount: '2', unit: 'teaspoons' },
            { name: 'Crushed red pepper', amount: '1', unit: 'teaspoon' },
            { name: 'Lime juice', amount: '1', unit: 'lime' },
            { name: 'Green papaya', amount: '1', unit: 'medium' },
            { name: 'Carrots', amount: '2', unit: 'cups' },
            { name: 'English or Persian cucumbers', amount: '1', unit: 'cup' },
            { name: 'Mint leaves', amount: '1/3', unit: 'cup' },
            { name: 'Crushed roasted peanuts', amount: '4', unit: 'tablespoons' }
          ],
          instructions: [
            'Slice off the ends of the green papaya',
            'Using a vegetable peeler, peel the outer skin',
            'Using a julienne peeler or spiralizer, shred the raw papaya',
            'Shred the peeled carrots and cucumbers',
            'In a large bowl, mix the green papaya, carrots, cucumber and mint',
            'Pour in the dressing and toss to coat the vegetables',
            'Top with crushed peanuts and serve immediately'
          ],
          author: {
            username: 'thai_chef',
            firstName: 'Siriporn',
            lastName: 'Thai'
          },
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: 'Delicious Vanilla Cake',
          description: 'Classic vanilla cake that is moist, fluffy, and perfect for any occasion.',
          category: 'dessert',
          difficulty: 'medium',
          prepTime: 20,
          cookTime: 20,
          servings: 8,
          favoriteCount: 28,
          imageUrl: 'https://lilluna.com/wp-content/uploads/2020/04/vanilla-cake-resize-15.jpg',
          ingredients: [
            { name: 'All-Purpose Flour', amount: '1', unit: 'cup' },
            { name: 'Baking Powder', amount: '2', unit: 'teaspoons' },
            { name: 'Caster Sugar', amount: '1', unit: 'cup' },
            { name: 'Butter', amount: '200', unit: 'grams' },
            { name: 'Milk', amount: '1', unit: 'cup' },
            { name: 'Vanilla Essence', amount: '2', unit: 'tablespoons' }
          ],
          instructions: [
            'Preheat the oven to 180°C / 355°F',
            'Grease and line a 20 cm (8 inches) round cake tin with baking paper',
            'Mix the dry ingredients in a bowl',
            'Add milk and mix it thoroughly',
            'Pour the batter to cake tin',
            'Bake it in oven for 20 minutes'
          ],
          author: {
            username: 'sweet_baker',
            firstName: 'Emma',
            lastName: 'Sweet'
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

// Get individual recipe by ID
app.get('/api/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  const recipes = [
    {
      _id: '1',
      title: 'Fettuccine Alfredo',
      description: 'Creamy and rich pasta dish with butter, garlic, and Parmigiano Reggiano cheese.',
      category: 'main',
      difficulty: 'medium',
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      favoriteCount: 45,
      imageUrl: 'https://hips.hearstapps.com/delish/assets/17/36/1504715566-delish-fettuccine-alfredo.jpg',
      ingredients: [
        { name: 'Fettuccine', amount: '1', unit: 'packet' },
        { name: 'Butter', amount: '1', unit: 'cup' },
        { name: 'Garlic', amount: '5', unit: 'cloves' },
        { name: 'Heavy whipping cream', amount: '1', unit: 'cup' },
        { name: 'Parmigiano Reggiano and Romano cheese', amount: '1', unit: 'cup' },
        { name: 'Nutmeg', amount: '2', unit: 'tablespoons' }
      ],
      instructions: [
        'Cook the pasta according to package directions',
        'Prepare sauce: Melt the butter over medium heat',
        'Add the garlic, and cook and stir for one minute',
        'Gradually stir in the cream',
        'Bring the mixture to a gentle boil',
        'Add the cheese and bring the pasta and sauce together'
      ],
      author: {
        username: 'chef_italiano',
        firstName: 'Antonio',
        lastName: 'Rossi'
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Papaya Salad',
      description: 'Fresh and vibrant Thai-style papaya salad with a tangy dressing.',
      category: 'salad',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      favoriteCount: 32,
      imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.38DmydQQkIyEvdMBeHqf9AHaEX&pid=Api&P=0&h=180',
      ingredients: [
        { name: 'Rice vinegar', amount: '1/3', unit: 'cup' },
        { name: 'Sweet chili sauce', amount: '4', unit: 'tablespoons' },
        { name: 'Soy sauce', amount: '2', unit: 'teaspoons' },
        { name: 'Crushed red pepper', amount: '1', unit: 'teaspoon' },
        { name: 'Lime juice', amount: '1', unit: 'lime' },
        { name: 'Green papaya', amount: '1', unit: 'medium' },
        { name: 'Carrots', amount: '2', unit: 'cups' },
        { name: 'English or Persian cucumbers', amount: '1', unit: 'cup' },
        { name: 'Mint leaves', amount: '1/3', unit: 'cup' },
        { name: 'Crushed roasted peanuts', amount: '4', unit: 'tablespoons' }
      ],
      instructions: [
        'Slice off the ends of the green papaya',
        'Using a vegetable peeler, peel the outer skin',
        'Using a julienne peeler or spiralizer, shred the raw papaya',
        'Shred the peeled carrots and cucumbers',
        'In a large bowl, mix the green papaya, carrots, cucumber and mint',
        'Pour in the dressing and toss to coat the vegetables',
        'Top with crushed peanuts and serve immediately'
      ],
      author: {
        username: 'thai_chef',
        firstName: 'Siriporn',
        lastName: 'Thai'
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: '3',
      title: 'Delicious Vanilla Cake',
      description: 'Classic vanilla cake that is moist, fluffy, and perfect for any occasion.',
      category: 'dessert',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 20,
      servings: 8,
      favoriteCount: 28,
      imageUrl: 'https://lilluna.com/wp-content/uploads/2020/04/vanilla-cake-resize-15.jpg',
      ingredients: [
        { name: 'All-Purpose Flour', amount: '1', unit: 'cup' },
        { name: 'Baking Powder', amount: '2', unit: 'teaspoons' },
        { name: 'Caster Sugar', amount: '1', unit: 'cup' },
        { name: 'Butter', amount: '200', unit: 'grams' },
        { name: 'Milk', amount: '1', unit: 'cup' },
        { name: 'Vanilla Essence', amount: '2', unit: 'tablespoons' }
      ],
      instructions: [
        'Preheat the oven to 180°C / 355°F',
        'Grease and line a 20 cm (8 inches) round cake tin with baking paper',
        'Mix the dry ingredients in a bowl',
        'Add milk and mix it thoroughly',
        'Pour the batter to cake tin',
        'Bake it in oven for 20 minutes'
      ],
      author: {
        username: 'sweet_baker',
        firstName: 'Emma',
        lastName: 'Sweet'
      },
      createdAt: new Date().toISOString()
    }
  ];

  const recipe = recipes.find(r => r._id === recipeId);
  
  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: 'Recipe not found'
    });
  }

  res.json({
    success: true,
    message: 'Recipe retrieved successfully',
    data: { recipe }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Not authenticated'
  });
});

// Newsletter subscription endpoint (demo)
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }
  
  // In a real app, this would save to database
  console.log('Newsletter subscription:', email);
  
  res.json({
    success: true,
    message: 'Thank you for subscribing to our newsletter!'
  });
});

// Frontend Routes (EJS templates)
app.get('/', (req, res) => {
  res.renderWithLayout('index', {
    title: 'Cooking Blog - Recipe Management System',
    user: null
  });
});

app.get('/login', (req, res) => {
  res.renderWithLayout('auth/login', {
    title: 'Login - Cooking Blog'
  });
});

app.get('/register', (req, res) => {
  res.renderWithLayout('auth/register', {
    title: 'Register - Cooking Blog'
  });
});

app.get('/recipes', (req, res) => {
  res.render('recipes/index', {
    title: 'Recipes - Cooking Blog'
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
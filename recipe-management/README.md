# Recipe Management System

A comprehensive Recipe Management web application built with Node.js, Express, and MongoDB.

## Features

### Core Features
- **User Authentication**: Secure registration and login using JWT tokens
- **Recipe CRUD Operations**: Create, read, update, and delete recipes
- **Recipe Management**: Title, description, ingredients, instructions, and creation date
- **RESTful API**: Well-structured API endpoints for all operations
- **User Interface**: Simple and intuitive EJS-based frontend

### Bonus Features
- **Image Upload**: Upload and manage recipe images
- **Recipe Favoriting**: Save favorite recipes for quick access
- **User Profiles**: Manage user information and preferences

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS templating engine
- **File Upload**: Multer for image handling
- **Security**: Helmet, bcrypt for password hashing, rate limiting
- **Validation**: Joi and express-validator

## Installation

1. Clone the repository
2. Navigate to the recipe-management directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env` and configure your environment variables
5. Start MongoDB service
6. Run the application:
   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Recipes
- `GET /api/recipes` - Get all recipes (with pagination)
- `GET /api/recipes/:id` - Get specific recipe
- `POST /api/recipes` - Create new recipe (authenticated)
- `PUT /api/recipes/:id` - Update recipe (authenticated, owner only)
- `DELETE /api/recipes/:id` - Delete recipe (authenticated, owner only)
- `POST /api/recipes/:id/image` - Upload recipe image (authenticated, owner only)

### Favorites
- `POST /api/recipes/:id/favorite` - Add recipe to favorites (authenticated)
- `DELETE /api/recipes/:id/favorite` - Remove recipe from favorites (authenticated)
- `GET /api/users/favorites` - Get user's favorite recipes (authenticated)

## Project Structure

```
recipe-management/
├── controllers/     # Business logic
├── middleware/      # Authentication, validation, error handling
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── public/          # Static files (CSS, JS, images)
├── views/           # EJS templates
├── uploads/         # Uploaded images
├── utils/           # Helper functions
├── server.js        # Application entry point
└── package.json     # Dependencies and scripts
```

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- Security headers with Helmet
- File upload restrictions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
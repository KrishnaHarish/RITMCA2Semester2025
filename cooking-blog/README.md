# Cooking Blog

A comprehensive cooking blog website built with Node.js, Express.js, and MongoDB featuring user authentication, recipe management, and a responsive frontend.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT
- **Recipe Management**: Complete CRUD operations for recipes
- **Recipe Rating System**: Users can rate and comment on recipes
- **Favorite Recipes**: Users can bookmark their favorite recipes
- **Search & Filter**: Advanced search with category, cuisine, and difficulty filters
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5

### Recipe Features
- **Comprehensive Recipe Data**: Title, description, ingredients, instructions, and nutrition info
- **Image Support**: Recipe photos with fallback images
- **Categories & Cuisines**: Organized by type and origin
- **Difficulty Levels**: Easy, Medium, Hard classification
- **Cooking Times**: Prep time, cook time, and serving information
- **User Ratings**: 5-star rating system with comments

### Technical Features
- **RESTful API**: Well-documented API endpoints
- **Input Validation**: Server-side validation using Joi
- **Security**: Helmet.js, rate limiting, and secure authentication
- **Error Handling**: Comprehensive error management
- **Modular Architecture**: Clean, maintainable code structure

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cooking-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cooking_blog
   JWT_SECRET=your_super_secret_jwt_key
   PORT=3001
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and go to `http://localhost:3001`

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| PUT | `/api/auth/password` | Change password | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Recipe Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/recipes` | Get all recipes (with filters) | No |
| GET | `/api/recipes/:id` | Get single recipe | No |
| POST | `/api/recipes` | Create new recipe | Yes |
| PUT | `/api/recipes/:id` | Update recipe | Yes (Owner/Admin) |
| DELETE | `/api/recipes/:id` | Delete recipe | Yes (Owner/Admin) |
| GET | `/api/recipes/popular` | Get popular recipes | No |
| GET | `/api/recipes/highly-rated` | Get highly rated recipes | No |
| GET | `/api/recipes/user/:userId` | Get user's recipes | No |
| POST | `/api/recipes/:id/rate` | Rate a recipe | Yes |
| POST | `/api/recipes/:id/favorite` | Toggle favorite | Yes |
| GET | `/api/recipes/user/favorites` | Get user's favorites | Yes |

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Create Recipe
```bash
POST /api/recipes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Delicious Pasta",
  "description": "A simple yet delicious pasta recipe",
  "ingredients": [
    {
      "name": "Pasta",
      "quantity": "200",
      "unit": "grams"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "description": "Boil water in a large pot"
    }
  ],
  "category": "Main Course",
  "cuisine": "Italian",
  "difficulty": "Easy",
  "prepTime": 10,
  "cookTime": 15,
  "servings": 2
}
```

## Frontend Pages

- **Home** (`/`) - Landing page with featured recipes
- **Recipes** (`/recipes`) - Browse all recipes with search/filter
- **Recipe Detail** (`/recipes/:id`) - View individual recipe
- **Create Recipe** (`/create-recipe`) - Add new recipe (auth required)
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **Profile** (`/profile`) - User profile management

## Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: String,
  role: String (user/admin),
  isActive: Boolean,
  timestamps: true
}
```

### Recipe Model
```javascript
{
  title: String,
  description: String,
  ingredients: [{
    name: String,
    quantity: String,
    unit: String
  }],
  instructions: [{
    step: Number,
    description: String
  }],
  imageUrl: String,
  category: String,
  cuisine: String,
  difficulty: String,
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  nutritionInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  author: ObjectId (ref: User),
  ratings: [{
    user: ObjectId (ref: User),
    rating: Number,
    comment: String
  }],
  favorites: [ObjectId (ref: User)],
  views: Number,
  isPublished: Boolean,
  timestamps: true
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Joi validation for all inputs
- **Rate Limiting**: Express rate limiting to prevent abuse
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for protection
- **Error Handling**: Secure error responses without sensitive data

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)
- `npm run lint` - Run ESLint

### Code Structure
```
cooking-blog/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── views/          # EJS templates
├── public/         # Static files
│   ├── css/        # Stylesheets
│   ├── js/         # Client-side JavaScript
│   └── images/     # Images
├── config/         # Configuration files
└── server.js       # Main application file
```

### Best Practices Implemented
- **Modular Code**: Separated concerns with clear file structure
- **Error Handling**: Comprehensive error handling throughout
- **Validation**: Input validation on both client and server
- **Security**: Multiple security layers implemented
- **Documentation**: Well-documented code and API
- **Responsive Design**: Mobile-first responsive design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or create an issue in the repository.

---

Built with ❤️ using Node.js, Express.js, MongoDB, and Bootstrap.
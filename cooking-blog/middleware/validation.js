const Joi = require('joi');

// User validation schemas
const userSchemas = {
  register: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.alphanum': 'Username can only contain letters and numbers',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters',
        'any.required': 'Username is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      }),
    firstName: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.max': 'First name cannot exceed 50 characters',
        'any.required': 'First name is required'
      }),
    lastName: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.max': 'Last name cannot exceed 50 characters',
        'any.required': 'Last name is required'
      }),
    bio: Joi.string()
      .max(500)
      .allow('')
      .messages({
        'string.max': 'Bio cannot exceed 500 characters'
      })
  }),

  login: Joi.object({
    identifier: Joi.string()
      .required()
      .messages({
        'any.required': 'Email or username is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    bio: Joi.string().max(500).allow('')
  })
};

// Recipe validation schemas
const recipeSchemas = {
  create: Joi.object({
    title: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title cannot exceed 100 characters',
        'any.required': 'Recipe title is required'
      }),
    description: Joi.string()
      .min(10)
      .max(500)
      .required()
      .messages({
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 500 characters',
        'any.required': 'Recipe description is required'
      }),
    ingredients: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          quantity: Joi.string().required(),
          unit: Joi.string().valid(
            'cup', 'cups', 'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons',
            'gram', 'grams', 'kilogram', 'kilograms', 'pound', 'pounds',
            'ounce', 'ounces', 'liter', 'liters', 'milliliter', 'milliliters',
            'piece', 'pieces', 'slice', 'slices', 'pinch', 'to taste', 'as needed'
          )
        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one ingredient is required',
        'any.required': 'Ingredients are required'
      }),
    instructions: Joi.array()
      .items(
        Joi.object({
          step: Joi.number().integer().positive().required(),
          description: Joi.string().max(500).required()
        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one instruction step is required',
        'any.required': 'Instructions are required'
      }),
    imageUrl: Joi.string()
      .uri()
      .allow('')
      .messages({
        'string.uri': 'Please provide a valid image URL'
      }),
    category: Joi.string()
      .valid(
        'Appetizer', 'Main Course', 'Dessert', 'Breakfast', 'Lunch', 'Dinner',
        'Snack', 'Beverage', 'Soup', 'Salad', 'Bread', 'Pasta', 'Vegetarian',
        'Vegan', 'Gluten-Free', 'Other'
      )
      .required()
      .messages({
        'any.only': 'Invalid category',
        'any.required': 'Category is required'
      }),
    cuisine: Joi.string()
      .valid(
        'Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'French',
        'Japanese', 'Thai', 'Mediterranean', 'Middle Eastern', 'Korean',
        'Spanish', 'Greek', 'British', 'German', 'Other'
      )
      .required()
      .messages({
        'any.only': 'Invalid cuisine type',
        'any.required': 'Cuisine is required'
      }),
    difficulty: Joi.string()
      .valid('Easy', 'Medium', 'Hard')
      .required()
      .messages({
        'any.only': 'Difficulty must be Easy, Medium, or Hard',
        'any.required': 'Difficulty level is required'
      }),
    prepTime: Joi.number()
      .integer()
      .min(1)
      .max(1440)
      .required()
      .messages({
        'number.min': 'Preparation time must be at least 1 minute',
        'number.max': 'Preparation time cannot exceed 24 hours',
        'any.required': 'Preparation time is required'
      }),
    cookTime: Joi.number()
      .integer()
      .min(1)
      .max(1440)
      .required()
      .messages({
        'number.min': 'Cooking time must be at least 1 minute',
        'number.max': 'Cooking time cannot exceed 24 hours',
        'any.required': 'Cooking time is required'
      }),
    servings: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .required()
      .messages({
        'number.min': 'Recipe must serve at least 1 person',
        'number.max': 'Maximum servings cannot exceed 50',
        'any.required': 'Number of servings is required'
      }),
    nutritionInfo: Joi.object({
      calories: Joi.number().min(0),
      protein: Joi.number().min(0),
      carbs: Joi.number().min(0),
      fat: Joi.number().min(0),
      fiber: Joi.number().min(0)
    }),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean()
  }),

  update: Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    ingredients: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.string().required(),
        unit: Joi.string().valid(
          'cup', 'cups', 'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons',
          'gram', 'grams', 'kilogram', 'kilograms', 'pound', 'pounds',
          'ounce', 'ounces', 'liter', 'liters', 'milliliter', 'milliliters',
          'piece', 'pieces', 'slice', 'slices', 'pinch', 'to taste', 'as needed'
        )
      })
    ).min(1),
    instructions: Joi.array().items(
      Joi.object({
        step: Joi.number().integer().positive().required(),
        description: Joi.string().max(500).required()
      })
    ).min(1),
    imageUrl: Joi.string().uri().allow(''),
    category: Joi.string().valid(
      'Appetizer', 'Main Course', 'Dessert', 'Breakfast', 'Lunch', 'Dinner',
      'Snack', 'Beverage', 'Soup', 'Salad', 'Bread', 'Pasta', 'Vegetarian',
      'Vegan', 'Gluten-Free', 'Other'
    ),
    cuisine: Joi.string().valid(
      'Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'French',
      'Japanese', 'Thai', 'Mediterranean', 'Middle Eastern', 'Korean',
      'Spanish', 'Greek', 'British', 'German', 'Other'
    ),
    difficulty: Joi.string().valid('Easy', 'Medium', 'Hard'),
    prepTime: Joi.number().integer().min(1).max(1440),
    cookTime: Joi.number().integer().min(1).max(1440),
    servings: Joi.number().integer().min(1).max(50),
    nutritionInfo: Joi.object({
      calories: Joi.number().min(0),
      protein: Joi.number().min(0),
      carbs: Joi.number().min(0),
      fat: Joi.number().min(0),
      fiber: Joi.number().min(0)
    }),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean()
  }),

  rating: Joi.object({
    rating: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required()
      .messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5',
        'any.required': 'Rating is required'
      }),
    comment: Joi.string()
      .max(200)
      .allow('')
      .messages({
        'string.max': 'Comment cannot exceed 200 characters'
      })
  })
};

// Validation middleware function
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessages
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  userSchemas,
  recipeSchemas,
  validate
};
const Crop = require('../models/Crop');
const Joi = require('joi');

// Validation schema for crop data
const cropValidationSchema = Joi.object({
  cropType: Joi.string().valid('Rice', 'Wheat', 'Corn', 'Barley', 'Soybeans', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Other').required(),
  season: Joi.string().valid('Kharif', 'Rabi', 'Zaid', 'Whole Year').required(),
  area: Joi.number().min(0.1).max(10000).required(),
  rainfall: Joi.number().min(0).max(5000).required(),
  temperature: Joi.object({
    average: Joi.number().min(-20).max(60).required(),
    min: Joi.number().min(-30).max(50).required(),
    max: Joi.number().min(-10).max(70).required()
  }).required(),
  humidity: Joi.number().min(0).max(100).required(),
  fertilizer: Joi.object({
    nitrogen: Joi.number().min(0).default(0),
    phosphorus: Joi.number().min(0).default(0),
    potassium: Joi.number().min(0).default(0),
    organic: Joi.number().min(0).default(0)
  }).default({}),
  soilType: Joi.string().valid('Alluvial', 'Clay', 'Sandy', 'Loamy', 'Red', 'Black', 'Laterite', 'Desert').required(),
  pH: Joi.number().min(0).max(14).required(),
  actualYield: Joi.number().min(0).optional(),
  location: Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required(),
    coordinates: Joi.object({
      latitude: Joi.number().min(-90).max(90).optional(),
      longitude: Joi.number().min(-180).max(180).optional()
    }).optional()
  }).required(),
  plantingDate: Joi.date().required(),
  harvestDate: Joi.date().greater(Joi.ref('plantingDate')).optional(),
  notes: Joi.string().max(500).optional()
});

// Get all crops with filtering and pagination
const getAllCrops = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      cropType, 
      season, 
      state, 
      district,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (cropType) filter.cropType = cropType;
    if (season) filter.season = season;
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (district) filter['location.district'] = new RegExp(district, 'i');

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const crops = await Crop.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Crop.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        crops,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          hasNext: skip + crops.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get crop by ID
const getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const crop = await Crop.findById(id);
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      data: crop
    });
  } catch (error) {
    console.error('Error fetching crop:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid crop ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create new crop
const createCrop = async (req, res) => {
  try {
    // Validate input data
    const { error, value } = cropValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    // Create new crop
    const crop = new Crop(value);
    
    // Calculate predicted yield
    crop.predictedYield = crop.calculatePredictedYield();
    
    const savedCrop = await crop.save();

    res.status(201).json({
      success: true,
      message: 'Crop created successfully',
      data: savedCrop
    });
  } catch (error) {
    console.error('Error creating crop:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update crop
const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate input data
    const { error, value } = cropValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    const crop = await Crop.findById(id);
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Update crop data
    Object.assign(crop, value);
    
    // Recalculate predicted yield
    crop.predictedYield = crop.calculatePredictedYield();
    
    const updatedCrop = await crop.save();

    res.status(200).json({
      success: true,
      message: 'Crop updated successfully',
      data: updatedCrop
    });
  } catch (error) {
    console.error('Error updating crop:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid crop ID format'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete crop
const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    
    const crop = await Crop.findByIdAndDelete(id);
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting crop:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid crop ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get crop statistics
const getCropStatistics = async (req, res) => {
  try {
    const { cropType, season, state } = req.query;
    
    // Build match filter
    const matchFilter = {};
    if (cropType) matchFilter.cropType = cropType;
    if (season) matchFilter.season = season;
    if (state) matchFilter['location.state'] = new RegExp(state, 'i');

    const stats = await Crop.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: null,
          totalCrops: { $sum: 1 },
          totalArea: { $sum: '$area' },
          avgPredictedYield: { $avg: '$predictedYield' },
          avgActualYield: { $avg: '$actualYield' },
          avgRainfall: { $avg: '$rainfall' },
          avgTemperature: { $avg: '$temperature.average' },
          maxYield: { $max: '$predictedYield' },
          minYield: { $min: '$predictedYield' }
        }
      }
    ]);

    // Get crop type distribution
    const cropDistribution = await Crop.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$cropType',
          count: { $sum: 1 },
          totalArea: { $sum: '$area' },
          avgYield: { $avg: '$predictedYield' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get seasonal distribution
    const seasonalDistribution = await Crop.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$season',
          count: { $sum: 1 },
          avgYield: { $avg: '$predictedYield' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overall: stats[0] || {
          totalCrops: 0,
          totalArea: 0,
          avgPredictedYield: 0,
          avgActualYield: 0,
          avgRainfall: 0,
          avgTemperature: 0,
          maxYield: 0,
          minYield: 0
        },
        cropDistribution,
        seasonalDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getCropStatistics
};
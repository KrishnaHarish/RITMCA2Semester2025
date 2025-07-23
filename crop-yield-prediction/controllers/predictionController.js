const Crop = require('../models/Crop');
const Joi = require('joi');

// Validation schema for prediction request
const predictionValidationSchema = Joi.object({
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
  location: Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required()
  }).required()
});

// Predict yield for given parameters
const predictYield = async (req, res) => {
  try {
    // Validate input data
    const { error, value } = predictionValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    // Create a temporary crop instance for prediction (not saved to DB)
    const tempCrop = new Crop(value);
    
    // Calculate predicted yield
    const predictedYield = tempCrop.calculatePredictedYield();
    
    // Get historical data for comparison
    const historicalData = await getHistoricalComparison(value);
    
    // Generate recommendations
    const recommendations = generateRecommendations(tempCrop, historicalData);
    
    // Calculate confidence score
    const confidenceScore = calculateConfidenceScore(tempCrop, historicalData);

    res.status(200).json({
      success: true,
      data: {
        predictedYield: Math.round(predictedYield * 100) / 100,
        unit: 'tons per hectare',
        totalProduction: Math.round((predictedYield * value.area) * 100) / 100,
        confidenceScore: Math.round(confidenceScore * 100),
        historicalComparison: historicalData,
        recommendations,
        inputParameters: value,
        predictionDate: new Date().toISOString(),
        methodology: 'Multi-factor regression model considering rainfall, temperature, soil, and fertilizer factors'
      }
    });
  } catch (error) {
    console.error('Error predicting yield:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get historical comparison data
const getHistoricalComparison = async (inputData) => {
  try {
    // Find similar crops in the database
    const similarCrops = await Crop.find({
      cropType: inputData.cropType,
      season: inputData.season,
      'location.state': inputData.location.state,
      actualYield: { $exists: true, $ne: null }
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

    if (similarCrops.length === 0) {
      return {
        averageYield: null,
        recordCount: 0,
        yieldRange: { min: null, max: null },
        message: 'No historical data available for similar conditions'
      };
    }

    const yields = similarCrops.map(crop => crop.actualYield);
    const averageYield = yields.reduce((sum, yield) => sum + yield, 0) / yields.length;
    const minYield = Math.min(...yields);
    const maxYield = Math.max(...yields);

    return {
      averageYield: Math.round(averageYield * 100) / 100,
      recordCount: similarCrops.length,
      yieldRange: {
        min: Math.round(minYield * 100) / 100,
        max: Math.round(maxYield * 100) / 100
      },
      recentCrops: similarCrops.slice(0, 5).map(crop => ({
        id: crop._id,
        actualYield: crop.actualYield,
        predictedYield: crop.predictedYield,
        area: crop.area,
        plantingDate: crop.plantingDate,
        accuracy: crop.predictedYield && crop.actualYield ? 
          Math.round((1 - Math.abs(crop.predictedYield - crop.actualYield) / crop.actualYield) * 100) : null
      }))
    };
  } catch (error) {
    console.error('Error getting historical comparison:', error);
    return {
      averageYield: null,
      recordCount: 0,
      yieldRange: { min: null, max: null },
      message: 'Error retrieving historical data'
    };
  }
};

// Generate recommendations based on input parameters
const generateRecommendations = (crop, historicalData) => {
  const recommendations = [];

  // Rainfall recommendations
  const rainfallFactor = crop.getRainfallFactor();
  if (rainfallFactor < 0.8) {
    if (crop.rainfall < 500) {
      recommendations.push({
        category: 'Irrigation',
        priority: 'High',
        message: 'Consider supplemental irrigation due to low rainfall',
        impact: 'Could improve yield by 15-25%'
      });
    } else {
      recommendations.push({
        category: 'Water Management',
        priority: 'Medium',
        message: 'Monitor soil moisture levels regularly',
        impact: 'Prevents water stress'
      });
    }
  }

  // Temperature recommendations
  const tempFactor = crop.getTemperatureFactor();
  if (tempFactor < 0.8) {
    if (crop.temperature.average > 35) {
      recommendations.push({
        category: 'Heat Management',
        priority: 'High',
        message: 'Consider shade nets or mulching to reduce heat stress',
        impact: 'Could prevent 10-20% yield loss'
      });
    } else if (crop.temperature.average < 15) {
      recommendations.push({
        category: 'Cold Protection',
        priority: 'Medium',
        message: 'Consider row covers or greenhouse cultivation',
        impact: 'Protects against cold damage'
      });
    }
  }

  // Fertilizer recommendations
  const fertilizerFactor = crop.getFertilizerFactor();
  const totalFertilizer = crop.fertilizer.nitrogen + crop.fertilizer.phosphorus + 
                         crop.fertilizer.potassium + crop.fertilizer.organic;
  
  if (fertilizerFactor < 0.9) {
    if (totalFertilizer < 50) {
      recommendations.push({
        category: 'Fertilization',
        priority: 'High',
        message: 'Increase fertilizer application for better yield',
        impact: 'Could improve yield by 20-30%',
        suggestion: 'Consider balanced NPK fertilizer with organic supplements'
      });
    }
  }

  // Soil recommendations
  const soilFactor = crop.getSoilFactor();
  if (soilFactor < 0.9) {
    recommendations.push({
      category: 'Soil Management',
      priority: 'Medium',
      message: `${crop.soilType} soil may benefit from amendments`,
      impact: 'Improves soil structure and nutrient availability',
      suggestion: 'Consider organic matter addition and soil testing'
    });
  }

  // pH recommendations
  if (crop.pH < 6.0 || crop.pH > 8.0) {
    recommendations.push({
      category: 'Soil pH',
      priority: 'Medium',
      message: `Soil pH (${crop.pH}) is not optimal for ${crop.cropType}`,
      impact: 'pH adjustment can improve nutrient uptake',
      suggestion: crop.pH < 6.0 ? 'Consider lime application' : 'Consider sulfur application'
    });
  }

  // Historical comparison recommendations
  if (historicalData.averageYield && historicalData.recordCount > 3) {
    const predictedYield = crop.calculatePredictedYield();
    if (predictedYield < historicalData.averageYield * 0.8) {
      recommendations.push({
        category: 'Performance',
        priority: 'High',
        message: 'Predicted yield is below historical average for similar conditions',
        impact: 'Review all factors for optimization',
        suggestion: 'Consider consulting local agricultural extension services'
      });
    }
  }

  // Season-specific recommendations
  if (crop.season === 'Kharif' && crop.rainfall < 800) {
    recommendations.push({
      category: 'Seasonal',
      priority: 'Medium',
      message: 'Kharif crops typically require higher rainfall',
      impact: 'Adequate water supply is crucial for Kharif season',
      suggestion: 'Ensure irrigation backup is available'
    });
  }

  return recommendations.slice(0, 6); // Limit to top 6 recommendations
};

// Calculate confidence score for prediction
const calculateConfidenceScore = (crop, historicalData) => {
  let confidence = 0.5; // Base confidence

  // Historical data availability boosts confidence
  if (historicalData.recordCount > 5) {
    confidence += 0.2;
  } else if (historicalData.recordCount > 0) {
    confidence += 0.1;
  }

  // Factor-based confidence adjustment
  const factors = [
    crop.getRainfallFactor(),
    crop.getTemperatureFactor(),
    crop.getFertilizerFactor(),
    crop.getSoilFactor()
  ];

  const avgFactor = factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
  
  // Higher factors mean conditions are more optimal, increasing confidence
  if (avgFactor > 0.9) {
    confidence += 0.2;
  } else if (avgFactor > 0.7) {
    confidence += 0.1;
  } else if (avgFactor < 0.5) {
    confidence -= 0.1;
  }

  // Ensure confidence is between 0 and 1
  return Math.max(0.3, Math.min(0.95, confidence));
};

// Get yield trends and analytics
const getYieldAnalytics = async (req, res) => {
  try {
    const { cropType, season, state, year } = req.query;
    
    // Build match filter
    const matchFilter = {};
    if (cropType) matchFilter.cropType = cropType;
    if (season) matchFilter.season = season;
    if (state) matchFilter['location.state'] = new RegExp(state, 'i');
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      matchFilter.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Monthly trends
    const monthlyTrends = await Crop.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          avgPredictedYield: { $avg: '$predictedYield' },
          avgActualYield: { $avg: '$actualYield' },
          totalArea: { $sum: '$area' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Yield vs factors correlation
    const correlationData = await Crop.aggregate([
      { $match: { ...matchFilter, actualYield: { $exists: true } } },
      {
        $project: {
          actualYield: 1,
          rainfall: 1,
          avgTemperature: '$temperature.average',
          totalFertilizer: {
            $add: ['$fertilizer.nitrogen', '$fertilizer.phosphorus', '$fertilizer.potassium', '$fertilizer.organic']
          },
          pH: 1,
          humidity: 1
        }
      }
    ]);

    // Top performing regions
    const topRegions = await Crop.aggregate([
      { $match: { ...matchFilter, actualYield: { $exists: true } } },
      {
        $group: {
          _id: {
            state: '$location.state',
            district: '$location.district'
          },
          avgYield: { $avg: '$actualYield' },
          totalArea: { $sum: '$area' },
          count: { $sum: 1 }
        }
      },
      { $match: { count: { $gte: 3 } } }, // Only regions with at least 3 records
      { $sort: { avgYield: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        monthlyTrends,
        correlationData: correlationData.slice(0, 100), // Limit data size
        topRegions,
        summary: {
          totalRecords: correlationData.length,
          analysisDate: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Error fetching yield analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  predictYield,
  getYieldAnalytics
};
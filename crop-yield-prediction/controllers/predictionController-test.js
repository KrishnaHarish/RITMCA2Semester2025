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

// Crop yield calculation functions (standalone versions)
const getBaseYield = (cropType) => {
  const baseYields = {
    'Rice': 4.5,
    'Wheat': 3.2,
    'Corn': 5.8,
    'Barley': 2.8,
    'Soybeans': 2.5,
    'Cotton': 1.8,
    'Sugarcane': 70,
    'Potato': 25,
    'Tomato': 40,
    'Other': 3.0
  };
  return baseYields[cropType] || 3.0;
};

const getRainfallFactor = (cropType, rainfall) => {
  const optimalRainfall = {
    'Rice': { min: 1200, max: 1800 },
    'Wheat': { min: 400, max: 600 },
    'Corn': { min: 600, max: 1000 },
    'Barley': { min: 300, max: 500 },
    'Soybeans': { min: 500, max: 800 },
    'Cotton': { min: 600, max: 1200 },
    'Sugarcane': { min: 1200, max: 1500 },
    'Potato': { min: 400, max: 600 },
    'Tomato': { min: 400, max: 700 },
    'Other': { min: 500, max: 800 }
  };
  
  const optimal = optimalRainfall[cropType] || { min: 500, max: 800 };
  if (rainfall >= optimal.min && rainfall <= optimal.max) {
    return 1.0;
  } else if (rainfall < optimal.min) {
    return Math.max(0.3, rainfall / optimal.min);
  } else {
    return Math.max(0.4, optimal.max / rainfall);
  }
};

const getTemperatureFactor = (cropType, avgTemp) => {
  const optimalTemp = {
    'Rice': { min: 20, max: 35 },
    'Wheat': { min: 15, max: 25 },
    'Corn': { min: 18, max: 30 },
    'Barley': { min: 10, max: 20 },
    'Soybeans': { min: 20, max: 30 },
    'Cotton': { min: 25, max: 35 },
    'Sugarcane': { min: 25, max: 35 },
    'Potato': { min: 15, max: 25 },
    'Tomato': { min: 18, max: 28 },
    'Other': { min: 18, max: 28 }
  };
  
  const optimal = optimalTemp[cropType] || { min: 18, max: 28 };
  
  if (avgTemp >= optimal.min && avgTemp <= optimal.max) {
    return 1.0;
  } else if (avgTemp < optimal.min) {
    return Math.max(0.4, avgTemp / optimal.min);
  } else {
    return Math.max(0.4, optimal.max / avgTemp);
  }
};

const getFertilizerFactor = (fertilizer) => {
  const totalFertilizer = fertilizer.nitrogen + fertilizer.phosphorus + 
                         fertilizer.potassium + fertilizer.organic;
  
  if (totalFertilizer >= 50 && totalFertilizer <= 200) {
    return 1.0 + (totalFertilizer - 50) * 0.002;
  } else if (totalFertilizer < 50) {
    return 0.7 + (totalFertilizer / 50) * 0.3;
  } else {
    return Math.max(0.8, 1.3 - (totalFertilizer - 200) * 0.001);
  }
};

const getSoilFactor = (soilType) => {
  const soilFactors = {
    'Alluvial': 1.2,
    'Clay': 0.9,
    'Sandy': 0.8,
    'Loamy': 1.1,
    'Red': 0.9,
    'Black': 1.0,
    'Laterite': 0.7,
    'Desert': 0.5
  };
  
  return soilFactors[soilType] || 1.0;
};

const calculatePredictedYield = (data) => {
  const baseYield = getBaseYield(data.cropType);
  const rainfallFactor = getRainfallFactor(data.cropType, data.rainfall);
  const temperatureFactor = getTemperatureFactor(data.cropType, data.temperature.average);
  const fertilizerFactor = getFertilizerFactor(data.fertilizer);
  const soilFactor = getSoilFactor(data.soilType);
  
  return Math.round(baseYield * rainfallFactor * temperatureFactor * fertilizerFactor * soilFactor * 100) / 100;
};

// Mock historical data
const getMockHistoricalData = (inputData) => {
  // Simulate some historical data
  const baseYield = getBaseYield(inputData.cropType);
  const records = Math.floor(Math.random() * 15) + 5; // 5-20 records
  
  return {
    averageYield: Math.round((baseYield + (Math.random() - 0.5) * 2) * 100) / 100,
    recordCount: records,
    yieldRange: {
      min: Math.round((baseYield * 0.6) * 100) / 100,
      max: Math.round((baseYield * 1.4) * 100) / 100
    },
    recentCrops: [
      {
        id: 'mock1',
        actualYield: Math.round((baseYield + Math.random()) * 100) / 100,
        predictedYield: Math.round((baseYield + Math.random() * 0.5) * 100) / 100,
        area: Math.round((Math.random() * 10 + 1) * 100) / 100,
        plantingDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        accuracy: Math.round((Math.random() * 30 + 70))
      }
    ]
  };
};

// Generate recommendations
const generateRecommendations = (data, _historicalData) => {
  const recommendations = [];
  
  const rainfallFactor = getRainfallFactor(data.cropType, data.rainfall);
  if (rainfallFactor < 0.8) {
    recommendations.push({
      category: 'Irrigation',
      priority: 'High',
      message: 'Consider supplemental irrigation due to suboptimal rainfall',
      impact: 'Could improve yield by 15-25%'
    });
  }
  
  const tempFactor = getTemperatureFactor(data.cropType, data.temperature.average);
  if (tempFactor < 0.8) {
    recommendations.push({
      category: 'Temperature Management',
      priority: 'Medium',
      message: 'Temperature conditions are not optimal for this crop',
      impact: 'Consider microclimate management'
    });
  }
  
  const fertilizerFactor = getFertilizerFactor(data.fertilizer);
  if (fertilizerFactor < 0.9) {
    recommendations.push({
      category: 'Fertilization',
      priority: 'High',
      message: 'Increase fertilizer application for better yield',
      impact: 'Could improve yield by 20-30%'
    });
  }
  
  if (data.pH < 6.0 || data.pH > 8.0) {
    recommendations.push({
      category: 'Soil pH',
      priority: 'Medium',
      message: `Soil pH (${data.pH}) needs adjustment`,
      impact: 'pH correction can improve nutrient uptake'
    });
  }
  
  return recommendations.slice(0, 5);
};

// Calculate confidence score
const calculateConfidenceScore = (data, historicalData) => {
  let confidence = 0.5;
  
  if (historicalData.recordCount > 10) {
    confidence += 0.2;
  } else if (historicalData.recordCount > 5) {
    confidence += 0.1;
  }
  
  const factors = [
    getRainfallFactor(data.cropType, data.rainfall),
    getTemperatureFactor(data.cropType, data.temperature.average),
    getFertilizerFactor(data.fertilizer),
    getSoilFactor(data.soilType)
  ];
  
  const avgFactor = factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
  
  if (avgFactor > 0.9) {
    confidence += 0.2;
  } else if (avgFactor > 0.7) {
    confidence += 0.1;
  }
  
  return Math.max(0.3, Math.min(0.95, confidence));
};

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

    // Calculate predicted yield
    const predictedYield = calculatePredictedYield(value);
    
    // Get mock historical data
    const historicalData = getMockHistoricalData(value);
    
    // Generate recommendations
    const recommendations = generateRecommendations(value, historicalData);
    
    // Calculate confidence score
    const confidenceScore = calculateConfidenceScore(value, historicalData);

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
        methodology: 'Multi-factor regression model considering rainfall, temperature, soil, and fertilizer factors',
        note: 'Demo mode - using simulated historical data'
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

// Get yield analytics (mock version)
const getYieldAnalytics = async (req, res) => {
  try {
    // Generate mock analytics data
    const mockData = {
      monthlyTrends: [
        { _id: { year: 2024, month: 1 }, avgPredictedYield: 4.2, avgActualYield: 3.9, totalArea: 150, count: 12 },
        { _id: { year: 2024, month: 2 }, avgPredictedYield: 4.5, avgActualYield: 4.1, totalArea: 180, count: 15 },
        { _id: { year: 2024, month: 3 }, avgPredictedYield: 4.8, avgActualYield: 4.4, totalArea: 220, count: 18 }
      ],
      correlationData: [
        { actualYield: 4.2, rainfall: 1200, avgTemperature: 28, totalFertilizer: 150, pH: 6.5, humidity: 75 },
        { actualYield: 3.8, rainfall: 800, avgTemperature: 32, totalFertilizer: 100, pH: 7.0, humidity: 65 },
        { actualYield: 5.1, rainfall: 1400, avgTemperature: 26, totalFertilizer: 200, pH: 6.8, humidity: 80 }
      ],
      topRegions: [
        { _id: { state: 'Punjab', district: 'Ludhiana' }, avgYield: 5.2, totalArea: 500, count: 25 },
        { _id: { state: 'Haryana', district: 'Karnal' }, avgYield: 4.8, totalArea: 350, count: 18 },
        { _id: { state: 'Uttar Pradesh', district: 'Meerut' }, avgYield: 4.5, totalArea: 400, count: 20 }
      ]
    };

    res.status(200).json({
      success: true,
      data: {
        ...mockData,
        summary: {
          totalRecords: 50,
          analysisDate: new Date().toISOString(),
          note: 'Demo mode - using simulated data'
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
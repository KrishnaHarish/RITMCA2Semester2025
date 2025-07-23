const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    enum: {
      values: ['Rice', 'Wheat', 'Corn', 'Barley', 'Soybeans', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Other'],
      message: 'Invalid crop type'
    },
    trim: true
  },
  season: {
    type: String,
    required: [true, 'Season is required'],
    enum: {
      values: ['Kharif', 'Rabi', 'Zaid', 'Whole Year'],
      message: 'Invalid season type'
    },
    trim: true
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: [0.1, 'Area must be at least 0.1 hectares'],
    max: [10000, 'Area cannot exceed 10000 hectares']
  },
  rainfall: {
    type: Number,
    required: [true, 'Rainfall data is required'],
    min: [0, 'Rainfall cannot be negative'],
    max: [5000, 'Rainfall seems unrealistic']
  },
  temperature: {
    average: {
      type: Number,
      required: [true, 'Average temperature is required'],
      min: [-20, 'Temperature too low'],
      max: [60, 'Temperature too high']
    },
    min: {
      type: Number,
      required: [true, 'Minimum temperature is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum temperature is required']
    }
  },
  humidity: {
    type: Number,
    required: [true, 'Humidity is required'],
    min: [0, 'Humidity cannot be negative'],
    max: [100, 'Humidity cannot exceed 100%']
  },
  fertilizer: {
    nitrogen: {
      type: Number,
      default: 0,
      min: [0, 'Nitrogen content cannot be negative']
    },
    phosphorus: {
      type: Number,
      default: 0,
      min: [0, 'Phosphorus content cannot be negative']
    },
    potassium: {
      type: Number,
      default: 0,
      min: [0, 'Potassium content cannot be negative']
    },
    organic: {
      type: Number,
      default: 0,
      min: [0, 'Organic fertilizer amount cannot be negative']
    }
  },
  soilType: {
    type: String,
    required: [true, 'Soil type is required'],
    enum: {
      values: ['Alluvial', 'Clay', 'Sandy', 'Loamy', 'Red', 'Black', 'Laterite', 'Desert'],
      message: 'Invalid soil type'
    }
  },
  pH: {
    type: Number,
    required: [true, 'Soil pH is required'],
    min: [0, 'pH cannot be negative'],
    max: [14, 'pH cannot exceed 14']
  },
  actualYield: {
    type: Number,
    min: [0, 'Yield cannot be negative'],
    validate: {
      validator: function(value) {
        // Only validate if actualYield is provided
        return value === undefined || value >= 0;
      },
      message: 'Actual yield must be non-negative'
    }
  },
  predictedYield: {
    type: Number,
    min: [0, 'Predicted yield cannot be negative']
  },
  location: {
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true
    },
    coordinates: {
      latitude: {
        type: Number,
        min: [-90, 'Invalid latitude'],
        max: [90, 'Invalid latitude']
      },
      longitude: {
        type: Number,
        min: [-180, 'Invalid longitude'],
        max: [180, 'Invalid longitude']
      }
    }
  },
  plantingDate: {
    type: Date,
    required: [true, 'Planting date is required']
  },
  harvestDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > this.plantingDate;
      },
      message: 'Harvest date must be after planting date'
    }
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for growing period
cropSchema.virtual('growingPeriod').get(function() {
  if (this.harvestDate && this.plantingDate) {
    return Math.ceil((this.harvestDate - this.plantingDate) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Index for better query performance
cropSchema.index({ cropType: 1, season: 1, 'location.state': 1 });
cropSchema.index({ plantingDate: 1 });
cropSchema.index({ createdAt: -1 });

// Pre-save middleware to calculate predicted yield if not provided
cropSchema.pre('save', function(next) {
  if (!this.predictedYield && !this.isNew) {
    // Simple prediction algorithm - can be enhanced
    this.predictedYield = this.calculatePredictedYield();
  }
  next();
});

// Method to calculate predicted yield
cropSchema.methods.calculatePredictedYield = function() {
  // Simple linear regression model - can be replaced with ML model
  const baseYield = this.getBaseYield();
  const rainfallFactor = this.getRainfallFactor();
  const temperatureFactor = this.getTemperatureFactor();
  const fertilizerFactor = this.getFertilizerFactor();
  const soilFactor = this.getSoilFactor();
  
  return Math.round(baseYield * rainfallFactor * temperatureFactor * fertilizerFactor * soilFactor * 100) / 100;
};

cropSchema.methods.getBaseYield = function() {
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
  return baseYields[this.cropType] || 3.0;
};

cropSchema.methods.getRainfallFactor = function() {
  // Optimal rainfall ranges for different crops
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
  
  const optimal = optimalRainfall[this.cropType] || { min: 500, max: 800 };
  if (this.rainfall >= optimal.min && this.rainfall <= optimal.max) {
    return 1.0;
  } else if (this.rainfall < optimal.min) {
    return Math.max(0.3, this.rainfall / optimal.min);
  } else {
    return Math.max(0.4, optimal.max / this.rainfall);
  }
};

cropSchema.methods.getTemperatureFactor = function() {
  // Temperature optimization factor based on crop type
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
  
  const optimal = optimalTemp[this.cropType] || { min: 18, max: 28 };
  const avgTemp = this.temperature.average;
  
  if (avgTemp >= optimal.min && avgTemp <= optimal.max) {
    return 1.0;
  } else if (avgTemp < optimal.min) {
    return Math.max(0.4, avgTemp / optimal.min);
  } else {
    return Math.max(0.4, optimal.max / avgTemp);
  }
};

cropSchema.methods.getFertilizerFactor = function() {
  const totalFertilizer = this.fertilizer.nitrogen + this.fertilizer.phosphorus + 
                         this.fertilizer.potassium + this.fertilizer.organic;
  
  // Optimal fertilizer ranges (in kg per hectare)
  if (totalFertilizer >= 50 && totalFertilizer <= 200) {
    return 1.0 + (totalFertilizer - 50) * 0.002; // Up to 30% boost
  } else if (totalFertilizer < 50) {
    return 0.7 + (totalFertilizer / 50) * 0.3;
  } else {
    return Math.max(0.8, 1.3 - (totalFertilizer - 200) * 0.001);
  }
};

cropSchema.methods.getSoilFactor = function() {
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
  
  return soilFactors[this.soilType] || 1.0;
};

module.exports = mongoose.model('Crop', cropSchema);
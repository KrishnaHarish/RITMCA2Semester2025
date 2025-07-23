// Mock crop controller for demo purposes
const mockCrops = [
  {
    _id: '1',
    cropType: 'Rice',
    season: 'Kharif',
    area: 5.5,
    rainfall: 1200,
    temperature: { average: 28, min: 22, max: 35 },
    humidity: 75,
    fertilizer: { nitrogen: 120, phosphorus: 60, potassium: 40, organic: 500 },
    soilType: 'Alluvial',
    pH: 6.5,
    location: { state: 'Punjab', district: 'Ludhiana' },
    plantingDate: '2024-06-15',
    harvestDate: '2024-11-20',
    actualYield: 6.2,
    predictedYield: 5.8,
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    cropType: 'Wheat',
    season: 'Rabi',
    area: 3.2,
    rainfall: 450,
    temperature: { average: 20, min: 12, max: 28 },
    humidity: 65,
    fertilizer: { nitrogen: 100, phosphorus: 50, potassium: 30, organic: 300 },
    soilType: 'Loamy',
    pH: 7.0,
    location: { state: 'Haryana', district: 'Karnal' },
    plantingDate: '2023-11-10',
    harvestDate: '2024-04-15',
    actualYield: 4.8,
    predictedYield: 4.5,
    createdAt: new Date('2024-02-10')
  }
];

// Get all crops with filtering and pagination
const getAllCrops = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      cropType, 
      season, 
      state, 
      district
    } = req.query;

    let filteredCrops = [...mockCrops];
    
    if (cropType) {
      filteredCrops = filteredCrops.filter(crop => crop.cropType === cropType);
    }
    if (season) {
      filteredCrops = filteredCrops.filter(crop => crop.season === season);
    }
    if (state) {
      filteredCrops = filteredCrops.filter(crop => 
        crop.location.state.toLowerCase().includes(state.toLowerCase())
      );
    }
    if (district) {
      filteredCrops = filteredCrops.filter(crop => 
        crop.location.district.toLowerCase().includes(district.toLowerCase())
      );
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedCrops = filteredCrops.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        crops: paginatedCrops,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(filteredCrops.length / parseInt(limit)),
          total: filteredCrops.length,
          hasNext: endIndex < filteredCrops.length,
          hasPrev: parseInt(page) > 1
        }
      },
      note: 'Demo mode - using mock data'
    });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get crop by ID
const getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = mockCrops.find(c => c._id === id);
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      data: crop,
      note: 'Demo mode - using mock data'
    });
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new crop (mock)
const createCrop = async (req, res) => {
  try {
    const newCrop = {
      _id: (mockCrops.length + 1).toString(),
      ...req.body,
      createdAt: new Date(),
      predictedYield: Math.round((Math.random() * 3 + 3) * 100) / 100 // Mock calculation
    };

    // In a real app, this would be saved to database
    // mockCrops.push(newCrop);

    res.status(201).json({
      success: true,
      message: 'Crop created successfully (demo mode)',
      data: newCrop,
      note: 'Demo mode - data not persisted'
    });
  } catch (error) {
    console.error('Error creating crop:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update crop (mock)
const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = mockCrops.find(c => c._id === id);
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    const updatedCrop = { ...crop, ...req.body };

    res.status(200).json({
      success: true,
      message: 'Crop updated successfully (demo mode)',
      data: updatedCrop,
      note: 'Demo mode - data not persisted'
    });
  } catch (error) {
    console.error('Error updating crop:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete crop (mock)
const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = mockCrops.find(c => c._id === id);
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully (demo mode)',
      note: 'Demo mode - data not persisted'
    });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get crop statistics (mock)
const getCropStatistics = async (req, res) => {
  try {
    const stats = {
      overall: {
        totalCrops: mockCrops.length,
        totalArea: mockCrops.reduce((sum, crop) => sum + crop.area, 0),
        avgPredictedYield: mockCrops.reduce((sum, crop) => sum + crop.predictedYield, 0) / mockCrops.length,
        avgActualYield: mockCrops.reduce((sum, crop) => sum + crop.actualYield, 0) / mockCrops.length,
        avgRainfall: mockCrops.reduce((sum, crop) => sum + crop.rainfall, 0) / mockCrops.length,
        avgTemperature: mockCrops.reduce((sum, crop) => sum + crop.temperature.average, 0) / mockCrops.length,
        maxYield: Math.max(...mockCrops.map(crop => crop.predictedYield)),
        minYield: Math.min(...mockCrops.map(crop => crop.predictedYield))
      },
      cropDistribution: [
        { _id: 'Rice', count: 1, totalArea: 5.5, avgYield: 5.8 },
        { _id: 'Wheat', count: 1, totalArea: 3.2, avgYield: 4.5 }
      ],
      seasonalDistribution: [
        { _id: 'Kharif', count: 1, avgYield: 5.8 },
        { _id: 'Rabi', count: 1, avgYield: 4.5 }
      ]
    };

    res.status(200).json({
      success: true,
      data: stats,
      note: 'Demo mode - using mock data'
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
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
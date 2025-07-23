const express = require('express');
const {
  predictYield,
  getYieldAnalytics
} = require('../controllers/predictionController');

const router = express.Router();

/**
 * @route   POST /api/v1/predictions/yield
 * @desc    Predict crop yield based on input parameters
 * @access  Public
 * @body    Prediction parameters (cropType, season, area, rainfall, temperature, etc.)
 */
router.post('/yield', predictYield);

/**
 * @route   GET /api/v1/predictions/analytics
 * @desc    Get yield trends and analytics
 * @access  Public
 * @query   cropType, season, state, year
 */
router.get('/analytics', getYieldAnalytics);

module.exports = router;
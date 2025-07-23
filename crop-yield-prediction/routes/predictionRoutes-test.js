const express = require('express');
const {
  predictYield,
  getYieldAnalytics
} = require('../controllers/predictionController-test');

const router = express.Router();

/**
 * @route   POST /api/v1/predictions/yield
 * @desc    Predict crop yield based on input parameters (Demo Mode)
 * @access  Public
 */
router.post('/yield', predictYield);

/**
 * @route   GET /api/v1/predictions/analytics
 * @desc    Get yield trends and analytics (Demo Mode)
 * @access  Public
 */
router.get('/analytics', getYieldAnalytics);

module.exports = router;
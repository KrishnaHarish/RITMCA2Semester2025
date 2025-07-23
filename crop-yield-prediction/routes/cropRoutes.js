const express = require('express');
const {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getCropStatistics
} = require('../controllers/cropController');

const router = express.Router();

/**
 * @route   GET /api/v1/crops
 * @desc    Get all crops with filtering and pagination
 * @access  Public
 * @query   page, limit, cropType, season, state, district, sortBy, sortOrder
 */
router.get('/', getAllCrops);

/**
 * @route   GET /api/v1/crops/statistics
 * @desc    Get crop statistics and analytics
 * @access  Public
 * @query   cropType, season, state
 */
router.get('/statistics', getCropStatistics);

/**
 * @route   GET /api/v1/crops/:id
 * @desc    Get crop by ID
 * @access  Public
 */
router.get('/:id', getCropById);

/**
 * @route   POST /api/v1/crops
 * @desc    Create new crop entry
 * @access  Public
 * @body    Crop data object
 */
router.post('/', createCrop);

/**
 * @route   PUT /api/v1/crops/:id
 * @desc    Update crop by ID
 * @access  Public
 * @body    Updated crop data object
 */
router.put('/:id', updateCrop);

/**
 * @route   DELETE /api/v1/crops/:id
 * @desc    Delete crop by ID
 * @access  Public
 */
router.delete('/:id', deleteCrop);

module.exports = router;
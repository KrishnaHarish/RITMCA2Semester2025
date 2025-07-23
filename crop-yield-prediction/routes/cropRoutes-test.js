const express = require('express');
const {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getCropStatistics
} = require('../controllers/cropController-test');

const router = express.Router();

/**
 * @route   GET /api/v1/crops
 * @desc    Get all crops with filtering and pagination (Demo Mode)
 * @access  Public
 */
router.get('/', getAllCrops);

/**
 * @route   GET /api/v1/crops/statistics
 * @desc    Get crop statistics and analytics (Demo Mode)
 * @access  Public
 */
router.get('/statistics', getCropStatistics);

/**
 * @route   GET /api/v1/crops/:id
 * @desc    Get crop by ID (Demo Mode)
 * @access  Public
 */
router.get('/:id', getCropById);

/**
 * @route   POST /api/v1/crops
 * @desc    Create new crop entry (Demo Mode)
 * @access  Public
 */
router.post('/', createCrop);

/**
 * @route   PUT /api/v1/crops/:id
 * @desc    Update crop by ID (Demo Mode)
 * @access  Public
 */
router.put('/:id', updateCrop);

/**
 * @route   DELETE /api/v1/crops/:id
 * @desc    Delete crop by ID (Demo Mode)
 * @access  Public
 */
router.delete('/:id', deleteCrop);

module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * GET /api/admin/bookings
 * Get all bookings
 */
router.get('/bookings', adminController.getAllBookings);

module.exports = router;

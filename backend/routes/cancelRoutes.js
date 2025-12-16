const express = require('express');
const router = express.Router();
const cancelController = require('../controllers/cancelController');

/**
 * POST /api/cancel
 * Cancel a booking
 */
router.post('/', cancelController.cancelBooking);

module.exports = router;

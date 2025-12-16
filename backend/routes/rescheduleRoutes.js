const express = require('express');
const router = express.Router();
const rescheduleController = require('../controllers/rescheduleController');

/**
 * POST /api/reschedule
 * Reschedule a booking to a new slot
 */
router.post('/', rescheduleController.rescheduleBooking);

module.exports = router;

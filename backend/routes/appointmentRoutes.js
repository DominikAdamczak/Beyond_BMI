const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// GET /api/appointments - Get all available appointment slots
router.get('/', appointmentController.getAvailableAppointments);

module.exports = router;

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST /api/pay - Process payment for a booking
router.post('/', paymentController.processPayment);

module.exports = router;

const express = require('express');
const router = express.Router();

const appointmentRoutes = require('./appointmentRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');

// Mount routes
router.use('/appointments', appointmentRoutes);
router.use('/book', bookingRoutes);
router.use('/pay', paymentRoutes);

module.exports = router;

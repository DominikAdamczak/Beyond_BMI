const express = require('express');
const router = express.Router();

const appointmentRoutes = require('./appointmentRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const cancelRoutes = require('./cancelRoutes');
const rescheduleRoutes = require('./rescheduleRoutes');
const adminRoutes = require('./adminRoutes');

// Mount routes
router.use('/appointments', appointmentRoutes);
router.use('/book', bookingRoutes);
router.use('/pay', paymentRoutes);
router.use('/cancel', cancelRoutes);
router.use('/reschedule', rescheduleRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

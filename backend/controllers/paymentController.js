const paymentService = require('../services/paymentService');
const bookingService = require('../services/bookingService');

/**
 * Process payment for a booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const processPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Validate bookingId
    if (!bookingId) {
      return res.status(400).json({ error: 'Missing bookingId' });
    }

    // Find booking
    const booking = bookingService.findBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if already paid
    if (booking.paid) {
      return res.status(400).json({ error: 'Booking already paid' });
    }

    // Process payment
    const amount = paymentService.getConsultationAmount();
    const paymentResult = await paymentService.processPayment(amount);

    // Mark booking as paid
    bookingService.markBookingAsPaid(bookingId);

    res.json({ success: true, ...paymentResult });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
};

module.exports = {
  processPayment,
};

const bookingService = require('../services/bookingService');
const appointmentService = require('../services/appointmentService');

/**
 * Cancel a booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const cancelBooking = (req, res) => {
  try {
    const { bookingId } = req.body;

    // Validate required field
    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    // Find the booking
    const booking = bookingService.findBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Release the slot
    appointmentService.markSlotAsAvailable(booking.slotId);

    // Cancel the booking
    const result = bookingService.cancelBooking(bookingId);

    if (result.success) {
      res.json({
        success: true,
        message: 'Booking cancelled successfully',
        booking: result.booking,
      });
    } else {
      res.status(500).json({ error: 'Failed to cancel booking' });
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};

module.exports = {
  cancelBooking,
};

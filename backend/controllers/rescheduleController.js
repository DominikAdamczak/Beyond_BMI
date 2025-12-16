const bookingService = require('../services/bookingService');
const appointmentService = require('../services/appointmentService');

/**
 * Reschedule a booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const rescheduleBooking = (req, res) => {
  try {
    const { bookingId, newSlotId } = req.body;

    // Validate required fields
    if (!bookingId || !newSlotId) {
      return res.status(400).json({ 
        error: 'Missing required fields: bookingId, newSlotId' 
      });
    }

    // Find the booking
    const booking = bookingService.findBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if new slot is available
    if (!appointmentService.isSlotAvailable(newSlotId)) {
      return res.status(400).json({ 
        error: 'New slot not available or does not exist' 
      });
    }

    const oldSlotId = booking.slotId;

    // Reschedule the booking
    const result = bookingService.rescheduleBooking(bookingId, newSlotId);

    if (result.success) {
      // Release the old slot
      appointmentService.markSlotAsAvailable(oldSlotId);
      
      // Mark the new slot as unavailable
      appointmentService.markSlotAsUnavailable(newSlotId);

      res.json({
        success: true,
        message: 'Booking rescheduled successfully',
        booking: result.booking,
      });
    } else {
      res.status(500).json({ error: 'Failed to reschedule booking' });
    }
  } catch (error) {
    console.error('Error rescheduling booking:', error);
    res.status(500).json({ error: 'Failed to reschedule booking' });
  }
};

module.exports = {
  rescheduleBooking,
};

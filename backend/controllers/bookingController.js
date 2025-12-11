const bookingService = require('../services/bookingService');
const appointmentService = require('../services/appointmentService');
const { emailRegex } = require('../config/constants');

/**
 * Create a new booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createBooking = (req, res) => {
  try {
    const { name, email, slotId } = req.body;

    // Validate required fields
    if (!name || !email || !slotId) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, slotId' 
      });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if slot is available
    if (!appointmentService.isSlotAvailable(slotId)) {
      return res.status(400).json({ 
        error: 'Slot not available or does not exist' 
      });
    }

    // Create booking
    const booking = bookingService.createBooking(name, email, slotId);

    // Mark slot as unavailable
    appointmentService.markSlotAsUnavailable(slotId);

    res.json({ bookingId: booking.id });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

module.exports = {
  createBooking,
};

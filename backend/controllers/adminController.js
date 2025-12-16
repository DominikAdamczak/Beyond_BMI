const bookingService = require('../services/bookingService');

/**
 * Get all bookings (admin endpoint)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllBookings = (req, res) => {
  try {
    const bookings = bookingService.getAllBookings();
    res.json({
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

module.exports = {
  getAllBookings,
};

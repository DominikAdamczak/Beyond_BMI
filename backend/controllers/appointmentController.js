const appointmentService = require('../services/appointmentService');

/**
 * Get all available appointment slots
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAvailableAppointments = (req, res) => {
  try {
    const availableSlots = appointmentService.getAvailableSlots();
    res.json(availableSlots);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

module.exports = {
  getAvailableAppointments,
};

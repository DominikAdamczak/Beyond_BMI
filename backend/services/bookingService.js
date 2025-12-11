// In-memory data storage for bookings
let bookings = [];

/**
 * Create a new booking
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {number|string} slotId - The slot ID to book
 * @returns {Object} The created booking object
 */
const createBooking = (name, email, slotId) => {
  const booking = {
    id: Date.now().toString(),
    name,
    email,
    slotId,
    paid: false,
  };
  bookings.push(booking);
  return booking;
};

/**
 * Find a booking by ID
 * @param {string} bookingId - The booking ID to find
 * @returns {Object|undefined} The booking object or undefined if not found
 */
const findBookingById = (bookingId) => {
  return bookings.find(b => b.id == bookingId);
};

/**
 * Mark a booking as paid
 * @param {string} bookingId - The booking ID to mark as paid
 * @returns {boolean} True if successful, false otherwise
 */
const markBookingAsPaid = (bookingId) => {
  const booking = findBookingById(bookingId);
  if (booking) {
    booking.paid = true;
    return true;
  }
  return false;
};

/**
 * Get all bookings
 * @returns {Array} Array of all bookings
 */
const getAllBookings = () => {
  return bookings;
};

module.exports = {
  createBooking,
  findBookingById,
  markBookingAsPaid,
  getAllBookings,
};

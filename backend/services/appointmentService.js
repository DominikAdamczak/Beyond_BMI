// In-memory data storage for slots
let slots = [
  { id: 1, date: '2023-12-01', time: '10:00', available: true },
  { id: 2, date: '2023-12-01', time: '11:00', available: true },
  { id: 3, date: '2023-12-02', time: '10:00', available: true },
];

/**
 * Get all available appointment slots
 * @returns {Array} Array of available slots
 */
const getAvailableSlots = () => {
  return slots.filter(slot => slot.available);
};

/**
 * Find a slot by ID
 * @param {number|string} slotId - The slot ID to find
 * @returns {Object|undefined} The slot object or undefined if not found
 */
const findSlotById = (slotId) => {
  return slots.find(s => s.id == slotId);
};

/**
 * Mark a slot as unavailable
 * @param {number|string} slotId - The slot ID to mark as unavailable
 * @returns {boolean} True if successful, false otherwise
 */
const markSlotAsUnavailable = (slotId) => {
  const slot = findSlotById(slotId);
  if (slot) {
    slot.available = false;
    return true;
  }
  return false;
};

/**
 * Check if a slot is available
 * @param {number|string} slotId - The slot ID to check
 * @returns {boolean} True if available, false otherwise
 */
const isSlotAvailable = (slotId) => {
  const slot = findSlotById(slotId);
  return slot && slot.available;
};

module.exports = {
  getAvailableSlots,
  findSlotById,
  markSlotAsUnavailable,
  isSlotAvailable,
};

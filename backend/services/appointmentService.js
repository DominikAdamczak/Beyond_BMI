// In-memory data storage for slots
let slots = [
  { id: 1, date: '2024-12-20', time: '10:00 AM', available: true },
  { id: 2, date: '2024-12-20', time: '11:00 AM', available: true },
  { id: 3, date: '2024-12-20', time: '02:00 PM', available: true },
  { id: 4, date: '2024-12-21', time: '09:00 AM', available: true },
  { id: 5, date: '2024-12-21', time: '10:00 AM', available: true },
  { id: 6, date: '2024-12-21', time: '03:00 PM', available: true },
  { id: 7, date: '2024-12-22', time: '10:00 AM', available: true },
  { id: 8, date: '2024-12-22', time: '11:00 AM', available: true },
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

/**
 * Mark a slot as available (release it)
 * @param {number|string} slotId - The slot ID to mark as available
 * @returns {boolean} True if successful, false otherwise
 */
const markSlotAsAvailable = (slotId) => {
  const slot = findSlotById(slotId);
  if (slot) {
    slot.available = true;
    return true;
  }
  return false;
};

module.exports = {
  getAvailableSlots,
  findSlotById,
  markSlotAsUnavailable,
  markSlotAsAvailable,
  isSlotAvailable,
};

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server configuration
const PORT = process.env.PORT || 3000;

// Payment configuration
const CONSULTATION_AMOUNT = 5000; // $50 in cents

module.exports = {
  emailRegex,
  PORT,
  CONSULTATION_AMOUNT,
};

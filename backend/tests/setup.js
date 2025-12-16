// Load environment variables for tests
require('dotenv').config();

// Mock Stripe if no key is provided
if (!process.env.STRIPE_SECRET_KEY) {
  process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key_for_testing';
}

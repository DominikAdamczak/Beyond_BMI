const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Process payment for a booking
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code (e.g., 'usd')
 * @returns {Promise<Object>} Payment result object
 */
const processPayment = async (amount, currency = 'usd') => {
  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "always"
      },
    });

    // Confirm the payment intent
    await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: 'pm_card_visa',
      return_url: 'https://www.example.com',
    });

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    throw new Error('Payment failed');
  }
};

/**
 * Get payment amount for consultation
 * @returns {number} Amount in cents
 */
const getConsultationAmount = () => {
  return 5000; // $50
};

module.exports = {
  processPayment,
  getConsultationAmount,
};

const Stripe = require('stripe');
const logger = require('../config/logger');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
    });
    return paymentIntent;
  } catch (err) {
    logger.error({ message: 'Stripe payment intent creation failed', error: err.message });
    throw err;
  }
};

const createCustomer = async (email, name) => {
  try {
    return await stripe.customers.create({ email, name });
  } catch (err) {
    logger.error({ message: 'Stripe customer creation failed', error: err.message });
    throw err;
  }
};

const constructWebhookEvent = (payload, sig, endpointSecret) => {
  try {
    return stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    logger.error({ message: 'Stripe webhook verification failed', error: err.message });
    throw err;
  }
};

module.exports = {
  createPaymentIntent,
  createCustomer,
  constructWebhookEvent,
};

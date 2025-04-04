const axios = require("axios");
require("dotenv").config();
const Payment = require("../models/Payment.model");

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY; // Store your secret key in an environment variable
const FLW_BASE_URL = "https://api.flutterwave.com/v3";

/**
 * Verify a transaction with Flutterwave
 * @param {string} transactionId - The Flutterwave transaction ID
 *  @param {string} userId - The ID of the user making the payment.
 * @returns {Promise<Object>} - The transaction details
 */
const verifyAndSaveTransaction = async ({ transactionId, userId }) => {
  try {
    const response = await axios.get(
      `${FLW_BASE_URL}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
        },
      }
    );

    const data = response.data;

    if (data.status !== "success") {
      throw new Error("Payment verification failed");
    }

    const paymentExists = await Payment.findOne({ transactionId });
    if (paymentExists) {
      return paymentExists; // Avoid duplicate payments
    }

    const payment = new Payment({
      user: userId,
      transactionId,
      amount: data.data.amount,
      currency: data.data.currency,
      status: data.data.status,
      paymentMethod: data.data.payment_type,
      reference: data.data.tx_ref,
    });

    await payment.save();
    return payment;
  } catch (error) {
    console.error(
      "Error verifying transaction:",
      error.response?.data || error.message
    );
    throw new Error("Transaction verification failed");
  }
};

module.exports = { verifyAndSaveTransaction };

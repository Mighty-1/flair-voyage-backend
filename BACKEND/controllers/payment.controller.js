const { verifyAndSaveTransaction } = require("../services/payment.service");

/**
 * Handles transaction verification and stores successful payments.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const verifyPayment = async (req, res) => {
  const { transactionId } = req.params; // Get transaction ID from request parameters
  //const { userId } = req.query; // Get userId from query params
  const userId = req.user.id; // Get user ID from request user object (assuming it exists)

  if (!transactionId || !userId) {
    return res.status(400).json({ message: "Transaction ID is required" });
  }

  try {
    const payment = await verifyAndSaveTransaction({
      transactionId,
      userId,
    });

    if (payment.status === "successful") {
      return res.status(200).json({
        message: "Payment verified successfully and Saved",
        data: payment,
      });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyPayment };

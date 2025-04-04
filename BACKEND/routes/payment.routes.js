const express = require("express");
const { verifyPayment } = require("../controllers/payment.controller");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for verifying transactions
router.get(
  "/flutterwave/verify-payment/:transactionId",
  protect,
  //   (req, res, next) => {
  //     req.userId = req.query.userId; // Extract userId from query
  //     next();
  //   },
  verifyPayment
);

module.exports = router;

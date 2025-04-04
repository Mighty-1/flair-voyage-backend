const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Link payment to a user
    transactionId: { type: String, required: true, unique: true }, // Flutterwave transaction ID
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["successful", "failed", "pending"],
    }, // Payment status
    paymentMethod: { type: String, required: true }, // Card, mobile money, etc.
    reference: { type: String, required: true }, // Transaction reference
  },
  { timestamps: true } // Automatically add createdAt & updatedAt fields
);

module.exports = mongoose.model("Payment", paymentSchema);

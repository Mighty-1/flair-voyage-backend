const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    yacht: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Yacht",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Yacht",
      required: true, // Reference to the booking's agent or owner
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    payment: {
      type: String,
      enum: ["paid", "reserve"],
      default: "reserve",
    },
    price: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^\+\d{1,3}-\d{1,14}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number.`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

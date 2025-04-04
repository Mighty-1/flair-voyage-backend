const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const protect = require("../middlewares/authMiddleware");

// Get all bookings for the logged-in user
router.get("/get-all-bookings", protect, bookingController.getUserBookings);

// Create a new booking
router.post("/create-new-booking", protect, bookingController.createNewBooking);

// Cancel a booking
router.delete(
  "/cancel-booking/:bookingId",
  protect,
  bookingController.cancelUserBooking
);

router.get("/agent/orders", protect, bookingController.getAgentOrders);

router.put("/orders/:orderId/confirm", protect, bookingController.confirmOrder);

router.put("/orders/:orderId/cancel", protect, bookingController.cancelOrder);

module.exports = router;

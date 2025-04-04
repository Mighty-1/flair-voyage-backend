const Booking = require("../models/Booking.model");
const Yacht = require("../models/Yacht.model");

// Fetch all bookings for a user
const getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId }).populate(
    "yacht",
    " name price, date, time"
  );
};

// Create a new booking
const createBooking = async ({
  userId,
  yachtId,
  date,
  time,
  payment,
  phoneNumber,
}) => {
  // Check if yacht is available
  const yacht = await Yacht.findById(yachtId);
  if (!yacht) {
    throw new Error("Yacht not found");
  }

  const booking = new Booking({
    user: userId,
    yacht: yachtId,
    agent: yacht.owner,
    date,
    time,
    payment,
    phoneNumber,
    price: yacht.price,
  });

  return await booking.save();
};

// Cancel a booking
const cancelBooking = async (bookingId, userId) => {
  // Check if booking exists
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) {
    throw new Error("Booking not found or not authorized");
  }

  booking.status = "cancelled";
  return await booking.save();
};

const getAgentOrders = async (agentId) => {
  return await Booking.find({ agent: agentId })
    .populate("user", "name email phoneNumber")
    .populate("yacht", "name date time price payment status location");
};

/**
 * Update the order's status to "confirmed".
 * @param {string} orderId - The ID of the booking to update.
 * @returns {Promise<Object>} - The updated booking document.
 */
const confirmAgentOrder = async (orderId) => {
  return await Booking.findByIdAndUpdate(
    orderId,
    { status: "confirmed" },
    { new: true }
  );
};

const cancelOrder = async (orderId) => {
  return await Booking.findByIdAndUpdate(
    orderId,
    { status: "cancelled" },
    { new: true }
  );
};

module.exports = {
  getBookingsByUser,
  createBooking,
  cancelBooking,
  getAgentOrders,
  confirmAgentOrder,
  cancelOrder,
};

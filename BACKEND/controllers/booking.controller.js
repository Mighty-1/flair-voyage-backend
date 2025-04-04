const bookingService = require("../services/booking.service");

// Get all bookings for the logged in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookingsByUser(req.user._id);
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new booking
const createNewBooking = async (req, res) => {
  const { yachtId, date, time, payment, phoneNumber } = req.body;
  try {
    const booking = await bookingService.createBooking({
      userId: req.user.id,
      yachtId,
      date,
      time,
      payment,
      phoneNumber,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cancel an existing booking
const cancelUserBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await bookingService.cancelBooking(bookingId, req.user.id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAgentOrders = async (req, res) => {
  try {
    const agentId = req.user.id; // Assuming the authenticated agent's ID is in req.user
    const orders = await bookingService.getAgentOrders(agentId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await bookingService.confirmAgentOrder(orderId);
    res.status(200).json({ message: "Order confirmed", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await bookingService.cancelOrder(orderId);
    res.status(200).json({ message: "Order cancelled", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserBookings,
  createNewBooking,
  cancelUserBooking,
  getAgentOrders,
  confirmOrder,
  cancelOrder,
};

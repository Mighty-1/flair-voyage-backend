const express = require("express");
const cors = require("cors");
// const morgan = require('morgan');
const userRoutes = require("./routes/User.routes");
const bookingRoutes = require("./routes/booking.routes");
const yachtRoutes = require("./routes/yacht.routes");
const flutterwaveRoutes = require("./routes/payment.routes");
const protect = require("./middlewares/authMiddleware");

const app = express();

// Middleware
app.use(
  cors({
    origin:
      // "https://flair-voyage-oakuzydz3-mightys-projects-1dbba71e.vercel.app/", // Replace with your frontend's URL
      "https://flair-voyage.vercel.app/",
    credentials: true,
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// Routes
app.use("/api", userRoutes);
app.use("/api", bookingRoutes);
app.use("/api", yachtRoutes);
app.use("/api", flutterwaveRoutes);
app.use(protect);

module.exports = app;

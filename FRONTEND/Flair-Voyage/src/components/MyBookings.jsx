import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../ToolKit/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://flair-voyage-backend.onrender.com/api/get-all-bookings",
          // `${import.meta.env.VITE_APP_API_URL}/api/get-all-bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(response.data)) {
          setBookings(response.data); // ✅ Directly set if it's an array
        } else if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings); // ✅ If array is inside "bookings"
        } else {
          setBookings([]); // ✅ Default to empty array to prevent errors
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAlertMessage({
            severity: "error",
            text: "Session expired. Please log in again.",
          });
          dispatch(logout());
          setTimeout(() => navigate("/login"), 1000);
        } else {
          setAlertMessage({
            severity: "error",
            text: "Failed to load bookings.",
          });
        }
        setBookings([]);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, navigate, dispatch]);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(
        `https://flair-voyage-backend.onrender.com/api/cancel-booking/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      setAlertMessage({
        severity: "success",
        text: "Booking canceled!",
      });
    } catch (error) {
      setAlertMessage({ severity: "error", text: "Failed to cancel booking." });
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center font-bold mb-6">
        My Bookings
      </Typography>

      {alertMessage && (
        <Stack
          sx={{
            width: { xs: "100%", md: "30%" }, // 100% on mobile, 20% on larger screens
            position: "fixed",
            top: 20,
            left: "100%",
            transform: "translateX(-100%)",
            zIndex: 9999,
          }}
          spacing={2}
        >
          <Alert
            variant="outlined"
            severity={alertMessage.severity}
            onClose={() => setAlertMessage(null)}
          >
            {alertMessage.text}
          </Alert>
        </Stack>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : bookings.length === 0 ? (
        <Typography variant="h6" className="text-center text-gray-500">
          No bookings found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card className="shadow-lg rounded-lg">
                <CardContent>
                  <Typography variant="h6" className="font-bold">
                    Yacht: {booking.yacht.name}
                  </Typography>
                  <Typography>Date: {booking.date}</Typography>
                  <Typography>Time: {booking.time}</Typography>
                  <Typography>Booking Status: {booking.status}</Typography>
                  <Typography>Status: {booking.payment}</Typography>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => cancelBooking(booking._id)}
                    sx={{ mt: 2 }}
                  >
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default MyBookings;

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import myLogo from "/assets/flair-voyage-logo.jpg";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  FlutterWaveButton,
  // useFlutterwave,
  closePaymentModal,
} from "flutterwave-react-v3";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout } from "../ToolKit/authSlice";
import axios from "axios";

const FlutterWavePayment = ({ amount, email, name, bookingDetails }) => {
  const [alertMessage, setAlertMessage] = useState(null);
 // const [canCloseModal, setCanCloseModal] = useState(false); // Controls modal closure
  const { yachtId, date, time, phoneNumber } = bookingDetails;
  const newBookingDetails = {
    yachtId: yachtId,
    date: date,
    time: time,
    payment: "paid",
    phoneNumber: phoneNumber,
  };
  const token = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Alert State:", alertMessage);
  }, [alertMessage]);

  const showAlert = (severity, text) => {
    setAlertMessage({ severity, text });

    // Ensure Alert disappears after 3  seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN", // Change to your preferred currency
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: email,
      name: name,
      phone_number: phoneNumber,
    },
    customizations: {
      title: "Yacht Booking Payment",
      description: "Payment for yacht reservation",
      logo: myLogo,
    },
    callback: async (response) => {
      // Send transaction details to the backend for verification
      if (response.status === "successful") {
        try {
          const verifyResponse = await axios.get(
            `http://localhost:3000/api/flutterwave/verify-payment/${response.transaction_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyResponse.data.data.status === "successful") {
            // Perform additional actions (e.g., update order status, notify user)
            const booking = await axios.post(
              "http://localhost:3000/api/create-new-booking",
              newBookingDetails,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (booking.status === 201) {
              //setCanCloseModal(true); // Allow modal to close after showing alerts
              showAlert("success", "Booking successful!");
              navigate("/my-bookings");
            }
          } else {
            showAlert("error", "Booking Failed, Please try again.");
          }
        } catch (error) {
          showAlert("error", "Booking failed. Please contact support.");
          throw error;
        }
      }
      closePaymentModal(navigate("/my-bookings"));
    },
    // onclose: () => {
    //   if (!canCloseModal) {
    //     showAlert("info", "Please wait while we process your booking.");
    //   }
    // },
  };

  return (
    <>
      <FlutterWaveButton {...config} text="Pay Now" className="pay-now-btn" />

      {alertMessage !== null && (
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
            sx={{ bgcolor: "background.paper" }}
            variant="outlined"
            severity={alertMessage.severity}
            onClose={() => setAlertMessage(null)}
          >
            {alertMessage.text}
          </Alert>
        </Stack>
      )}
    </>
  );
};

FlutterWavePayment.propTypes = {
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  bookingDetails: PropTypes.object.isRequired,
};

export default FlutterWavePayment;

import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../ToolKit/authSlice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import "../styles/checkOut.css";
import FlutterWavePayment from "./FlutterWavePayment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CheckOut = ({ reserve, selectedDate, selectedTime }) => {
  const user = useSelector((state) => state.auth.user);
  const yachtItem = useSelector((state) => state.search.selectedYacht);
  const token = useSelector((state) => state.auth.token);
  const [userName, setUserName] = useState(user.name);
  const [userPhoneNo, setUserPhoneNo] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [reserveToggle, setReserveToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const bookingDetails = {
    yachtId: yachtItem._id,
    date: selectedDate,
    time: selectedTime,
    phoneNumber: userPhoneNo,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedDateValue = selectedDate.toString();

  const handleSubmit = async () => {
    try {
      const bookYacht = await axios.post(
        "https://flair-voyage-backend.onrender.com/api/create-new-booking",
        bookingDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (bookYacht.status === 201) {
        setAlertMessage({
          severity: "success",
          text: "Booking successful!",
        });
        setTimeout(() => {
          navigate("/my-bookings");
        }, 3000); // Wait 3 seconds before navigating
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 400) {
        setAlertMessage({
          severity: "error",
          text: "Failed to Book Yacht! Please try again",
        });
      }
    }
  };

  const handlePhoneChange = (value) => {
    let formattedPhone = value.startsWith("+")
      ? value.replace(/^(\+\d{1,3})/, "$1-") // If it starts with `+`, ensure `-` is added
      : value.replace(/^(\d{1,3})/, "+$1-"); // If not, assume first digits are the country code

    setUserPhoneNo(formattedPhone);
  };

  return (
    <>
      <div className="multi-step-container">
        {/* Step 1: Contact Info */}
        <div className={`step ${currentStep === 1 ? "active" : "collapsed"}`}>
          {currentStep !== 1 && (
            <div className="step-header">
              <span className="step-icon">1</span>
              <h1>Contact Info</h1>
            </div>
          )}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="contact-content">
                <label className="ci-cn-l">Name:</label>
                <input
                  className="ci-cn-in"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label className="ci-cn-l">Email:</label>
                <input className="ci-cn-in" value={user.email} readOnly />
                <label className="ci-cn-l">Phone:</label>
                <PhoneInput
                  country={"us"} // Default country
                  className="ci-cn-in"
                  type="text"
                  value={userPhoneNo}
                  onChange={handlePhoneChange}
                />
              </div>
              <button
                className="prevnext-btn"
                onClick={() => setCurrentStep(2)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Activity Details */}
        <div className={`step ${currentStep === 2 ? "active" : "collapsed"}`}>
          {currentStep !== 2 && (
            <div className="step-header">
              <span className="step-icon">2</span>
              <h1>Activity Details</h1>
            </div>
          )}
          {currentStep === 2 && (
            <div className="step-content">
              <div className="extended-content">
                <img
                  src={yachtItem.images[0]}
                  alt={yachtItem.name}
                  className="activity-image"
                />
                <div className="activity-content">
                  <h2>{yachtItem.name}</h2>
                  <p>
                    {selectedDateValue} &bull; {selectedTime}
                  </p>
                  <p>Meeting Point: {yachtItem.location}</p>
                  <p>You are to pay: ${yachtItem.price}</p>
                </div>
              </div>
              <button
                className="prevnext-btn"
                onClick={() => setCurrentStep(1)}
              >
                Previous
              </button>
              <button
                className="prevnext-btn"
                onClick={() => setCurrentStep(3)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Step 3: Payment */}
        <div className={`step ${currentStep === 3 ? "active" : "collapsed"}`}>
          {currentStep !== 3 && (
            <div className="step-header">
              <span className="step-icon">3</span>
              <h1>Payment</h1>
            </div>
          )}
          {currentStep === 3 && (
            <div className="step-content">
              {reserve && (
                <label className="reserve">
                  <input
                    type="checkbox"
                    checked={reserveToggle}
                    onChange={(e) => setReserveToggle(e.target.checked)}
                  />
                  <div>
                    <div>
                      <p>Reserve Now &amp; Pay Later</p>
                      <p>
                        You will be charged ${yachtItem.price} on{" "}
                        {selectedDateValue}
                      </p>
                    </div>
                    <div>
                      <p>$0.00</p>
                      <p>now</p>
                    </div>
                  </div>
                </label>
              )}
              {reserveToggle ? (
                <button onClick={handleSubmit} className="pay-now-btn">
                  Reserve
                </button>
              ) : (
                /* Flutterwave integration replaces manual card form */
                <FlutterWavePayment
                  amount={yachtItem.price}
                  email={user.email}
                  phoneNumber={userPhoneNo}
                  name={user.name}
                  bookingDetails={bookingDetails}
                />
              )}
              <button
                type="button"
                className="prevnext-btn"
                onClick={() => setCurrentStep(2)}
              >
                Previous
              </button>
            </div>
          )}
        </div>
      </div>

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

CheckOut.propTypes = {
  reserve: PropTypes.bool,
  selectedDate: PropTypes.object,
  selectedTime: PropTypes.string,
};

export default CheckOut;

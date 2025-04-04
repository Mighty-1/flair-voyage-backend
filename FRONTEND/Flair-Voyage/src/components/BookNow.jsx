import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedYacht } from "../ToolKit/searchSlice";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "../styles/bookNow.css";

const BookNow = ({
  setReserve,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const yachtItem = useSelector((state) => state.search.selectedYacht);

  // console.log(setReserve, selectedDate, selectedTime);

  // State for selected booking date, time, payment option, etc.
  const [payLater, setPayLater] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useDispatch();
  // beginning of selectedYacht functions
  const { id } = useParams();
  // console.log("Yacht ID from URL:", id);

  // Fetch selected yacht data from the backend API
  useEffect(() => {
    const fetchYacht = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/fetch-yacht-by-id/${id}`
        );
        // Check if the response is OK and data exists
        if (response && response.data) {
          dispatch(setSelectedYacht(response.data)); // Dispatch the data
        } else {
          console.error("Error: Invalid response data");
        }
      } catch (error) {
        console.log("Error fetching yacht data:", error); // Log errors properly
      }
    };

    if (id) {
      fetchYacht(); // Only call if `id` exists
    }
  }, [id, dispatch]); // Add `dispatch` to the dependency array

  if (!yachtItem) {
    return <div>Loading...</div>;
  }
  // end of selectedYacht functions

  // Handler for date change using react-datepicker
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handler for time input change
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Handle reserve now
  const handleReserveNow = () => {
    setReserve(true);
  };

  return (
    <div className="b-n-container">
      <div className="selected-yacht-content">
        <h1>{yachtItem.name}</h1>
        <p>{yachtItem.description}</p>
        <p>{yachtItem.features}</p>
        {yachtItem.images && (
          <div className="image-carousel">
            <button
              className="b-n-arrow prev"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) =>
                  prev === 0 ? yachtItem.images.length - 1 : prev - 1
                );
              }}
            >
              &lt;
            </button>
            <img
              src={yachtItem.images[currentImageIndex]}
              alt={yachtItem.name}
              className="carousel-image"
            />
            <button
              className="b-n-arrow next"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) =>
                  prev === yachtItem.images.length - 1 ? 0 : prev + 1
                );
              }}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <div className="boat-booking-form">
        <h1>Book Your Boat</h1>
        <form>
          <div className="form-group">
            <label>Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="EEEE, MMM d, yyyy"
            />
          </div>
          <div className="form-group">
            <label>Select Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={payLater}
                onChange={(e) => setPayLater(e.target.checked)}
              />
              Book Now, Pay Later
            </label>
          </div>
          <div className="form-group">
            {payLater ? (
              <Link to={`/book-now/${id}/check-out`} className="booking-btn">
                <button onClick={handleReserveNow}>
                  Reserve Now & Pay Later
                </button>
              </Link>
            ) : (
              <Link to={`/book-now/${id}/check-out`} className="booking-btn">
                <button>Book Now</button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

BookNow.propTypes = {
  selectedDate: PropTypes.object,
  selectedTime: PropTypes.string,
  setReserve: PropTypes.func,
  setSelectedDate: PropTypes.func,
  setSelectedTime: PropTypes.func,
};

export default BookNow;

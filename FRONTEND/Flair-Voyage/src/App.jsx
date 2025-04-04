import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import AddYacht from "./components/AddYacht";
import MyBoats from "./components/MyBoats";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchResult from "./components/SearchResult";
import BookNow from "./components/BookNow";
import AgentOrders from "./components/AgentOrders";
import WishList from "./components/WishList";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CheckOut from "./components/CheckOut";
import MyBookings from "./components/MyBookings";

function App() {
  const [reserve, setReserve] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-yacht" element={<AddYacht />} />
            <Route path="/my-boats" element={<MyBoats />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/orders" element={<AgentOrders />} />
            <Route path="/wishlists" element={<WishList />} />
            <Route
              path="/book-now/:id"
              element={
                <BookNow
                  reserve={reserve}
                  setReserve={setReserve}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              }
            />
            <Route path="/searched-result" element={<SearchResult />} />
            <Route
              path="/book-now/:id/check-out"
              element={
                <CheckOut
                  reserve={reserve}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

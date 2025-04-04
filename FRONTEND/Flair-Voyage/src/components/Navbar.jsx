import myLogo from "/assets/flair-voyage-logo.jpg";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { ChevronDown } from "./chevron-down";
import { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../ToolKit/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Update the state
    navigate("/"); // Redirect to index page
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get login status
  const user = useSelector((state) => state.auth.user);

  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsVisible(!isVisible);

  const handleClickOutsideDropdown = () => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, []);

  return (
    <div className="navbar">
      <div className="nav-logo-div">
        <img src={myLogo} alt="Logo" className="nav-logo" />
        {/* <p className="nav-disc">
          Discover <ChevronDown />
        </p> */}
      </div>
      <div className="nav-2sect">
        {/* <FontAwesomeIcon icon={faGlobe} size="2x" className="navGlobe" /> */}
        <div
          id="navUserSect"
          className="relative inline-block"
          ref={dropdownRef}
        >
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="nav-user"
            style={{ color: "#b2aeae" }}
          />
          <ChevronDown
            className="nav-chevronDownIcon"
            onClick={toggleDropdown}
          />
          {isVisible && (
            <div className="dropdown-menu-div">
              <ul className="dropdownMenu">
                <li>
                  {isAuthenticated && !user?.isAgent ? (
                    <Link to={"/my-bookings"}>Bookings</Link>
                  ) : isAuthenticated && user.isAgent === true ? (
                    <Link to={"/my-boats"}>My Boats</Link>
                  ) : (
                    <Link to={"/login"}>LogIn / SignUp</Link>
                  )}
                </li>
                {isAuthenticated && user?.isAgent ? (
                  <li>
                    <Link to={"/orders"}>Orders</Link>
                  </li>
                ) : (
                  <li>
                    <Link to={'/wishlists'}>Wishlists</Link>
                  </li>
                )}
                {isAuthenticated ? (
                  <li className="px-4 py-2 hover:bg-gray-100">View Profile</li>
                ) : null}
                {isAuthenticated ? (
                  <li onClick={handleLogout}>logout</li>
                ) : (
                  <li>Help!</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

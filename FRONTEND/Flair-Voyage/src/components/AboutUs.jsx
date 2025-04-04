import "../styles/aboutUs.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { logout } from "../ToolKit/authSlice";
import { addToWishlist, removeFromWishlist } from "../ToolKit/wishlistSlice";
import { setSearchResult } from "../ToolKit/searchSlice";
import "boxicons";
// import PropTypes from "prop-types";

const AboutUs = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get login status
  const user = useSelector((state) => state.auth.user);
  const searchResult = useSelector((state) => state.search.searchResult);
  const token = useSelector((state) => state.auth.token);
  const wishlist = useSelector((state) => state.wishlist);
  const [inWishlist, setInWishlist] = useState(false);

  // const searchQuery = useSelector((state) => state.search.searchQuery);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWishlist = async (yachtId) => {
    const isInWishlist = wishlist.includes(yachtId);

    try {
      if (isInWishlist) {
        await axios.post(
          "http://localhost:3000/api/wishlists/remove-item",
          { yachtId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInWishlist(false);
        dispatch(removeFromWishlist(yachtId));
      } else {
        await axios.post(
          "http://localhost:3000/api/wishlists/add-item",
          { yachtId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInWishlist(true);
        dispatch(addToWishlist(yachtId));
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  const [query, setQuery] = useState("");
  // State to store the yacht selected for modal view
  const [selectedYacht, setSelectedYacht] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   dispatch(setSearchResult(results));
  // }, [results, dispatch]); // dispacth only when result changes

  // Close modal when clicking outside the modal content (on overlay)
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      handleModalClose();
    }
  };

  // Function to close the modal
  const handleModalClose = () => setSelectedYacht(null);

  const handleSearch = async (e) => {
    const trimmedQuery = query.trim(" "); // Remove whitespace
    // dispatch(setSearchResult(trimmedQuery));
    localStorage.setItem("place-search", trimmedQuery);
    if (e.key === "Enter" && trimmedQuery) {
      try {
        // const token = localStorage.getItem("token");
        const search = await axios.get(
          `http://localhost:3000/api/search?query=${trimmedQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add bearer token
            },
          }
        );
        dispatch(setSearchResult(search.data));
        // setResults(search.data);
        if (search.data.length > 0) {
          navigate("/searched-result");
        } else {
          setQuery("");
          alert("No results found");
        }
      } catch (error) {
        if (error.message && error.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      }
    }
  };

  const placeSearched = localStorage.getItem("place-search");

  return (
    <>
      <div className="about-us-bg">
        {isAuthenticated ? (
          user && user?.name ? (
            <h1>Hello, {user.name}!</h1>
          ) : null
        ) : (
          <h1>Do more with Flair Voyage</h1>
        )}
        {isAuthenticated && user?.isAgent ? (
          <p>Turn every client&apos;s trip into a memorable adventure.</p>
        ) : (
          <p>Explore the world with us.</p>
        )}
        {isAuthenticated && !user?.isAgent ? (
          <input
            type="search"
            placeholder="Search for a city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch} // Trigger search on Enter key press
          />
        ) : null}
      </div>
      {/* About Us Content Section */}
      <div className="about-us-content">
        <h2>Why choose Flair Voyage?</h2>
        <p>
          Flair Voyage is a leading provider of affordable and sustainable boat
          travel solutions, offering a variety of options for private and
          business travelers. Our mission is to help people discover new
          destinations and connect with like-minded individuals who share our
          passion for travel.
        </p>
      </div>
      <div className="advantageContents">
        <div className="content-wrapper">
          <div className="content">
            <svg
              width="48"
              height="48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="advantageBannerIcon__p3My"
            >
              <path
                d="M44.095 11.626c8.614 9.318 1.384 10.944-6.346 18.916-7.73 7.972-13.126 12.63-21.646 9.952C7.583 37.815-5.362 25.542 2.368 17.57c7.73-7.972 33.113-15.263 41.727-5.944z"
                fill="#F6C5CD"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.869 10.004c-.93-.043-1.81.365-2.644 1.172-1.243 1.202-1.975 2.547-1.975 4.706 0 3.106 1.821 6.601 5.593 10.511C22.717 30.283 26.163 32 29.257 32h.026a6.893 6.893 0 004.817-2l.016-.016.016-.015a3.406 3.406 0 001.117-2.622 1.938 1.938 0 00-1.25-1.358l-.043-.015-3.505-1.579a1.197 1.197 0 00-1.295.268l-.012.012-.932.878c-.887.836-2.27 1.104-3.41.42a15.914 15.914 0 01-3.187-2.519 18.148 18.148 0 01-2.393-2.992c-.75-1.174-.477-2.64.433-3.553l.907-.912.024-.021c.347-.306.446-.807.243-1.223l-.008-.015-1.574-3.529-.006-.016a1.99 1.99 0 00-1.372-1.19zm-4.035-.266c1.124-1.087 2.555-1.843 4.244-1.725l.069.004.067.015a3.99 3.99 0 012.874 2.395l1.546 3.466a3.029 3.029 0 01-.698 3.558l-.864.869c-.323.324-.355.767-.165 1.065.614.96 1.328 1.853 2.131 2.665l.005.004a13.91 13.91 0 002.789 2.204c.28.168.691.138 1.009-.161l.908-.856a3.197 3.197 0 013.479-.689l.014.006 3.454 1.556a3.937 3.937 0 012.526 2.892l.016.077.005.078a5.407 5.407 0 01-1.75 4.274A8.893 8.893 0 0129.291 34H29.256c-3.863 0-7.794-2.14-11.836-6.202l-.006-.005-.005-.006c-3.903-4.044-6.159-8.021-6.159-11.905 0-2.756.994-4.606 2.584-6.144z"
                fill="#000"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.868 10.003c-.93-.042-1.81.365-2.643 1.172-1.243 1.202-1.975 2.548-1.975 4.706 0 3.106 1.821 6.601 5.593 10.511C22.716 30.283 26.163 32 29.257 32h.026a6.892 6.892 0 004.817-2l.016-.016.016-.015a3.406 3.406 0 001.116-2.621A1.938 1.938 0 0034 25.989l-.043-.015-3.506-1.58a1.197 1.197 0 00-1.294.268l-.012.012-.932.878c-.887.836-2.27 1.104-3.41.42a15.914 15.914 0 01-3.188-2.518 18.156 18.156 0 01-2.392-2.993c-.75-1.174-.477-2.64.432-3.553l.907-.911.025-.022c.347-.306.446-.806.243-1.222l-.008-.016-1.574-3.528-.006-.017a1.99 1.99 0 00-1.373-1.189z"
                fill="#fff"
              ></path>
            </svg>
            <h1>24/7 customer support</h1>
            <p>Anywhere, anytime, we&apos;re here to help.</p>
          </div>
          <div className="content">
            <svg
              width="48"
              height="48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="advantageBannerIcon__p3My"
            >
              <path
                d="M44.095 12.232c8.614 9.319 1.384 10.945-6.346 18.917-7.73 7.971-13.126 12.63-21.646 9.951-8.52-2.678-21.465-14.952-13.735-22.923 7.73-7.972 33.113-15.263 41.727-5.945z"
                fill="#F6ECBB"
              ></path>
              <path
                d="M25.082 7.39l3.27 6.933a2.34 2.34 0 001.752 1.328l.008.002 7.297 1.109a.745.745 0 01.376 1.252l-.002.002-5.294 5.398-.004.004a2.447 2.447 0 00-.654 2.104v.001l1.25 7.62.001.01.002.01a.708.708 0 01-.66.837.597.597 0 01-.275-.076l-.006-.003-6.541-3.598H25.6a2.275 2.275 0 00-2.202 0l-6.541 3.598-.006.003a.597.597 0 01-.276.076.707.707 0 01-.66-.837l.003-.01.001-.01 1.25-7.62v-.001a2.447 2.447 0 00-.654-2.104l-.005-.004-5.294-5.398-.001-.002a.745.745 0 01.376-1.252l7.297-1.11h.008a2.34 2.34 0 001.752-1.33l3.27-6.931.004-.008.003-.008A.633.633 0 0124.5 7a.633.633 0 01.575.375l.003.008.004.008z"
                fill="#fff"
                stroke="#2A2D32"
                strokeWidth="2"
              ></path>
            </svg>
            <h1>Trusted by millions</h1>
            <p>Book confidently with insights from fellow travelers.</p>
          </div>
          <div className="content">
            <svg
              width="48"
              height="48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="advantageBannerIcon__p3My"
            >
              <path
                d="M44.095 12.372c8.614 9.318 1.384 10.945-6.346 18.916-7.73 7.972-13.126 12.63-21.646 9.952-8.52-2.679-21.465-14.952-13.735-22.924 7.73-7.971 33.113-15.263 41.727-5.944z"
                fill="#DEECED"
              ></path>
              <rect
                x="11"
                y="7"
                width="24"
                height="24"
                rx="2"
                fill="#fff"
              ></rect>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 4a1 1 0 011 1v1h10V5a1 1 0 112 0v1h2.75A3.25 3.25 0 0136 9.25v19.5A3.25 3.25 0 0132.75 32h-19.5A3.25 3.25 0 0110 28.75V9.25A3.25 3.25 0 0113.25 6H16V5a1 1 0 011-1zm11 4v1a1 1 0 102 0V8h2.75c.69 0 1.25.56 1.25 1.25V12H12V9.25c0-.69.56-1.25 1.25-1.25H16v1a1 1 0 102 0V8h10zm-16 6v14.75c0 .69.56 1.25 1.25 1.25h19.5c.69 0 1.25-.56 1.25-1.25V14H12z"
                fill="#2A2D32"
              ></path>
            </svg>
            <h1>Your trip, your way</h1>
            <p>
              Enjoy flexibility with free cancellation and reserve-now-pay-later
              options at no extra charge.
            </p>
          </div>
        </div>
      </div>

      {isAuthenticated ? null : (
        <div className="abt-login">
          <div>
            <h1>Log In to get full experience</h1>
            <Link to="/signup">Don&apos;t have an account? Sign up</Link>
          </div>
          <button>
            <Link to="/login" style={{ fontSize: "18px", fontWeight: "bold" }}>
              Log In
            </Link>
          </button>
        </div>
      )}
      {isAuthenticated && user?.isAgent ? (
        <div className="add-yacht-cont">
          <button>
            <Link
              to="/add-yacht"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                alignSelf: "center",
                justifySelf: "center",
              }}
            >
              Add Yacht
              <FontAwesomeIcon
                icon={faPlus}
                size="sm"
                style={{ paddingLeft: "10px" }}
              />
            </Link>
          </button>
        </div>
      ) : isAuthenticated && !user?.isAgent && searchResult?.length > 0 ? (
        <div className="searchedCont">
          <h1>Because you searched {placeSearched}</h1>
          {searchResult.length > 0 ? (
            <div className="item-list">
              {searchResult.map((result) => (
                <div key={result._id} className="item-card">
                  <img
                    src={result.images[0]}
                    alt={result.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h2>{result.name}</h2>
                    <p>{result.description}</p>
                    <p className="item-price">${result.price}</p>
                    <div
                      className="wishlist-icon"
                      onClick={() => handleWishlist(result._id)}
                    >
                      <box-icon
                        name="heart"
                        animation="tada"
                        type={inWishlist ? "solid" : "regular"}
                        style={{ cursor: "pointer" }}
                        flip="horizontal"
                        color="#ff0000"
                      ></box-icon>
                    </div>
                    <Link>
                      <button
                        className="view-details-btn"
                        onClick={() => setSelectedYacht(result)}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {selectedYacht && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal-content">
            {/* Close button */}
            <button className="modal-close" onClick={handleModalClose}>
              &times;
            </button>
            <div className="modal-image-container">
              {/* Previous image arrow */}
              <button
                className="arrow prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0
                      ? selectedYacht.images.length - 1
                      : prevIndex - 1
                  );
                }}
              >
                &lt;
              </button>
              {/* Display current image */}
              <img
                src={selectedYacht.images[currentImageIndex]}
                alt={selectedYacht.name}
                className="modal-image"
              />
              {/* Next image arrow */}
              <button
                className="arrow next"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === selectedYacht.images.length - 1
                      ? 0
                      : prevIndex + 1
                  );
                }}
              >
                &gt;
              </button>
            </div>
            <h2>{selectedYacht.name}</h2>
            <p>{selectedYacht.description}</p>
            <p className="modal-price">${selectedYacht.price}</p>
            {/* Book Now button */}
            <Link to={`/book-now/${selectedYacht._id}`}>
              <button className="book-now-btn">Book Now</button>
            </Link>
          </div>
        </div>
      )}

      <div className="bestDestinations">
        <h1>Top Destinations</h1>
        <div className="city-contents">
          <div className="lagos">
            <h1 className="city-names">Lagos</h1>
          </div>
          <div className="maldives">
            <h1 className="city-names">Maldives</h1>
          </div>
          <div className="new-zealand">
            <h1 className="city-names">New Zealand</h1>
          </div>
          <div className="italy">
            <h1 className="city-names">Italy</h1>
          </div>
          <div className="thailand">
            <h1 className="city-names">Thailand</h1>
          </div>
        </div>
        <div className="city-contents">
          <div className="australia">
            <h1 className="city-names">Australia</h1>
          </div>
          <div className="greece">
            <h1 className="city-names">Greece</h1>
          </div>
          <div className="seychelles">
            <h1 className="city-names">Seychelles</h1>
          </div>
          <div className="spain">
            <h1 className="city-names">Spain</h1>
          </div>
          <div className="phili">
            <h1 className="city-names">Phillipines</h1>
          </div>
        </div>
      </div>
    </>
  );
};

// AboutUs.propTypes = {
//   setResults: PropTypes.func.isRequired,
// };

export default AboutUs;

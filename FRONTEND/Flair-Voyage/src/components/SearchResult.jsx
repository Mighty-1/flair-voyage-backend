// import PropTypes from "prop-types";
import "../styles/searchResult.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const searchResult = useSelector((state) => state.search.searchResult);

  return (
    <div className="yacht-list">
      {/* <h1>Search Results</h1> */}
      {/* Render yachts from the search results */}
      {searchResult.length > 0
        ? searchResult.map((result) => (
            <div key={result._id} className="yacht-card">
              <h2>{result.name}</h2>
              <p>{result.location}</p>
              <p>{result.description}</p>
              <p>${result.price}</p>
              {result.images.length > 0 && (
                <img src={result.images[0]} alt={result.name} />
              )}
              <button className="sr-book-now-btn">
                <Link to={`/book-now/${result._id}`}>Book Now</Link>
              </button>
            </div>
          ))
        : null}
    </div>
  );
};

// SearchResult.propTypes = {
//   results: PropTypes.func.isRequired,
// };

export default SearchResult;

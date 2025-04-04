import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/dashboard" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is provided and is a valid React node
};

export default ProtectedRoute;

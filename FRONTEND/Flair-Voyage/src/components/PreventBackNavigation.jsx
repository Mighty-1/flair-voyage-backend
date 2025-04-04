import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PreventBackNavigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/", { replace: true }); // Redirect to dashboard
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return null; // This component doesn't render anything
};

export default PreventBackNavigation;

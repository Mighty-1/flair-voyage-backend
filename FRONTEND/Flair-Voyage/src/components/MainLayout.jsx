import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import PreventBackNavigation from "./PreventBackNavigation";
// import "../styles/mainLayout.css";

const MainLayout = () => {
  return (
    <div>
      <PreventBackNavigation />
      {/* Conditionally render the navbar */}
      <Navbar />
      <div className="outletSect">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

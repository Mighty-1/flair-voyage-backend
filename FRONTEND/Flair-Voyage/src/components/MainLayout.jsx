import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import PreventBackNavigation from "./PreventBackNavigation";
import "../styles/mainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <PreventBackNavigation />
      {/* Conditionally render the navbar */}
      <Navbar />
      <div className="outletSect">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

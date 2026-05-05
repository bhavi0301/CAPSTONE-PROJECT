import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import "./Navbar.css";

function Navbar() {
  const { savedDestinations, itinerary } = useContext(TripContext);
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span>✈️</span>
        <span className="gradient-text">TripCraft</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/destinations" className={isActive("/destinations")}>
          Destinations
          {savedDestinations.length > 0 && (
            <span className="navbar-badge">{savedDestinations.length}</span>
          )}
        </Link>
        <Link to="/budget" className={isActive("/budget")}>
          Budget
        </Link>
        <Link to="/itinerary" className={isActive("/itinerary")}>
          Itinerary
          {itinerary.length > 0 && (
            <span className="navbar-badge">{itinerary.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

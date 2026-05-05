import { useState } from "react";
import { useNavigate } from "react-router-dom";
import destinations from "../data/destinations";
import "./Home.css";

function Home() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const popularDestinations = destinations.filter((d) => d.rating >= 4.8);

  function handleSearch() {
    if (searchText.trim()) {
      navigate(`/destinations?search=${searchText}`);
    } else {
      navigate("/destinations");
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-content animate-in">
          <h1>
            Plan Your <span className="gradient-text">Dream Trip</span> With
            Ease
          </h1>
          <p>
            Discover amazing destinations, plan your budget, and build the
            perfect itinerary — all in one place.
          </p>

          <div className="home-search-box">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSearch}>Explore</button>
          </div>

          <div className="home-stats">
            <div className="home-stat">
              <div className="home-stat-number">50+</div>
              <div className="home-stat-label">Destinations</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-number">10K+</div>
              <div className="home-stat-label">Happy Travelers</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-number">4.9</div>
              <div className="home-stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <h2>
          Why Choose <span className="gradient-text">TripCraft</span>?
        </h2>
        <div className="features-grid">
          <div className="feature-card animate-in animate-delay-1">
            <span className="feature-icon">🔍</span>
            <h3>Search Destinations</h3>
            <p>
              Browse and filter from amazing destinations around the world to
              find your perfect getaway.
            </p>
          </div>
          <div className="feature-card animate-in animate-delay-2">
            <span className="feature-icon">💰</span>
            <h3>Budget Planner</h3>
            <p>
              Set your travel budget, track expenses by category, and stay on
              top of your spending.
            </p>
          </div>
          <div className="feature-card animate-in animate-delay-3">
            <span className="feature-icon">📋</span>
            <h3>Itinerary Builder</h3>
            <p>
              Create a day-by-day travel plan with activities, times, and notes
              for a perfect trip.
            </p>
          </div>
        </div>
      </section>

      <section className="home-popular">
        <h2>
          Top Rated <span className="gradient-text">Destinations</span>
        </h2>
        <div className="popular-grid">
          {popularDestinations.map((dest) => (
            <div
              key={dest.id}
              className="popular-card"
              onClick={() => navigate("/destinations")}
            >
              <div className="popular-card-image-wrapper">
                <img
                  className="popular-card-image"
                  src={dest.image}
                  alt={dest.name}
                />
                <span className="popular-card-badge">${dest.price}</span>
              </div>
              <div className="popular-card-info">
                <h3>{dest.name}</h3>
                <div className="popular-card-country">{dest.country}</div>
                <div className="popular-card-rating">⭐ {dest.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

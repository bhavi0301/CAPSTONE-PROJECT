import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import destinations from "../data/destinations";
import "./Destinations.css";

function Destinations() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchText, setSearchText] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const { savedDestinations, addToSaved, removeFromSaved, addToItinerary } =
    useContext(TripContext);

  const categories = ["all", "city", "beach", "mountain"];

  const filteredDestinations = destinations
    .filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchText.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || dest.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  function isSaved(id) {
    return savedDestinations.find((d) => d.id === id);
  }

  function handleSaveToggle(dest) {
    if (isSaved(dest.id)) {
      removeFromSaved(dest.id);
    } else {
      addToSaved(dest);
    }
  }

  function handleAddToItinerary(dest) {
    addToItinerary({
      destination: dest.name,
      day: 1,
      activity: `Explore ${dest.name}`,
      time: "09:00",
      notes: `Visit top attractions in ${dest.name}`,
    });
  }

  return (
    <div className="page-container" style={{ paddingTop: "100px" }}>
      <h1 className="page-title">
        Explore <span className="gradient-text">Destinations</span>
      </h1>
      <p className="page-subtitle">
        Find your next adventure from our handpicked destinations
      </p>

      {savedDestinations.length > 0 && (
        <div className="saved-section">
          <h2>❤️ Saved Destinations</h2>
          <div className="saved-list">
            {savedDestinations.map((dest) => (
              <div key={dest.id} className="saved-chip">
                <span>{dest.name}</span>
                <button onClick={() => removeFromSaved(dest.id)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="destinations-header">
        <div className="destinations-filters">
          <input
            className="destinations-search"
            type="text"
            placeholder="🔍 Search by name or country..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all" && "🌍 All"}
              {cat === "city" && "🏙️ City"}
              {cat === "beach" && "🏖️ Beach"}
              {cat === "mountain" && "⛰️ Mountain"}
            </button>
          ))}

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort: Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {filteredDestinations.length === 0 ? (
        <div className="no-results">
          <span>🔍</span>
          <p>No destinations found. Try a different search or filter.</p>
        </div>
      ) : (
        <div className="destinations-grid">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="dest-card">
              <div className="dest-card-img-wrapper">
                <img
                  className="dest-card-img"
                  src={dest.image}
                  alt={dest.name}
                />
                <span className="dest-card-category">{dest.category}</span>
                <span className="dest-card-price">${dest.price}</span>
              </div>
              <div className="dest-card-body">
                <h3 className="dest-card-title">{dest.name}</h3>
                <div className="dest-card-country">{dest.country}</div>
                <p className="dest-card-desc">{dest.description}</p>
                <div className="dest-card-meta">
                  <span className="dest-card-rating">⭐ {dest.rating}</span>
                  <span className="dest-card-time">
                    Best: {dest.bestTime}
                  </span>
                </div>
                <div className="dest-card-attractions">
                  {dest.attractions.map((attr) => (
                    <span key={attr} className="attraction-tag">
                      {attr}
                    </span>
                  ))}
                </div>
                <div className="dest-card-actions">
                  <button
                    className={`save-btn ${isSaved(dest.id) ? "saved" : ""}`}
                    onClick={() => handleSaveToggle(dest)}
                  >
                    {isSaved(dest.id) ? "♥ Saved" : "♡ Save"}
                  </button>
                  <button
                    className="add-itinerary-btn"
                    onClick={() => handleAddToItinerary(dest)}
                  >
                    + Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;

import { useState, useContext } from "react";
import { TripContext } from "../context/TripContext";
import destinations from "../data/destinations";
import "./ItineraryBuilder.css";

function ItineraryBuilder() {
  const { itinerary, addToItinerary, removeFromItinerary, clearItinerary } =
    useContext(TripContext);

  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("");
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const [activeDay, setActiveDay] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (!destination || !activity.trim()) return;

    addToItinerary({
      destination,
      activity,
      day: Number(day),
      time,
      notes,
    });

    setActivity("");
    setNotes("");
  }

  const allDays = [...new Set(itinerary.map((item) => item.day))].sort(
    (a, b) => a - b
  );

  const filteredItinerary =
    activeDay === "all"
      ? itinerary
      : itinerary.filter((item) => item.day === Number(activeDay));

  const sortedItinerary = [...filteredItinerary].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="page-container" style={{ paddingTop: "100px" }}>
      <h1 className="page-title">
        Itinerary <span className="gradient-text">Builder</span>
      </h1>
      <p className="page-subtitle">
        Plan your daily activities and build the perfect trip schedule
      </p>

      <div className="itinerary-layout">
        <form className="itinerary-form" onSubmit={handleSubmit}>
          <h2>✏️ Add Activity</h2>
          <div className="itinerary-form-fields">
            <label>Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select a destination</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.name}>
                  {dest.name}, {dest.country}
                </option>
              ))}
            </select>

            <label>Activity</label>
            <input
              className="input-field"
              type="text"
              placeholder="e.g. Visit Eiffel Tower"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />

            <div className="itinerary-form-row">
              <div>
                <label>Day</label>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <option key={d} value={d}>
                      Day {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Time</label>
                <input
                  className="input-field"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <label>Notes</label>
            <textarea
              placeholder="Any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button className="btn-primary" type="submit">
              + Add to Itinerary
            </button>
          </div>
        </form>

        <div className="itinerary-timeline">
          <div className="itinerary-toolbar">
            <h2>📋 Your Plan ({itinerary.length} activities)</h2>
            {itinerary.length > 0 && (
              <button className="btn-secondary" onClick={clearItinerary}>
                Clear All
              </button>
            )}
          </div>

          {allDays.length > 0 && (
            <div className="day-tabs">
              <button
                className={`day-tab ${activeDay === "all" ? "active" : ""}`}
                onClick={() => setActiveDay("all")}
              >
                All Days
              </button>
              {allDays.map((d) => {
                const count = itinerary.filter(
                  (item) => item.day === d
                ).length;
                return (
                  <button
                    key={d}
                    className={`day-tab ${activeDay === d ? "active" : ""}`}
                    onClick={() => setActiveDay(d)}
                  >
                    Day {d}
                    <span className="day-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {sortedItinerary.length === 0 ? (
            <div className="empty-itinerary">
              <span>🗺️</span>
              <h3>No activities planned yet</h3>
              <p>Add your first activity using the form on the left</p>
            </div>
          ) : (
            <div className="timeline-list">
              {sortedItinerary.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-item-header">
                    <div>
                      <div className="timeline-item-title">
                        {item.activity}
                      </div>
                      <div className="timeline-item-dest">
                        📍 {item.destination} — Day {item.day}
                      </div>
                    </div>
                    <span className="timeline-item-time">🕐 {item.time}</span>
                  </div>
                  {item.notes && (
                    <div className="timeline-item-notes">{item.notes}</div>
                  )}
                  <button
                    className="timeline-item-delete"
                    onClick={() => removeFromItinerary(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItineraryBuilder;

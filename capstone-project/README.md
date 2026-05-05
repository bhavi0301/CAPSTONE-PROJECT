# ✈️ TripCraft - Travel Planning Website

A React-based travel planning website where users can search destinations, plan their budget, and build day-by-day itineraries.

Built with beginner-friendly JavaScript using React hooks, Context API, and React Router.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Features

### 🔍 Search Destinations
- Browse 9 handpicked travel destinations
- Search by destination name or country
- Filter by category (City, Beach, Mountain)
- Sort by name, price, or rating
- Save favorite destinations
- Add destinations directly to your itinerary

### 💰 Budget Planner
- Set your total travel budget
- Add expenses with name, amount, and category
- Visual progress bar shows spending percentage
- Color-coded warnings (green → yellow → red)
- Category breakdown of spending (Food, Transport, Hotel, Activities, Shopping)
- Delete individual expenses

### 📋 Itinerary Builder
- Add activities with destination, time, day, and notes
- Filter activities by day using day tabs
- Timeline view with sorted activities
- Clear all activities at once
- Activities auto-sort by day and time

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool and dev server |
| React Router DOM | Page routing and navigation |
| CSS | Styling (no frameworks) |
| JavaScript (ES6) | Logic and functionality |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with links
│   └── Navbar.css          # Navbar styles
├── context/
│   └── TripContext.jsx     # Global state using Context API
├── data/
│   └── destinations.js     # Destination data array
├── pages/
│   ├── Home.jsx            # Landing page with hero and search
│   ├── Home.css
│   ├── Destinations.jsx    # Browse and filter destinations
│   ├── Destinations.css
│   ├── BudgetPlanner.jsx   # Budget tracking page
│   ├── BudgetPlanner.css
│   ├── ItineraryBuilder.jsx # Trip schedule builder
│   └── ItineraryBuilder.css
├── App.jsx                 # Main app with routes
├── main.jsx                # Entry point
└── index.css               # Global styles
```

---

## 🧠 React Concepts Used

### 1. useState
`useState` is a React hook that lets you add state (data that can change) to your components.

**Where it's used:**
- `Home.jsx` — stores the search text the user types
- `Destinations.jsx` — stores search text, active category filter, and sort option
- `BudgetPlanner.jsx` — stores expense form values (name, amount, category)
- `ItineraryBuilder.jsx` — stores activity form values (destination, activity, day, time, notes)

**How it works:**
```jsx
const [searchText, setSearchText] = useState("");
// searchText = current value (starts as "")
// setSearchText = function to update the value
```

### 2. Context API (createContext, useContext)
Context API lets you share data between components without passing props through every level.

**Where it's used:**
- `TripContext.jsx` — creates a global store for saved destinations, budget, and itinerary
- Every page uses `useContext(TripContext)` to read and update this shared data

**How it works:**
```jsx
// Create context
export const TripContext = createContext();

// Provide data to all children
<TripContext.Provider value={data}>
  {children}
</TripContext.Provider>

// Use data in any component
const { budget, addExpense } = useContext(TripContext);
```

### 3. map()
`map()` loops through an array and returns a new array. In React, we use it to render lists.

**Where it's used:**
- `Home.jsx` — renders popular destination cards
- `Destinations.jsx` — renders destination cards, category filter buttons, attraction tags, saved chips
- `BudgetPlanner.jsx` — renders expense list items, category breakdown
- `ItineraryBuilder.jsx` — renders timeline items, day tabs, destination dropdown options

**How it works:**
```jsx
{destinations.map((dest) => (
  <div key={dest.id}>{dest.name}</div>
))}
```

### 4. filter()
`filter()` creates a new array with only the items that pass a condition.

**Where it's used:**
- `Home.jsx` — filters destinations with rating >= 4.8 for "Top Rated" section
- `Destinations.jsx` — filters by search text and category
- `ItineraryBuilder.jsx` — filters activities by selected day
- `TripContext.jsx` — removes items from saved destinations, expenses, and itinerary

**How it works:**
```jsx
const results = destinations.filter((dest) => {
  return dest.name.toLowerCase().includes(searchText.toLowerCase());
});
```

### 5. React Router (Routes, Route, Link, useNavigate, useLocation)
React Router handles page navigation without page reloads.

**Where it's used:**
- `App.jsx` — defines all routes (/, /destinations, /budget, /itinerary)
- `Navbar.jsx` — uses `Link` for navigation and `useLocation` for active page highlighting
- `Home.jsx` — uses `useNavigate` to go to destinations page on search

**How it works:**
```jsx
// Define routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/destinations" element={<Destinations />} />
</Routes>

// Navigate with links
<Link to="/destinations">Destinations</Link>

// Navigate with code
const navigate = useNavigate();
navigate("/destinations");
```

### 6. Functions
Regular JavaScript functions handle user interactions and data processing.

**Where they're used:**
- `handleSearch()` — navigates to destinations with search query
- `handleSaveToggle()` — saves or removes a destination
- `handleSubmit()` — adds a new expense or itinerary item
- `getProgressClass()` — returns CSS class based on budget percentage
- `isSaved()` — checks if a destination is already saved

---

## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

---

## 📱 Pages Overview

| Page | URL | Description |
|---|---|---|
| Home | `/` | Hero section with search, features, and top destinations |
| Destinations | `/destinations` | Browse, search, filter, and save destinations |
| Budget Planner | `/budget` | Set budget, add expenses, track spending |
| Itinerary Builder | `/itinerary` | Add activities, organize by day, timeline view |

---

## 🎨 Design Features

- Dark theme with gradient accents
- Glassmorphism effects
- Smooth hover animations
- Responsive design for mobile
- Custom scrollbar styling
- Google Fonts (Outfit)

---

## 📝 License

This project is open source and available under the MIT License.

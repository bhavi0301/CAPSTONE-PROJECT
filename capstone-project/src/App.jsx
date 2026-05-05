import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripProvider } from "./context/TripContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import BudgetPlanner from "./pages/BudgetPlanner";
import ItineraryBuilder from "./pages/ItineraryBuilder";

function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/budget" element={<BudgetPlanner />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
        </Routes>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;

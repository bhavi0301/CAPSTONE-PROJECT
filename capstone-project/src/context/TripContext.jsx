import { createContext, useState } from "react";

export const TripContext = createContext();

export function TripProvider({ children }) {
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [budget, setBudget] = useState({ total: 2000, expenses: [] });
  const [itinerary, setItinerary] = useState([]);

  function addToSaved(destination) {
    const alreadySaved = savedDestinations.find((d) => d.id === destination.id);
    if (!alreadySaved) {
      setSavedDestinations([...savedDestinations, destination]);
    }
  }

  function removeFromSaved(id) {
    setSavedDestinations(savedDestinations.filter((d) => d.id !== id));
  }

  function updateBudgetTotal(amount) {
    setBudget({ ...budget, total: amount });
  }

  function addExpense(expense) {
    const newExpense = { ...expense, id: Date.now() };
    setBudget({
      ...budget,
      expenses: [...budget.expenses, newExpense],
    });
  }

  function removeExpense(id) {
    setBudget({
      ...budget,
      expenses: budget.expenses.filter((e) => e.id !== id),
    });
  }

  function addToItinerary(item) {
    const newItem = { ...item, id: Date.now() };
    setItinerary([...itinerary, newItem]);
  }

  function removeFromItinerary(id) {
    setItinerary(itinerary.filter((item) => item.id !== id));
  }

  function clearItinerary() {
    setItinerary([]);
  }

  const value = {
    savedDestinations,
    addToSaved,
    removeFromSaved,
    budget,
    updateBudgetTotal,
    addExpense,
    removeExpense,
    itinerary,
    addToItinerary,
    removeFromItinerary,
    clearItinerary,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

import { useState, useContext } from "react";
import { TripContext } from "../context/TripContext";
import "./BudgetPlanner.css";

function BudgetPlanner() {
  const { budget, updateBudgetTotal, addExpense, removeExpense } =
    useContext(TripContext);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");

  const categoryIcons = {
    food: "🍕",
    transport: "✈️",
    hotel: "🏨",
    activities: "🎭",
    shopping: "🛍️",
    other: "📦",
  };

  const categoryColors = {
    food: "#ff6b6b",
    transport: "#6c63ff",
    hotel: "#ffa502",
    activities: "#2ed573",
    shopping: "#e058d0",
    other: "#72757e",
  };

  const totalSpent = budget.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remaining = budget.total - totalSpent;
  const percentage = budget.total > 0 ? (totalSpent / budget.total) * 100 : 0;

  function getProgressClass() {
    if (percentage > 90) return "danger";
    if (percentage > 70) return "warning";
    return "safe";
  }

  const categoryTotals = budget.expenses.reduce((totals, expense) => {
    const cat = expense.category;
    totals[cat] = (totals[cat] || 0) + expense.amount;
    return totals;
  }, {});

  function handleSubmit(e) {
    e.preventDefault();
    if (!expenseName.trim() || !expenseAmount) return;

    addExpense({
      name: expenseName,
      amount: Number(expenseAmount),
      category: expenseCategory,
    });

    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("food");
  }

  return (
    <div className="page-container" style={{ paddingTop: "100px" }}>
      <h1 className="page-title">
        Budget <span className="gradient-text">Planner</span>
      </h1>
      <p className="page-subtitle">
        Track your travel expenses and stay within budget
      </p>

      <div className="budget-layout">
        <div className="budget-overview">
          <div className="budget-total-section">
            <div className="budget-total-label">Total Budget</div>
            <div className="budget-total-input-wrapper">
              <span>$</span>
              <input
                className="budget-total-input"
                type="number"
                value={budget.total}
                onChange={(e) => updateBudgetTotal(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="budget-progress-bar">
            <div
              className={`budget-progress-fill ${getProgressClass()}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <span>{percentage.toFixed(1)}% used</span>
            <span>${remaining.toFixed(2)} left</span>
          </div>

          <div className="budget-summary">
            <div className="budget-summary-card">
              <div className="summary-amount spent">${totalSpent.toFixed(2)}</div>
              <div className="summary-label">Total Spent</div>
            </div>
            <div className="budget-summary-card">
              <div className="summary-amount remaining">
                ${remaining.toFixed(2)}
              </div>
              <div className="summary-label">Remaining</div>
            </div>
          </div>

          {Object.keys(categoryTotals).length > 0 && (
            <div className="budget-breakdown">
              <h3>Spending by Category</h3>
              {Object.entries(categoryTotals).map(([cat, amount]) => (
                <div key={cat} className="breakdown-item">
                  <span className="breakdown-name">
                    <span
                      className="breakdown-dot"
                      style={{ backgroundColor: categoryColors[cat] }}
                    />
                    {categoryIcons[cat]} {cat}
                  </span>
                  <span className="breakdown-amount">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="budget-right">
          <form className="add-expense-form" onSubmit={handleSubmit}>
            <h2>Add Expense</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Expense Name</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="e.g. Flight tickets"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="0.00"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                >
                  <option value="food">🍕 Food</option>
                  <option value="transport">✈️ Transport</option>
                  <option value="hotel">🏨 Hotel</option>
                  <option value="activities">🎭 Activities</option>
                  <option value="shopping">🛍️ Shopping</option>
                  <option value="other">📦 Other</option>
                </select>
              </div>
              <div className="form-group" style={{ justifyContent: "flex-end" }}>
                <button className="btn-primary" type="submit">
                  + Add Expense
                </button>
              </div>
            </div>
          </form>

          <div className="expense-list">
            <h2>Expenses ({budget.expenses.length})</h2>
            {budget.expenses.length === 0 ? (
              <div className="empty-expenses">
                <span>💰</span>
                <p>No expenses yet. Add your first expense above.</p>
              </div>
            ) : (
              budget.expenses.map((expense) => (
                <div key={expense.id} className="expense-item">
                  <div className="expense-info">
                    <div
                      className="expense-icon"
                      style={{
                        background: `${categoryColors[expense.category]}20`,
                      }}
                    >
                      {categoryIcons[expense.category]}
                    </div>
                    <div className="expense-details">
                      <h4>{expense.name}</h4>
                      <span>{expense.category}</span>
                    </div>
                  </div>
                  <div className="expense-right">
                    <span className="expense-amount">
                      ${expense.amount.toFixed(2)}
                    </span>
                    <button
                      className="expense-delete"
                      onClick={() => removeExpense(expense.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;

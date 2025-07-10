import { useState } from "react";
import './Expenses.css';

export default function Expenses({ expensesList, setExpensesList }) {
    const [expense, setExpense] = useState({
        title: "",
        amount: 0,
        category: "",
        date: "",
        reason: ""
      });
    
      const handleChange = (evt) => {
        const { name, value } = evt.target;
        setExpense((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleFormSubmit = (evt) => {
        evt.preventDefault();
    
        const { title, amount, date } = expense;
        if (!title || !amount || !date) {
          alert("Please fill in all required fields.");
          return;
        }
    
        const numericAmount = Number(expense.amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
          alert("Please enter a valid amount.");
          return;
        }
    
        setExpensesList([...expensesList, expense]);
    
        setExpense({
          title: "",
          amount: 0,
          category: "",
          date: "",
          reason: ""
        });
      };
    
      const handleDelete = (indexToDelete) => {
        const updatedList = expensesList.filter((_, index) => index !== indexToDelete);
        setExpensesList(updatedList);
      };
    
      return (
        <div className="expenses-container">
          <h3>📝 Track Your Expenses</h3>
          <form onSubmit={handleFormSubmit} className="expenses-form">
            <input
              name="title"
              placeholder="Title"
              value={expense.title}
              onChange={handleChange}
            />
    
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={handleChange}
            />
    
            <input
              name="category"
              placeholder="Category"
              value={expense.category}
              onChange={handleChange}
            />
    
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />
    
            <textarea
              name="reason"
              placeholder="Reason of Spend"
              value={expense.reason}
              onChange={handleChange}
            />
    
            <button type="submit">Add Expense</button>
          </form>
    
          <div className="expenses-list">
            <h3>All Expenses:</h3>
          {expensesList.length === 0 ? (
            <p className="no-expenses">No expenses added yet.</p>
          ) : (
            expensesList.map((exp, index) => (
              <div key={index} className="expense-item">
                <h4>{exp.title}</h4>
                <p className="amount">Amount: ₹{Number(exp.amount).toLocaleString()}</p>
                <p className="category">{exp.category}</p>
                <p>Date: {exp.date}</p>
                <p>Reason: {exp.reason}</p>
                <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
              </div>
            ))
          )}
          </div>
        </div>
      );
}

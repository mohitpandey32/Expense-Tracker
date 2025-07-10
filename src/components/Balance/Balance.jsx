import { useState } from "react";
import './Balance.css';

export default function Balance({ setTotalIncome }) {
    const [inputBal, setInputBal] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const income = Number(inputBal);
      if (!income || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
      }
  
      setTotalIncome(income);  // 🔁 Updates total income in Dashboard
      setInputBal("");         // Clear the input field after submission
    };
  
    return (
      <div className="balance-container">
        <h3>💰 Set Your Income</h3>
        <form onSubmit={handleSubmit} className="balance-form">
          <input
            type="number"
            placeholder="Enter Total Income"
            value={inputBal}
            onChange={(e) => setInputBal(e.target.value)}
          />
          <button type="submit">Add Income</button>
        </form>
      </div>
    );
}

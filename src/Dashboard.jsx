import { useState } from "react";
import './Dashboard.css'
import Header from './components/Header/Header';
import Balance from './components/Balance/Balance';
import Expenses from './components/Expense/Expenses';
import Chart from "./components/Charts/Chart";

export default function Dashboard({ userName }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [expensesList, setExpensesList] = useState([]);

  const totalExpenses = expensesList.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const remainingBalance = totalIncome - totalExpenses;

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h2>Welcome, {userName} 👋</h2>
      </div>

      <Header />
      
      
      <div className="balance-container">
        
        <Balance setTotalIncome={setTotalIncome} />
      </div>

      <div className="expenses-container">
        
        <Expenses
          expensesList={expensesList}
          setExpensesList={setExpensesList}
        />
      </div>

      <Chart expensesList={expensesList} />

      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <div className="amount">₹{totalIncome.toLocaleString()}</div>
        </div>
        <div className="summary-card expenses">
          <h3>Total Expenses</h3>
          <div className="amount">₹{totalExpenses.toLocaleString()}</div>
        </div>
        <div className="summary-card balance">
          <h3>Remaining Balance</h3>
          <div className="amount">₹{remainingBalance.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

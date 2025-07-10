import { useState, useEffect } from "react";
import { PieChart, BarChart3, TrendingUp } from "lucide-react";
import './Chart.css';

export default function Chart({ expensesList }) {
  const [chartType, setChartType] = useState('pie'); // 'pie' or 'bar'
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Process expenses to get category totals
    const categoryTotals = {};
    
    expensesList.forEach(expense => {
      const category = expense.category || 'Uncategorized';
      const amount = Number(expense.amount) || 0;
      
      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });

    // Convert to array and sort by amount
    const sortedData = Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    setCategoryData(sortedData);
  }, [expensesList]);

  const totalAmount = categoryData.reduce((sum, item) => sum + item.amount, 0);

  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
  ];

  const getPercentage = (amount) => {
    return totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(1) : 0;
  };

  if (categoryData.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>📊 Expense Categories</h3>
        </div>
        <div className="no-data">
          <TrendingUp className="no-data-icon" />
          <p>No expense data available yet.</p>
          <p>Add some expenses to see your spending patterns!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>📊 Expense Categories</h3>
        <div className="chart-controls">
          <button
            className={`chart-btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            <PieChart className="chart-btn-icon" />
            Pie
          </button>
          <button
            className={`chart-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            <BarChart3 className="chart-btn-icon" />
            Bar
          </button>
        </div>
      </div>

      <div className="chart-content">
        {chartType === 'pie' ? (
          <div className="pie-chart-section">
            <div className="pie-chart">
              <svg viewBox="0 0 200 200" className="pie-svg">
                {categoryData.map((item, index) => {
                  const percentage = getPercentage(item.amount);
                  const angle = (percentage / 100) * 360;
                  const startAngle = categoryData
                    .slice(0, index)
                    .reduce((sum, prevItem) => sum + (getPercentage(prevItem.amount) / 100) * 360, 0);
                  
                  const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                  const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                  const x2 = 100 + 80 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
                  const y2 = 100 + 80 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
                  
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M 100 100`,
                    `L ${x1} ${y1}`,
                    `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');

                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={colors[index % colors.length]}
                      className="pie-slice"
                      style={{ '--delay': `${index * 0.1}s` }}
                    />
                  );
                })}
              </svg>
              <div className="pie-center">
                <div className="total-amount">₹{totalAmount.toLocaleString()}</div>
                <div className="total-label">Total</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bar-chart">
            {categoryData.map((item, index) => {
              const percentage = getPercentage(item.amount);
              return (
                <div key={index} className="bar-item">
                  <div className="bar-label">{item.category}</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length],
                        '--delay': `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">₹{item.amount.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="legend">
          {categoryData.map((item, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <div className="legend-details">
                <span className="legend-category">{item.category}</span>
                <span className="legend-amount">₹{item.amount.toLocaleString()}</span>
                <span className="legend-percentage">({getPercentage(item.amount)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
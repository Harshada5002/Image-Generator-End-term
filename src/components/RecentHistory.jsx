import React, { useEffect, useState } from 'react';

function RecentHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem('recentHistory')) || [];
    setHistory(storedHistory);
  };

  const handleClearHistory = () => {
    localStorage.setItem('recentHistory', JSON.stringify([]));
    setHistory([]);
  };

  const handleSearchAgain = (query) => {
    // Move this query to the top of history
    const updatedHistory = [query, ...history.filter(item => item !== query)];
    localStorage.setItem('recentHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    // You could implement a callback to ImageSearch here if needed
  };

  if (history.length === 0) {
    return (
      <div className="empty-state">
        <p>No search history yet</p>
        <p>Your recent searches will appear here</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Recent Searches</h2>
        <button onClick={handleClearHistory} className="clear-button">
          Clear History
        </button>
      </div>
      <div className="history-list">
        {history.map((query, index) => (
          <div key={index} className="history-item" onClick={() => handleSearchAgain(query)}>
            <span className="search-query">🔍 {query}</span>
            <span className="search-again">Search again →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentHistory;
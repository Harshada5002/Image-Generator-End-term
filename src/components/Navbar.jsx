import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span>📸 ImageFinder</span>
      </div>
      <div className="nav-links">
        <button 
          className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Search
        </button>
        <button 
          className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📜 History
        </button>
        <button 
          className={`nav-link ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          ❤️ Favorites
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
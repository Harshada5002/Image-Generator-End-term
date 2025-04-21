import React, { useState } from 'react';
import './App.css';
import ImageSearch from './components/ImageSearch';
import RecentHistory from './components/RecentHistory';
import LikedImages from './components/LikedImages';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('search');

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <ImageSearch />;
      case 'history':
        return <RecentHistory />;
      case 'liked':
        return <LikedImages />;
      default:
        return <ImageSearch />;
    }
  };

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

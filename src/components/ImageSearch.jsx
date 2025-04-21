import React, { useState } from 'react';

function ImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pixabay.com/api/?key=49834521-7e00bf0eff5623af92bd0514d&q=${encodeURIComponent(searchQuery)}&image_type=photo&per_page=20`);
      const data = await response.json();
      
      if (data.hits.length === 0) {
        setError('No images found. Try a different search term.');
        setImages([]);
      } else {
        setImages(data.hits);
        // Update search history
        let history = JSON.parse(localStorage.getItem('recentHistory')) || [];
        history = [searchQuery, ...history.filter(item => item !== searchQuery)].slice(0, 10);
        localStorage.setItem('recentHistory', JSON.stringify(history));
      }
    } catch (error) {
      setError('Failed to fetch images. Please try again.');
      console.error('Error fetching images:', error);
      setImages([]);
    }
    setLoading(false);
  };

  const handleLike = (image) => {
    const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
    const isAlreadyLiked = likedImages.some(img => img.id === image.id);
    
    if (!isAlreadyLiked) {
      const updatedLikes = [...likedImages, {
        id: image.id,
        url: image.webformatURL,
        alt: image.tags,
        timestamp: Date.now()
      }];
      localStorage.setItem('likedImages', JSON.stringify(updatedLikes));
      alert('Image added to favorites!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="image-search">
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !query.trim()}>
          {loading ? '🔄 Searching...' : '🔍 Search'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && images.length === 0 && (
        <div className="empty-state">
          <p>✨ Start searching for amazing images!</p>
          <p>Try searching for: nature, animals, food, or technology</p>
        </div>
      )}
      
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.webformatURL} alt={image.tags} />
            <button
              className="like-button"
              onClick={() => handleLike(image)}
              title="Add to favorites"
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;
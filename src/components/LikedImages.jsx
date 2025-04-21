import React, { useEffect, useState } from 'react';

function LikedImages() {
  const [likedImages, setLikedImages] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadLikedImages();
  }, []);

  const loadLikedImages = () => {
    const stored = JSON.parse(localStorage.getItem('likedImages')) || [];
    const sorted = sortImages(stored, sortBy);
    setLikedImages(sorted);
  };

  const sortImages = (images, sort) => {
    return [...images].sort((a, b) => {
      if (sort === 'newest') {
        return b.timestamp - a.timestamp;
      }
      return a.timestamp - b.timestamp;
    });
  };

  const handleUnlike = (imageId) => {
    const updatedImages = likedImages.filter(img => img.id !== imageId);
    localStorage.setItem('likedImages', JSON.stringify(updatedImages));
    setLikedImages(updatedImages);
  };

  const handleSort = (newSort) => {
    setSortBy(newSort);
    setLikedImages(sortImages(likedImages, newSort));
  };

  if (likedImages.length === 0) {
    return (
      <div className="empty-state">
        <p>No favorite images yet</p>
        <p>Click the heart icon on any image to add it to your favorites</p>
      </div>
    );
  }

  return (
    <div className="liked-images-container">
      <div className="liked-header">
        <h2>Favorite Images ({likedImages.length})</h2>
        <div className="sort-controls">
          <span>Sort by: </span>
          <button 
            className={`sort-button ${sortBy === 'newest' ? 'active' : ''}`}
            onClick={() => handleSort('newest')}
          >
            Newest
          </button>
          <button 
            className={`sort-button ${sortBy === 'oldest' ? 'active' : ''}`}
            onClick={() => handleSort('oldest')}
          >
            Oldest
          </button>
        </div>
      </div>
      <div className="image-grid">
        {likedImages.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.url} alt={image.alt} />
            <button
              className="like-button unlike"
              onClick={() => handleUnlike(image.id)}
              title="Remove from favorites"
            >
              💔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedImages;
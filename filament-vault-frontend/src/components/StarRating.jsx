/**
 * Reusable component for selecting and displaying star-based ratings.
 * Used in both filament review submission and review displays.
 * Supports hover-based highlighting and visual feedback for selected ratings.
 */
import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    onRatingChange(index + 1); 
  };


  const stars = Array(5).fill(false).map((_, index) => index < (hovered || rating));

  return (
    <div className="star-rating">
      {stars.map((filled, index) => (
        <span
          key={index}
          className={`star ${filled ? 'filled' : ''}`}  
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

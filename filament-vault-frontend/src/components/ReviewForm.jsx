import React, { useState } from 'react';
import StarRating from './StarRating'; 

const ReviewForm = ({ filamentId, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); 

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewText && rating > 0) {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      const newReview = {
        review: reviewText,
        rating,
      };
  
      try {
        const response = await fetch(`http://localhost:5000/api/filaments/${filamentId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // JWT Send token here
          },
          body: JSON.stringify(newReview),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          onSubmit(newReview); 
          setReviewText('');
          setRating(0);
          alert('Review submitted!');
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review.');
      }
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Rating:
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </label>
      </div>
      <div>
        <label>
          Review:
          <textarea
            value={reviewText}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
          />
        </label>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;

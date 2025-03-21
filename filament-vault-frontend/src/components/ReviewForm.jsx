import React, { useState } from 'react';
import StarRating from './StarRating'; 

const ReviewForm = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); 

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText && rating > 0) {
      const newReview = {
        review: reviewText,
        rating,
      };
      onSubmit(newReview); 
      setReviewText('');
      setRating(0); 
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

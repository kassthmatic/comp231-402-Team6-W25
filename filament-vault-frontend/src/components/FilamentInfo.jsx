import React, { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
import FilamentCard from './FilamentCard';
import StarRating from "../components/StarRating";
import ReviewForm from "../components/ReviewForm";


const FilamentInfo = () => {
  const { id } = useParams();
  const [filament, setFilament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [averageRating, setAverageRating] = useState(0);

    const handleNewReview = (newReview) => {
    setReviews([...reviews, newReview]); 
  
    const newAverage = ([...reviews, newReview].reduce((sum, r) => sum + r.rating, 0) / ([...reviews, newReview].length)).toFixed(1);
    setAverageRating(newAverage);
  };

  useEffect(() => {
    const fetchFilament = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/filaments/${id}`);
        setFilament(response.data);
        
        if (response.data.reviews) {
          setReviews(response.data.reviews);
          const avg = response.data.reviews.reduce((sum, r) => sum + r.rating, 0) / response.data.reviews.length;
          setAverageRating(avg.toFixed(1)); 
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filament:", error);
        setError("Failed to load filament information");
        setLoading(false);
      }
    };
  
    fetchFilament();
  }, [id]);  

  if (loading) return <p className="loading-message">Loading filament information...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!filament) return <p className="error-message">Filament not found</p>;

  return (
    <div className="filament-info-container">
      <div className="filament-header">
        <h1>{filament.name}</h1>
        <div className="filament-image-container">
          <img src={filament.image} alt={filament.name} className="filament-detail-image" />
        </div>
      </div>

      <div className="filament-details">
        <table className="filament-info-table">
          <tbody>
            <tr>
              <th>Brand</th>
              <td>{filament.brand}</td>
            </tr>
            <tr>
              <th>Material</th>
              <td>{filament.material}</td>
            </tr>
            <tr>
              <th>Available Colors</th>
              <td>
                {filament.available_colours && filament.available_colours.length > 0
                  ? filament.available_colours.join(", ")
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Printing Temperature</th>
              <td>{filament.printing_temperature}</td>
            </tr>
            <tr>
              <th>Enclosure Required</th>
              <td>{filament.enclosure_required}</td>
            </tr>
            <tr>
              <th>Purchase Here</th>
              <td><a 
      href="https://ca.elegoo.com/products/rapid-petg-filament-1-75mm-colored-1kg?gad_source=1&gclid=Cj0KCQjwqcO_BhDaARIsACz62vPEjUhjmvOYv9T4XLI-pCITOVeZp_HDRty2YZwhZicnV9U6z2HjLaEaAnobEALw_wcB"
      target="_blank" 
      rel="noopener noreferrer">
        {filament.purchase_from}</a> </td>
            </tr>
            
          </tbody>
        </table>
      </div>

      <div className="filament-actions">
      <div className="filament-reviews">
  <h2>Customer Reviews</h2>

  {/* Display average rating */}
  <div>
    <strong>Average Rating:</strong> <StarRating rating={Math.round(averageRating)} />
    <p>{averageRating} out of 5</p>
  </div>

  {/* List of existing reviews */}
  {reviews.length > 0 ? (
    <ul>
      {reviews.map((review, index) => (
        <li key={index}>
          <StarRating rating={review.rating} />
          <p>{review.review}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No reviews yet. Be the first to review this filament!</p>
  )}

  {/* Review submission form */}
  <ReviewForm filamentId={id} onSubmit={handleNewReview} />
</div>        
        <button className="back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default FilamentInfo;


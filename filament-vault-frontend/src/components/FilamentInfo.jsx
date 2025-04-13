/**
 * Displays detailed information for a selected filament.
 * Allows users to view brand, material, ratings, and submit reviews.
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "../index.css";
import StarRating from "../components/StarRating";
import ReviewForm from "../components/ReviewForm";

const FilamentInfo = () => {
  const { id } = useParams();
  const [filament, setFilament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleNewReview = (newReview) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    const newAverage = (
      updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
    ).toFixed(1);
    setAverageRating(newAverage);
  };

  const handleDeleteReview = async (reviewId, index) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/filaments/${id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
        if (updatedReviews.length > 0) {
          const newAverage = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          setAverageRating(newAverage);
        } else {
          setAverageRating(0);
        }
        alert("Review deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const toggleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (isSaved) {
        await axios.delete(`http://localhost:5000/api/users/unsave-filament/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSaved(false);
      } else {
        await axios.post(`http://localhost:5000/api/users/save-filament/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  useEffect(() => {
    const fetchFilament = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/filaments/${id}`);
        setFilament(response.data);
        if (response.data.reviews) {
          setReviews(response.data.reviews);
          const avg =
            response.data.reviews.reduce((sum, r) => sum + r.rating, 0) /
            response.data.reviews.length;
          setAverageRating(avg.toFixed(1));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filament:", error);
        setError("Failed to load filament information");
        setLoading(false);
      }
    };

    const checkAdminStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const tokenData = JSON.parse(atob(token.split(".")[1]));
          if (!tokenData.role) {
            const userResponse = await axios.get("http://localhost:5000/api/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setIsAdmin(userResponse.data.user.role === "admin");
          } else {
            setIsAdmin(tokenData.role === "admin");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };

    const checkIfSaved = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/saved-filaments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const savedIds = res.data.map((f) => f._id);
        setIsSaved(savedIds.includes(id));
      } catch (err) {
        console.error("Error checking saved status", err);
      }
    };

    fetchFilament();
    checkAdminStatus();
    checkIfSaved();
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
        <FaHeart
          onClick={toggleSave}
          style={{
            cursor: "pointer",
            color: isSaved ? "red" : "white",
            stroke: "black",
            strokeWidth: 25,
          }}
          title={isSaved ? "Remove from favorites" : "Add to favorites"}
          size={24}
        />
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
              <td>{filament.available_colours?.join(", ") || "N/A"}</td>
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
              <td>
                <a
                  href={filament.purchase_from}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {filament.purchase_from}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="filament-actions">
        <div className="filament-reviews">
          <h2>Customer Reviews</h2>
          <div>
            <strong>Average Rating:</strong> <StarRating rating={Math.round(averageRating)} />
            <p>{averageRating} out of 5</p>
          </div>

          {reviews.length > 0 ? (
            <ul className="review-list">
              {reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <div className="review-content">
                    <StarRating rating={review.rating} />
                    <p>{review.review}</p>
                  </div>
                  {isAdmin && (
                    <button
                      className="delete-review-button"
                      onClick={() => handleDeleteReview(review._id, index)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet. Be the first to review this filament!</p>
          )}

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
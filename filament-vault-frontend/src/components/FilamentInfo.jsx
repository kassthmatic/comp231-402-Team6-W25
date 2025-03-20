import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";

const FilamentInfo = () => {
  const { id } = useParams();
  const [filament, setFilament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilament = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/filaments/${id}`);
        setFilament(response.data);
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
            
          </tbody>
        </table>
      </div>

      <div className="filament-actions">
        
        <button className="back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default FilamentInfo;
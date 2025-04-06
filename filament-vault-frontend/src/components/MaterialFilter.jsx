import React, { useState, useEffect } from "react";
import axios from "axios";

const MaterialFilter = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [filteredFilaments, setFilteredFilaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  // Fetch unique materials on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/filaments")
      .then((response) => {
        // Extract unique materials from all filaments
        const uniqueMaterials = [...new Set(response.data
          .filter(filament => filament.material) // Filter out any null/undefined materials
          .map(filament => filament.material))];
        setMaterials(uniqueMaterials.sort());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
        setLoading(false);
      });
  }, []);

  const handleMaterialChange = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    
    if (!material) {
      setFilteredFilaments([]);
      return;
    }

    setFilterLoading(true);
    
    axios
      .get(`http://localhost:5000/api/filaments/filter?material=${material}`)
      .then((response) => {
        setFilteredFilaments(response.data);
        setFilterLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching filtered filaments:", error);
        setFilterLoading(false);
      });
  };

  const handleClearFilter = () => {
    setSelectedMaterial("");
    setFilteredFilaments([]);
  };

  const renderFilamentCards = (filaments) => {
    return filaments.length > 0 ? (
      filaments.map((filament) => (
        <div key={filament._id} className="filament-card">
          <a href={`/filament/${filament._id}`} className="filament-link">
            <img 
              src={filament.image || "https://via.placeholder.com/200"} 
              alt={filament.name} 
              style={{ width: "200px", height: "auto", borderRadius: "5px" }}
              className="filament-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/200?text=No+Image";
              }}
            />
            <h3 className="filament-name">{filament.name}</h3>
            <p className="filament-details">Brand: {filament.brand || "N/A"}</p>
            <p className="filament-details">Material: {filament.material}</p>
            <p className="filament-rating">
              Rating: {filament.rating ? "⭐".repeat(Math.round(filament.rating)) : "Not rated"}
            </p>
          </a>
        </div>
      ))
    ) : (
      <p className="no-filaments">No filaments found for this material.</p>
    );
  };

  if (loading) return <div className="material-filter-container loading">Loading material filters...</div>;

  return (
    <div className="material-filter-container">
      <div className="material-filter">
        <h3>Filter by Material</h3>
        <div className="filter-controls">
          <select 
            value={selectedMaterial} 
            onChange={handleMaterialChange}
            className="material-select"
          >
            <option value="">All Materials</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
          {selectedMaterial && (
            <button onClick={handleClearFilter} className="clear-filter-btn">
              Clear Filter
            </button>
          )}
        </div>
      </div>
      
      {/* Filtered Results Section - Only show when a filter is active */}
      {selectedMaterial && (
        <div className="filtered-results">
          <h2 className="filtered-title">{selectedMaterial} Filaments</h2>
          {filterLoading ? (
            <p className="loading-message">Loading filtered filaments...</p>
          ) : (
            <div className="filament-list">
              {renderFilamentCards(filteredFilaments)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialFilter;
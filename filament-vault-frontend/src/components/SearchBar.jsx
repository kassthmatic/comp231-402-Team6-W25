/**
 * Search component for querying filaments by name.
 * Filters results and updates the filament display dynamically.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFilaments, setAllFilaments] = useState([]);
  const [filteredFilaments, setFilteredFilaments] = useState([]);
  const [selectedFilaments, setSelectedFilaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/filaments")
      .then(res => setAllFilaments(res.data))
      .catch(err => console.error("Error fetching filaments:", err));
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredFilaments([]);
    } else {
      const results = allFilaments.filter(filament =>
        filament.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFilaments(results);
    }
  }, [searchTerm, allFilaments]);

  const handleCheckboxChange = (filamentId) => {
    setSelectedFilaments((prevSelected) =>
      prevSelected.includes(filamentId)
        ? prevSelected.filter(id => id !== filamentId)
        : [...prevSelected, filamentId]
    );
  };

  const handleCompareClick = () => {
    if (selectedFilaments.length > 1) {
      setSearchTerm("");
      setFilteredFilaments([]);
      setSelectedFilaments([]);
  
      navigate(`/compare?ids=${selectedFilaments.join(",")}`);
    } else {
      alert("Please select at least two filaments to compare.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Filaments..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <div className="search-dropdown">
          <ul>
            {filteredFilaments.length > 0 ? (
              filteredFilaments.map((filament) => (
                <li key={filament._id} className="search-result-item">
                  <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="checkbox"
                      checked={selectedFilaments.includes(filament._id)}
                      onChange={() => handleCheckboxChange(filament._id)}
                    />
                    <a
                      href={`/filament/${filament._id}`}
                      className="search-result-link"
                      style={{ flex: 1 }}
                    >
                      {filament.name}
                    </a>
                  </label>
                </li>
              ))
            ) : (
              <li className="search-result-item no-results">No matching filaments found.</li>
            )}
          </ul>
          <button
            onClick={handleCompareClick}
            className="review-button"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Compare Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

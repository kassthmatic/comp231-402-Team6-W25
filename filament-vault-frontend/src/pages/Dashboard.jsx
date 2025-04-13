/**
 * Dashboard component that greets the user and shows their saved filaments.
 * Includes buttons for navigating to other features (edit profile, account info).
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
  const [username, setUsername] = useState("User");
  const [savedFilaments, setSavedFilaments] = useState([]);

  const handleUnsave = async (filamentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/unsave-filament/${filamentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Remove filament from local state to update UI
        setSavedFilaments((prev) => prev.filter((f) => f._id !== filamentId));
      } else {
        console.error("Failed to unsave filament");
      }
    } catch (err) {
      console.error("Error unsaving filament:", err);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchSavedFilaments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/users/saved-filaments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved filaments");
        }

        const data = await response.json();
        setSavedFilaments(data);
      } catch (error) {
        console.error("Error fetching filaments:", error);
      }
    };

    fetchSavedFilaments();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {username}</h2>
        <button className="logout-button">Logout</button>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-sidebar-left">
          <button className="sidebar-button">Saved Filaments</button>
          <button className="sidebar-button">Top-Rated Filaments</button>
        </div>

        <div className="dashboard-center">
          <h3>Favorited / Saved Filaments</h3>
          <div className="filament-cards">
  {savedFilaments.length === 0 ? (
    <p>No saved filaments yet.</p>
  ) : (
    savedFilaments.map((filament) => (
      <div className="filament-card" key={filament._id} style={{ position: "relative" }}>

        {/* Heart Button for Unsaving */}
    <button
      onClick={() => handleUnsave(filament._id)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "20px",
        color: "red",
        cursor: "pointer"
      }}
      title="Remove from favorites"
    >
      ♥
    </button>

        {/* Image */}
        {filament.image && (
          <img
            src={filament.image}
            alt={filament.name}
            className="filament-image"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />
        )}

        {/* Info */}
        <h4>{filament.name}</h4>
        <Link to={`/filament/${filament._id}`}>Go to Filament Info</Link>
        <ul>
          <li>Brand: {filament.brand}</li>
          <li>Material: {filament.material}</li>
          <li>Rating: {filament.rating || "N/A"}</li>
        </ul>
      </div>
    ))
  )}
</div>
        </div>

        <div className="dashboard-sidebar-right">
          <div className="profile-box">
            <div className="profile-avatar">👤</div>
            <p>{username}</p>
          </div>
          <button className="sidebar-button">Edit Profile</button>
          <button className="sidebar-button">Account Info</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
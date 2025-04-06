import React, { useState, useEffect } from "react";
import axios from "axios";
import '../index.css';
import logo from '../assets/FilamentVaultLogo.jpg';
import MaterialFilter from "./MaterialFilter";

const Home = () => {
  const [topRatedFilaments, setTopRatedFilaments] = useState([]);
  const [recentlyAddedFilaments, setRecentlyAddedFilaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top-rated filaments
    axios
      .get("http://localhost:5000/api/filaments/top-rated")
      .then((response) => {
        setTopRatedFilaments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top-rated filaments:", error);
      });

    // Fetch recently added filaments
    axios
      .get("http://localhost:5000/api/filaments/recently-added")
      .then((response) => {
        setRecentlyAddedFilaments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recently added filaments:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-message">Loading filaments...</p>;

  return (
    <div className="home-container">
      {/* Logo */}
      <div className="logo-container">
          <img src={logo} alt="Filament Vault Logo" className="logo" />
      </div>

      <MaterialFilter />

      {/* Main Content */}
      <div className="main-content">
        <section className="featured-filaments">
          {/* Recently Added Section */}
          <h2 className="title">Recently Added Filaments</h2>
          <div className="filament-list">
            {recentlyAddedFilaments.length > 0 ? (
              recentlyAddedFilaments.map((filament) => (
                <div key={filament._id} className="filament-card">
                  <a href={`/filament/${filament._id}`} className="filament-link">
                    <img 
                      src={filament.image} 
                      alt={filament.name} 
                      style={{ width: "200px", height: "auto", borderRadius: "5px" }}
                      className="filament-image"
                    />
                    <h3 className="filament-name">{filament.name}</h3>
                    <p className="filament-details">Brand: {filament.brand}</p>
                    <p className="filament-details">Material: {filament.material}</p>
                    <p className="filament-rating">
                      Rating: {"⭐".repeat(Math.round(filament.rating))}
                    </p>
                  </a>
                </div>
              ))
            ) : (
              <p className="no-filaments">No recently added filaments found.</p>
            )}
          </div>
        </section>

        {/* Top-Rated Filaments Section */}
        <section className="featured-filaments">
          <h2 className="title">Top-Rated Filaments</h2>
          <div className="filament-list">
            {topRatedFilaments.length > 0 ? (
              topRatedFilaments.map((filament) => (
                <div key={filament._id} className="filament-card">
                  <a href={`/filament/${filament._id}`} className="filament-link">
                    <img 
                      src={filament.image} 
                      alt={filament.name} 
                      style={{ width: "200px", height: "auto", borderRadius: "5px" }}
                      className="filament-image"
                    />
                    <h3 className="filament-name">{filament.name}</h3>
                    <p className="filament-details">Brand: {filament.brand}</p>
                    <p className="filament-details">Material: {filament.material}</p>
                    <p className="filament-rating">
                      Rating: {"⭐".repeat(Math.round(filament.rating))}
                    </p>
                  </a>
                </div>
              ))
            ) : (
              <p className="no-filaments">No top-rated filaments found.</p>
            )}
          </div>
        </section>

        {/* FAQ Button */}
        <div className="faq-button">
          <button className="faq-btn">FAQ</button>
        </div>

        {/* Help/Leave Feedback Button */}
        <div className="feedback-button">
          <button className="feedback-btn">Help/Leave Feedback</button>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Footer Content Here</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
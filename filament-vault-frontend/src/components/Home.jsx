/**
 * Home page component that displays top-rated and recently added filaments.
 * Also renders the search bar, MaterialFilter, and navigation buttons to other pages.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import logo from "../assets/FilamentVaultLogo.jpg";
import MaterialFilter from "./MaterialFilter";
import { Link } from "react-router-dom";
import FilamentCard from "./FilamentCard";

const Home = () => {
  const [topRatedFilaments, setTopRatedFilaments] = useState([]);
  const [recentlyAddedFilaments, setRecentlyAddedFilaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/filaments/top-rated")
      .then((response) => {
        setTopRatedFilaments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top-rated filaments:", error);
      });

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
      <div className="logo-container">
        <img src={logo} alt="Filament Vault Logo" className="logo" />
      </div>

      <MaterialFilter />

      <div className="main-content">
        <section className="featured-filaments">
          <h2 className="title">Recently Added Filaments</h2>
          <div className="filament-list">
            {recentlyAddedFilaments.length > 0 ? (
              recentlyAddedFilaments.map((filament) => (
                <FilamentCard key={filament._id} filament={filament} />
              ))
            ) : (
              <p className="no-filaments">No recently added filaments found.</p>
            )}
          </div>
        </section>

        <section className="featured-filaments">
          <h2 className="title">Top-Rated Filaments</h2>
          <div className="filament-list">
            {topRatedFilaments.length > 0 ? (
              topRatedFilaments.map((filament) => (
                <FilamentCard key={filament._id} filament={filament} />
              ))
            ) : (
              <p className="no-filaments">No top-rated filaments found.</p>
            )}
          </div>
        </section>

        <div className="faq-button">
          <Link to="/faq">
            <button className="faq-btn">FAQ</button>
          </Link>
        </div>

        <div className="feedback-button">
          <Link to="/help">
            <button className="feedback-btn">Help/Leave Feedback</button>
          </Link>
        </div>

        <footer className="footer">
          <p>Built by Group 6 // Centennial College | COMP231 SEC402</p>
          <p>&copy; {new Date().getFullYear()} Filament Vault | Powered by MongoDB, Express, React, and Node</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
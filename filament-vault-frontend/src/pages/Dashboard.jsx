import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
    const [username, setUsername] = useState("User");
  
    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
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
              {[1, 2, 3].map((_, index) => (
                <div className="filament-card" key={index}>
                  <h4>Favorited Filament</h4>
                  <Link to="/filament/1">Go to Filament Info</Link>
                  <ul>
                    <li>Filament Info</li>
                    <li>Buy Now</li>
                    <li>Leave Review</li>
                  </ul>
                </div>
              ))}
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
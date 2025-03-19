import React from "react";
import Home from "./components/Home";
import logo from './assets/FilamentVaultLogo.jpg';  // Import your logo
import "./index.css";

function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Filament Vault Logo" className="logo" />
        </div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        {/* Login/Register Button */}
        <div className="auth-buttons">
          <button className="login-button">Login/Register</button>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search Filaments..." className="search-input" />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Home />
      </div>
    </div>
  );
}

export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FilamentInfo from "./components/FilamentInfo";
import logo from './assets/FilamentVaultLogo.jpg';
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo-container">
            <a href="/">
              <img src={logo} alt="Filament Vault Logo" className="logo" />
            </a>
          </div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filament/:id" element={<FilamentInfo />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
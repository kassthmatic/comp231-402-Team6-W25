import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import FilamentInfo from "./components/FilamentInfo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import logo from './assets/FilamentVaultLogo.jpg';
import "./index.css";
import FAQ from './pages/FAQ';
import SearchBar from "./components/SearchBar";
import Compare from "./pages/Compare";

function App() {

  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Remove token (Logout)
      localStorage.removeItem('token');
      window.location.href = "/";  // Redirect to home page
    } else {
      window.location.href = "/login";  // Redirect to login page
    }
  };

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

          {/* Login/Register Buttons */}
          <div className="auth-buttons">
            <button 
              className="login-button" 
              onClick={handleLoginLogout}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            {!isLoggedIn && (
              <button 
                className="register-button" 
                onClick={() => window.location.href = "/register"}
              >
                Register
              </button>
            )}
          </div>
          </nav>

        {/* Search Bar */}
        <SearchBar />

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filament/:id" element={<FilamentInfo />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;



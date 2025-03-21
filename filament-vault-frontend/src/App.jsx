import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FilamentInfo from "./components/FilamentInfo";
import Register from "./pages/Register";
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

          {/* Login/Register Buttons */}
          <div className="auth-buttons">
          <button className="login-button" onClick={() => window.location.href = "/login"}>
            Login
          </button>
         <button className="register-button" onClick={() => window.location.href = "/register"}>
          Register
          </button>
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
            <Route path="/register" element={<Register />} />
            {/* Login Route to be added here */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;



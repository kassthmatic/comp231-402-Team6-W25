import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import FilamentInfo from "./components/FilamentInfo";
import Register from "./pages/Register";
import logo from './assets/FilamentVaultLogo.jpg';
import "./index.css";

function App() {

  // Search Functionality state
  const [searchTerm, setSearchTerm] = useState("");
  const [allFilaments, setAllFilaments] = useState([]);
  const [filteredFilaments, setFilteredFilaments] = useState([]);

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
                        <a href={`/filament/${filament._id}`} className="search-result-link">
                          {filament.name}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="search-result-item no-results">No matching filaments found.</li>
                  )}
                </ul>
              </div>
            )}
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



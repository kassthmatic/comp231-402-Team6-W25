const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const filamentsRouter = require("./routes/filaments");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://FilamentVault:Mi5thDXF0Z07PgzK@filamentvaultdb.pkgea.mongodb.net/FilamentVault?retryWrites=true&w=majority&appName=FilamentVaultDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/filaments", filamentsRouter);  // This should be registered correctly

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
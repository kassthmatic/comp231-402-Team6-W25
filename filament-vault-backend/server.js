/**
 * Entry point for the Express backend server.
 * Handles middleware setup and connects to MongoDB.
 */

require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const feedbackRouter = require('./routes/feedback');
const filamentsRouter = require("./routes/filaments");
const authRouter = require("./routes/auth"); 
const profileRouter = require("./routes/profile");
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/feedback', feedbackRouter);

// Connect to MongoDB using URI from environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/filaments", filamentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/users", userRoutes);


// Start the server — only if not in test mode
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

//for Supertest to use in Jest
module.exports = app;

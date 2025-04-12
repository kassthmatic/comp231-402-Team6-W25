require('dotenv').config();
// console.log('JWT_SECRET:', process.env.JWT_SECRET); //to see any errors with JWT 

const JWT_SECRET = 'supersecret_dont_share';

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

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://FilamentVault:Mi5thDXF0Z07PgzK@filamentvaultdb.pkgea.mongodb.net/FilamentVault?retryWrites=true&w=majority&appName=FilamentVaultDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/filaments", filamentsRouter); 
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/feedback", feedbackRouter);
app.use('/api/users', userRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


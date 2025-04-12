require('dotenv').config();

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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
<<<<<<< HEAD
app.use("/api/filaments", filamentsRouter); 
=======
app.use("/api/filaments", filamentsRouter);
>>>>>>> a1a7c86a76bf24bace1c0951af21c3c43eec20ff
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/feedback", feedbackRouter);
app.use('/api/users', userRoutes);


// Start the server — only if not in test mode
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

//for Supertest to use in Jest
module.exports = app;

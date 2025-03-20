const express = require("express");
const Filament = require("../models/Filament");

const router = express.Router();

// Get all filaments
router.get("/", async (req, res) => {
  try {
    const filaments = await Filament.find();
    res.json(filaments);
  } catch (error) {
    console.error("Error fetching filaments:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get top-rated filaments (sorted by rating, highest first)
router.get("/top-rated", async (req, res) => {
  try {
    const filaments = await Filament.find().sort({ rating: -1 }).limit(5);
    res.json(filaments);
  } catch (error) {
    console.error("Error fetching top-rated filaments:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get recently added filaments
router.get('/recently-added', async (req, res) => {
  try {
    const filaments = await Filament.find().sort({ created_at: -1 }).limit(5); // Use created_at instead of createdAt
    res.json(filaments);
  } catch (error) {
    console.error("Error fetching recently added filaments:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



// Get filament by ID
router.get("/:id", async (req, res) => {
  try {
    const filament = await Filament.findById(req.params.id);
    if (!filament) {
      return res.status(404).json({ message: "Filament not found" });
    }
    res.json(filament);
  } catch (error) {
    console.error("Error fetching filament:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
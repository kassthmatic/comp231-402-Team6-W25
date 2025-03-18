const express = require("express");
const Filament = require("../models/Filament");

const router = express.Router();

// Get all filaments
router.get("/", async (req, res) => {
  try {
    const filaments = await Filament.find();
    res.json(filaments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get featured filaments (limit to 5)
router.get("/featured", async (req, res) => {
  try {
    const filaments = await Filament.find().limit(5);
    res.json(filaments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get top-rated filaments (sorted by rating)
router.get("/top-rated", async (req, res) => {
  try {
    const filaments = await Filament.find().sort({ rating: -1 }).limit(5);
    res.json(filaments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new filament
router.post("/", async (req, res) => {
  try {
    const newFilament = new Filament(req.body);
    const savedFilament = await newFilament.save();
    res.status(201).json(savedFilament);
  } catch (error) {
    res.status(400).json({ message: "Error saving filament", error });
  }
});

module.exports = router;
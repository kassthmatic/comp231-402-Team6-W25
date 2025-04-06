const express = require("express");
const Filament = require("../models/Filament");
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');


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

// Filter filaments by material
router.get("/filter", async (req, res) => {
  const { material } = req.query;

  
  if (!material) {
    return res.status(400).json({ message: "Material query parameter is required." });
  }

  try {
    // Use $regex for case-insensitive matching of material
    const filteredFilaments = await Filament.find({
      material: { $regex: material, $options: "i" }
    });

    if (filteredFilaments.length === 0) {
      return res.status(404).json({ message: `No filaments found for material: ${material}` });
    }

    res.json(filteredFilaments);
  } catch (error) {
    console.error("Error fetching filtered filaments:", error);
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

// POST a new review on a filament (registered users only)
router.post('/:id/reviews', verifyToken, async (req, res) => {
  const filamentId = req.params.id;
  const { review, rating } = req.body;

  try {
    const filament = await Filament.findById(filamentId);
    if (!filament) {
      return res.status(404).json({ message: 'Filament not found' });
    }

    const newReview = {
      review,
      rating,
      user: req.user.userId, 
    };

    filament.reviews.push(newReview);
    await filament.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error while adding review' });
  }
});

// Delete a review (admin only)
router.delete('/:id/reviews/:reviewId', verifyToken, async (req, res) => {
  try {
    
    const filament = await Filament.findById(req.params.id);
    if (!filament) {
      return res.status(404).json({ message: 'Filament not found' });
    }

    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized. Admin access required.' });
    }

    
    const reviewIndex = filament.reviews.findIndex(
      (review) => review._id.toString() === req.params.reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    
    filament.reviews.splice(reviewIndex, 1);
    await filament.save();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
});



module.exports = router;
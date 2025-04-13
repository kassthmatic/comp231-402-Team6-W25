const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const User = require('../models/User');
const Filament = require('../models/Filament'); 

// Save a filament to the logged-in user's favorites (savedFilaments array)
router.post('/save-filament/:filamentId', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const filamentId = req.params.filamentId;
      
      // Only add the filament if it's not already in the saved list
      if (!user.savedFilaments.includes(filamentId)) {
        user.savedFilaments.push(filamentId);
        await user.save();
      }
  
      res.status(200).json({ message: 'Filament saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error saving filament' });
    }
  });

  // Remove a filament from the user's favorites
  router.delete('/unsave-filament/:filamentId', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const filamentId = req.params.filamentId;
  
      user.savedFilaments = user.savedFilaments.filter(id => id.toString() !== filamentId);
      await user.save();
  
      res.status(200).json({ message: 'Filament removed from favorites' });
    } catch (err) {
      res.status(500).json({ error: 'Error removing filament' });
    }
  });

  // Retrieve all filaments the user has favorited
  router.get('/saved-filaments', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('savedFilaments');
      res.json(user.savedFilaments);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load saved filaments' });
    }
  });

  module.exports = router;

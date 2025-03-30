const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User'); //import uer model
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing



// Protected route
router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authorized!',
    user: req.user // The authenticated user data attached by the middleware
  });
});

// NEW: Update Password Route
router.put('/update-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both fields are required' });
  }

  try {
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword; 
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

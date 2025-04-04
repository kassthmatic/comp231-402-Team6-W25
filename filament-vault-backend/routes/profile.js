const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

// Password strength 
function isStrongPassword(password) {
  return password.length >= 8;
}

// Protected route
router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authorized!',
    user: req.user 
  });
});

//Update password route
router.put('/update-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both fields are required' });
  }

  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({ error: 'New password must be at least 8 characters.' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password?.toString?.()
    );

    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save(); 
    

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('Server error during password update:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


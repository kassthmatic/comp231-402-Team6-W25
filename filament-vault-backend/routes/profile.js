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

// Update username route
router.put('/update-username', authMiddleware, async (req, res) => {
  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).json({ error: 'New username is required' });
  }

  try {
    
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = newUsername;
    await user.save();

    res.json({ 
      message: 'Username updated successfully',
      username: newUsername
    });

  } catch (err) {
    res.status(500).json({ error: 'Unable to update username' });
  }
});

// Update email route
router.put('/update-email', authMiddleware, async (req, res) => {
  const { newEmail } = req.body;

  if (!newEmail) {
    return res.status(400).json({ error: 'New email is required' });
  }

  try {
    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail && existingEmail._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.email = newEmail;
    await user.save();

    res.json({ 
      message: 'Email updated successfully',
      email: newEmail
    });

  } catch (err) {
    console.error('Server error during email update:', err);
    res.status(500).json({ error: 'Unable to update email' });
  }
});


module.exports = router;


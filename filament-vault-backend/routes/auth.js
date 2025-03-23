const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Hardcoded JWT Secret
const JWT_SECRET = 'supersecret_dont_share';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Hashed password during registration:', hashedPassword); // Log the hashed password

    const newUser = new User({ username, email, password });
    await newUser.save();

    // JWT token so the user stays logged in after registering or logging in
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,  // Hardcoded JWT_SECRET
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// POST - User Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ error: 'Please add all fields' });
  }

  // Find user by username
  User.findOne({ username })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: 'Invalid username or password' });
      }

      // Compare the password
      bcrypt.compare(password, savedUser.password)
        .then((match) => {
          if (match) {
            // Create JWT token
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            res.json({ token });
          } else {
            return res.status(422).json({ error: 'Invalid username or password' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: 'Server error during password comparison' });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    });
});

module.exports = router;


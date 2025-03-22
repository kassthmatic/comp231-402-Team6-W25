const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT Secret
const JWT_SECRET = 'supersecret_dont_share';

// POST - User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body; // Expecting 'username' and 'password' from the request body
  
    if (!username || !password) {
      return res.status(422).json({ error: 'Please add all fields' });
    }
  
    // Find user by username
    User.findOne({ username: username })
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
              res.json({ token: token });
            } else {
              return res.status(422).json({ error: 'Invalid username or password' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      });
  });
  
  module.exports = router;

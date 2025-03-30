const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret (you can store this in .env)
const JWT_SECRET = 'supersecret_dont_share';  // You should change this to your actual secret key

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You must log in' });
  }

  const token = authorization.replace('Bearer ', ''); // Remove "Bearer " from the token

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must log in' });
    }

    const { _id } = payload; // The user ID stored in the token payload

    // Find the user by ID and attach user data to request
    User.findById(_id)
      .then((userdata) => {
        req.user = userdata;
        next(); 
      })
      .catch((err) => {
        res.status(500).json({ error: 'User not found' });
      });

      //console.log('Authorization header:', req.headers.authorization);
  });
};

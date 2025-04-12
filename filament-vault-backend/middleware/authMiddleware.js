const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret (you can store this in .env)
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log('Authorization header:', authorization); // <--- Add this

  if (!authorization) {
    return res.status(401).json({ error: 'You must log in' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.log('JWT verify error:', err); // Optional: log error
      return res.status(401).json({ error: 'You must log in' });
    }

    console.log('Decoded payload:', payload); // <--- Add this

    const { _id } = payload;

    User.findById(_id)
    .then((userdata) => {
    if (!userdata) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = userdata;
    next();
    })
    .catch((err) => {
    console.error('User fetch error:', err);
    res.status(500).json({ error: 'User not found' });
    });
  });
};
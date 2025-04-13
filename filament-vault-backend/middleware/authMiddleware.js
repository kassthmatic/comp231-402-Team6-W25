/**
 * Middleware to verify JWT tokens and attach user to the request object.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log('Authorization header:', authorization); 

  if (!authorization) {
    return res.status(401).json({ error: 'You must log in' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.log('JWT verify error:', err); 
      return res.status(401).json({ error: 'You must log in' });
    }

    console.log('Decoded payload:', payload); 

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
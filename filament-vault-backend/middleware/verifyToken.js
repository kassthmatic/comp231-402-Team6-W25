const jwt = require('jsonwebtoken');

// Hardcoded JWT Secret
const JWT_SECRET = 'supersecret_dont_share';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Please login or register to leave a review.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Access denied. Please login or register to leave a review.' });
  }
};

module.exports = verifyToken;

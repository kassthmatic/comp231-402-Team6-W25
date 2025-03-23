const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Protected route
router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authorized!',
    user: req.user // The authenticated user data attached by the middleware
  });
});

module.exports = router;

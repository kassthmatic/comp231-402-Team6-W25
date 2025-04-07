const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const authenticateUser = require('../middleware/auth'); // adjust path if needed
require('dotenv').config(); // Load .env variables

// POST /api/feedback
router.post('/', authenticateUser, async (req, res) => {
  const { feedback } = req.body;
  const userEmail = req.user.email; // assuming email is in token payload

  if (!feedback) {
    return res.status(400).json({ error: 'Feedback is required.' });
  }

  try {
    // Email setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // sending to the same inbox (or change if needed)
      subject: 'New Site Feedback',
      text: `From: ${userEmail}\n\n${feedback}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (err) {
    console.error('Email sending failed:', err);
    res.status(500).json({ error: 'Failed to send feedback' });
  }
});

module.exports = router;
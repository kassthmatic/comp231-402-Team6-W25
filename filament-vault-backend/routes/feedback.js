// Routes for handling feedback form submissions
// Sends feedback via email to the site admin using nodemailer
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Feedback = require('../models/Feedback'); // ⬅️ New import
require('dotenv').config();

// POST /api/feedback
router.post('/', async (req, res) => {
  const { feedback, issue, email } = req.body;

  if (!feedback && !issue) {
    return res.status(400).json({ error: 'Feedback is required.' });
  }

  // Create a transporter and send feedback as an email
  try {
    // Check for recent feedback from same email in last 24h
    if (email) {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentFeedback = await Feedback.findOne({
        email,
        createdAt: { $gte: oneDayAgo }
      });

      if (recentFeedback) {
        return res.status(429).json({ error: 'You can only submit feedback once per day.' });
      }
    }

    // Save feedback in DB
    const newFeedback = new Feedback({ email, feedback, issue });
    await newFeedback.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: email || 'anonymous@filamentvault.com',
      to: 'kassandrafurtado@gmail.com',
      subject: 'Site Feedback',
      text: `Email: ${email || 'Anonymous'}\nIssue: ${issue || 'N/A'}\n\n${feedback}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (err) {
    console.error('Email sending failed:', err.response || err);
    res.status(500).json({ error: 'Failed to send feedback' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load .env variables

// POST /api/feedback
router.post('/', async (req, res) => {
    const { feedback, issue, email } = req.body;
  
    if (!feedback && !issue) {
      return res.status(400).json({ error: 'Feedback is required.' });
    }
  
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });
  
      const mailOptions = {
        from: email || 'kassandrafurtado@gmail.com',
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
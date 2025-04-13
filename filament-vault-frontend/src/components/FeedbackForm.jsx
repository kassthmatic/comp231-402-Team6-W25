/**
 * Form component for submitting feedback via email.
 * Sends feedback using axios to the backend’s /api/feedback endpoint.
 */

import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  // Tracks user's optional email input
  const [email, setEmail] = useState('');
  // Tracks issue title (if applicable)
  const [issue, setIssue] = useState('');
  // Tracks detailed feedback message
  const [message, setMessage] = useState('');
  // Displays status message after submission
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');

  // Handles feedback form submission and sends data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issue.trim() && !message.trim()) return;

    try {
    await axios.post('http://localhost:5000/api/feedback', {
        feedback: `EMAIL: ${email || 'N/A'}\nISSUE: ${issue}\nFEEDBACK: ${message}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStatus('Feedback submitted successfully!');
      setEmail('');
      setIssue('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('Failed to submit feedback.');
    }
  };

  // Feedback form UI - collects user feedback and issue description
  return (
    <div className="feedback-form">
      <h2>Help/Site Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Email (optional):</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Issue Description:</label>
        <input
          type="text"
          placeholder="Describe the issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <label>Feedback Message:</label>
        <textarea
          placeholder="Let us know how we can help or improve..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
        />

        <button type="submit">Submit</button>
      </form>

      {status && <p className="feedback-status">{status}</p>}

      
    </div>
  );
};

export default FeedbackForm;
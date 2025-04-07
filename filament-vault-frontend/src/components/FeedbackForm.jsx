import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');

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
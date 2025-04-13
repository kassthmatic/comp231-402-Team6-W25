/**
 * Help page component that renders the feedback form.
 * Users can report issues or ask questions about the platform.
 */

import FeedbackForm from '../components/FeedbackForm';
import React from 'react';

const Help = () => {
  return (
    <div className="help-page">
      <h2>Need Help? Leave Feedback Below 👇</h2>
      <FeedbackForm />
    </div>
  );
};

export default Help;
/**
 * Mongoose schema for user feedback.
 * Tracks who submitted feedback and when.
 */

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String },
  issue: { type: String },
  feedback: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
/**
 * Mongoose schema for user accounts.
 * Handles user authentication and saved filament references.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// Defines the schema for User documents in MongoDB
// Includes username, email, password, role, and savedFilaments (favorites)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  savedFilaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Filament' }] 
});

// Automatically hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
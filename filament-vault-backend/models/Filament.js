const mongoose = require("mongoose");

const FilamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Filament", FilamentSchema);
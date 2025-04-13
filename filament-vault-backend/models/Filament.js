/**
 * Mongoose schema definition for Filament documents.
 */

const mongoose = require("mongoose");

const FilamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    material: { type: String, required: true },
    brand: { type: String },
    available_colours: { type: Array },
    printing_temperature: { type: String },
    enclosure_required: { type: String },
    purchase_from: { type: String },
    // Embedded reviews array, includes user reference and rating
    reviews: [
      {
        review: { type: String, required: true },
        rating: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    created_at: { type: Date, default: Date.now },
  },
  { collection: "Filament Info" }
);

module.exports = mongoose.model("Filament", FilamentSchema, "Filament Info");

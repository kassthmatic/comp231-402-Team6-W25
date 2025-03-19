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
    created_at: { type: Date, default: Date.now },
  },
  { collection: "Filament Info" } 
);

module.exports = mongoose.model("Filament", FilamentSchema, "Filament Info");
// models/coffee.js

const mongoose = require('mongoose');

// Define the Coffee schema
const coffeeSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    brewingMethod: { type: String, enum: ['filter', 'pods', 'espresso', 'moka', 'batch brew', 'french press', 'cascara/tea'], required: true },
    roastLevel: { type: String, enum: ['light', 'medium', 'dark'], required: true },
    flavorProfile: [{ type: String, enum: ['regular/classic', 'fruity', 'chocolate/sweat', 'floral', 'acid', 'nutty'] }],
    origin: { type: String, enum: ['africa', 'south america', 'asia', 'central america'] },
    coffeeType: { type: String, enum: ['regular', 'decaf'], required: true },
    profileDetail: { type: String },
    variety: { type: String, enum: ['arabica', 'robust'] },
    size: { type: Number, required: true },
    process: { type: String },
    intensity: { type: String, enum: ['mild', 'balanced', 'intense/bold'], required: true },
    price: { type: Number, required: true }
});

// Create Coffee model
const Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;

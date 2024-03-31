// models/preferences.js

const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Define the Preferences schema
const preferencesSchema = new mongoose.Schema({
    brewingMethod: { type: String, required: true },
    coffeeExperienceLevel: { type: String, required: true },
    roastLevel: { type: String, required: true },
    flavorProfile: { type: String, required: true },
    origin: { type: String, required: true },
    coffeeType: { type: String, required: true },
    intensity: { type: String, required: true },
    coffeePerDay: { type: String, required: true },
    bonus: { type: String, required: true },
    createdAt: { type: Date, default:Date.now } 
});

// Create Preferences model
const Preferences = mongoose.model('Preferences', preferencesSchema);

module.exports = Preferences;

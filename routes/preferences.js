// routes/preferences.js

const express = require('express');
const router = express.Router();
const Preferences = require('../models/preferences');

// GET route to render the preferences form page
router.get('/', (req, res) => {
    res.render('preferences'); // Assuming 'preferences' is your preferences form page
});

// Preferences form submission route
router.post('/', async (req, res) => {
    try {
        // Create a new preferences document using the Preferences model
        const preferencesData = req.body;
        const preferences = new Preferences(preferencesData);
        
        // Save preferences to the database
        await preferences.save();

        // Redirect to success page
        res.render('result', { message: 'Preferences saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

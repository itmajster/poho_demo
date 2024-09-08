const express = require('express');
const router = express.Router();
const Preferences = require('../models/preferences');
const Coffee = require('../models/coffees.js');
const flavorProfiles = require('../models/flavorProfiles.js');

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

        const { brewingMethod, roastLevel, flavorProfile, origin, coffeeType, intensity } = req.body;

        // Construct query based on user preferences
        let query = { brewingMethod, roastLevel, origin, coffeeType, intensity };

        // Query MongoDB to find matching coffees
        const matchingCoffees = await Coffee.find(query);

        // Redirect to success page
        res.render('result', { matchingCoffees });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

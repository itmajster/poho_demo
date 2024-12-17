const express = require('express');
const router = express.Router();
const Preferences = require('../models/preferences');
const Coffee = require('../models/coffees.js');
const flavorProfiles = require('../models/flavorProfiles.js');
const stringSimilarity = require('string-similarity');

// GET route to render the preferences form page
router.get('/', (req, res) => {
    res.render('preferences'); // Assuming 'preferences' is your preferences form page
});

// Function to calculate the match score
function scoreCoffee(preferences, coffee) {
    let score = 0;

    // Exact match for mandatory fields
    if (preferences.brewingMethod === coffee.brewingMethod)  score += 0;
    //if (preferences.experienceLevel === coffee.experienceLevel) score += 40;
    if (preferences.caffeine === coffee.coffeeType) score += 0;

    // Partial matches for optional fields
    if (preferences.roastLevel || preferences.roastLevel == "random") {
        const roastMatch = stringSimilarity.compareTwoStrings(String(preferences.roastLevel), String(coffee.roastLevel));
        //score += roastMatch * 0; // Adjust weight as needed
    }

    if (preferences.flavorProfile || preferences.flavorProfile == "random") {
        const flavorMatch = stringSimilarity.compareTwoStrings(String(preferences.flavorProfile), String(coffee.flavorProfile));
        score += flavorMatch * 1; // Adjust weight as needed
    }

    if (preferences.origin || preferences.origin == "random")  {
        const originMatch = stringSimilarity.compareTwoStrings(String(preferences.origin), String(coffee.origin));
        //score += originMatch * 0; // Adjust weight as needed
    }

    return score;
}

// Find the best matches
function findBestMatches(preferences, coffeeProfiles) {
    const scoredCoffees = coffeeProfiles.map(coffee => ({
        ...coffee.toObject(), // Include all coffee parameters
        score: scoreCoffee(preferences, coffee)
    }));
    

    // Sort by score in descending order and return the top 3 matches
    const topMatches = scoredCoffees.sort((a, b) => b.score - a.score).slice(0, 3);

    console.log("scoredCoffees:")
    console.log(scoredCoffees)
    console.log("topMatches:")
    console.log(topMatches)

    return topMatches;
}

// Preferences form submission route
router.post('/', async (req, res) => {
    try {
        const preferencesData = req.body;
        const preferences = new Preferences(preferencesData);
        const coffees = await Coffee.find();
        
        // Save preferences to the database
        await preferences.save();

        // Find and display the best matches
        const matches = findBestMatches(preferences, coffees);
        console.log("Top Matches:");
        console.log(matches);

        // Redirect to the result page with the matching coffees
        res.render('result', { matches });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;

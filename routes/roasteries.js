// routes/roasteries.js

const express = require('express');
const router = express.Router();
const Coffee = require('../models/coffee');

// Route to list all roasteries
router.get('/', async (req, res) => {
    try {
        // Fetch unique roasteries from the database
        const roasteries = await Coffee.distinct('brand');
        res.render('roasteries', { roasteries }); // Render the roasteries view with the fetched data
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

// routes/index.js

const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('home'); // Render the home.ejs template
});

module.exports = router;

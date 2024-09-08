// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
require('./config/db');

// Import route handlers
const indexRoutes = require('./routes/index');
const preferencesRoutes = require('./routes/preferences');
const roasteriesRoutes = require('./routes/roasteries');

// Use route handlers
app.use('/', indexRoutes);
app.use('/preferences', preferencesRoutes);
app.use('/roasteries', roasteriesRoutes);

// Define port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log('Connected to Mongo DB Successfully!!');
})
.catch((error) => console.error('Error connecting to MongoDB:', error));
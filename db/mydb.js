const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_URI } = process.env;

// Create the connection function

const connectDB = () => {
    mongoose.connect(MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: false 
    })
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error(err.message);

        process.exit(1);
    });
}

module.exports = connectDB;


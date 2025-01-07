const mongoose = require('mongoose');
require('dotenv').config();  // <-- This loads variables from your .env file

const connectDB = async () => {
  try {
    // Use process.env.MONGO_URI loaded from .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

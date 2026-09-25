const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rockstar_shop';
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`[MongoDB Error] Failed to connect to MongoDB at ${mongoUri}`);
    console.error(`Reason: ${err.message}`);
    console.warn(`[MongoDB Warning] Please ensure MongoDB is running or specify a valid MONGODB_URI in server/.env.`);
    // Return null so server can still start or retry without crashing unhandled
    return null;
  }
};

module.exports = connectDB;

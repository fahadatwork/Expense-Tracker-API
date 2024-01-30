const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.DATABASE_URL;

async function initialize() {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  connectionWithAtlas: initialize,
};    

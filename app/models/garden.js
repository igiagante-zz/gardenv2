"use strict";

// Load required packages
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our garden schema
let gardenSchema = new mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  name: String,
  startDate: {type: Date, default: new Date()},
  endDate: {type: Date},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Garden', gardenSchema);
"use strict";

// Load required packages
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define the irrigation schema
let irrigationSchema = new mongoose.Schema({
  irrigationDate: {type: Date, default: new Date()},
  quantity: Number,
  gardenId: Schema.Types.ObjectId,
  doseId: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Irrigation', irrigationSchema);
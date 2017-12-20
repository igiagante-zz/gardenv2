/**
 * Created by igiagante on 29/9/15.
 */

"use strict";

// Load required packages
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define measure sensor schema
let measureSchema = new mongoose.Schema({
    measureDate: {type: Date, default: new Date()},
    measure: Number,
    unit: String,
    sensor: {
        name: { type: String, required: true }
    },
    gardenId: { type: Schema.Types.ObjectId, required: true },
    plantId: { type: Schema.Types.ObjectId },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Measure', measureSchema);

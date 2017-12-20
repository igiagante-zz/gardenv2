/**
 * @author Ignacio Giagante, on 3/6/16.
 */

"use strict";

// Load required packages
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the attribute schema
let attributeSchema = new mongoose.Schema({

    _id: Schema.Types.ObjectId,
    /*
     Type of attribute: Effect, Medicinal, Symptom
     */
    type: {type: String, required: true},
    name: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Attribute', attributeSchema);

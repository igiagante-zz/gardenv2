/**
 * @author Ignacio Giagante, on 6/4/16.
 */

"use strict";

// Load required packages
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the plague schema
let plagueSchema = new mongoose.Schema({

    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Plague', plagueSchema);

/**
 * @author Ignacio Giagante, on 1/4/16.
 */

"use strict";

// Load required packages
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the nutrient schema
let nutrientSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    name: String,
    ph: Number,
    npk: String,
    description: String,
    resourcesIds: [Schema.Types.ObjectId], // each id corresponds to each image id
    images: [
        {
            _id: Schema.Types.ObjectId,
            url: { type: String, required: true },
            thumbnailUrl: { type: String, required: true },
            name: { type: String, required: true },
            type: { type: String, required: true },
            size: Number,
            main: { type: Boolean, default: 0 }
        }
    ],
    nutrientDoseIds: [Schema.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Nutrient', nutrientSchema);

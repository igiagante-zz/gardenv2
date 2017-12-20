"use strict";

// Load required packages
let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define the dose schema
let doseSchema = new mongoose.Schema({
	water: Number,
	phDose: Number,
	ph: Number,
	ec: Number,
	nutrients: [
		{
            _id: Schema.Types.ObjectId,
			name: String,
			ph: Number,
            npk: String,
            description: String,
            quantityUsed: Number
		}
	],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Dose', doseSchema);
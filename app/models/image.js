let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Images = new Schema({
	url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    deleteUrl: { type: String, required: true },
    deleteType: { type: String, default: "DELETE" },
    name: { type: String, required: true },
    type: { type: String, required: true},
    size: Number,
    main: { type: Boolean, default: false},
    plantId: { type: Schema.Types.ObjectId, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Images', Images);
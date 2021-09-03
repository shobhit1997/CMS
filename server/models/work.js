const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["construction", "painting", "wiring", "plumbing", "flooring", "ceiling"],
        default: "construction"
    },
    startData: { type: Date, default: Date.now },
    endDate: { type: Date }
});



module.exports = mongoose.model('Work', WorkSchema);
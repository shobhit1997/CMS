const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['labour350', 'labour400', 'mistri', 'junior_mistri'],
        default: 'default'
    },
    dailyWage: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Worker', WorkerSchema);
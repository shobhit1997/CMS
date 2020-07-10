const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    worker: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Worker'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    amountPayed: {
        type: Number,
        required: true,
        default: 0
    },
    present: {
        type: Boolean,
        required: false
    },
    remarks: {
        type: String
    }
});



module.exports = mongoose.model('Attendance', AttendanceSchema);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    billAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    billDate: { type: Date, default: Date.now },
    billCopy: { type: String }
});



module.exports = mongoose.model('Bill', BillSchema);
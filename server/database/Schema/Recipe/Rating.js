const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    sum: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    }
})

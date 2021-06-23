const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    author: {
        type: mongoose.ObjectId,
        required: true
    }
})

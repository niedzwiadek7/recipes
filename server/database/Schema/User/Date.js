const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    day: {
        type: Number,
        default: new Date().getDate(),
        min: 1,
        max: 31
    },
    month: {
        type: Number,
        default: new Date().getMonth(),
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
    recipes: {
        type: [ mongoose.ObjectId ],
        required: true,
        default: []
    }
})

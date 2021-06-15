const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        minLength: [1, "Please type your comment"],
        required: true
    },
    updated: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.ObjectId,
        required: true
    }
}, {
    timestamps: true,
})

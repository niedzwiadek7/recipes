const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: [3, "Minimum ingredient length is 3 characters"]
    },
    quantity: {
        type: Number,
        required: [true, "Type quantity to this ingredient"],
        min: 1,
    },
    unit: {
        type: String,
        required: [true, "Type unit of measure to this ingredient"],
        enum: {
            values: ["teaspoons", "gram", "quantity", "packet"],
            message: "Select one of the options"
        }
    }
})

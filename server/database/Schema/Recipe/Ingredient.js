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
        min: 0.1,
    },
    unit: {
        type: String,
        required: [true, "Type unit of measure to this ingredient"],
        enum: {
            values: ["teaspoon", "gram", "quantity", "packet", "glass", "kg", "spoon", "liter", "milliliter", "slice of",
            "leaves"],
            message: "Select one of the options"
        }
    }
})

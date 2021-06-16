const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name ingredient is required'],
        lowercase: true,
        trim: true,
        minlength: [3, "This ingredient have to minimum 3 chars"],
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    accepting: {
        type: Boolean,
        default: false
    },
    photo: {
        data: Buffer,
        type: String,
        default: ''
    },
})

const ingredient = mongoose.model('ingredient', ingredientSchema)

module.exports = ingredient

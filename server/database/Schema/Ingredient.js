const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 3,
        unique: true
    },
    description: {
        type: String,
        default: ''
    }
})

const ingredient = mongoose.model('ingredient', ingredientSchema)

module.exports = ingredient

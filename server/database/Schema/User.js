require('../mongodb')
const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const Date = require('./User/Date')
const ingredientSchema = require('./Recipe/Ingredient')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname field is required"],
        minLength: [ 3, "Minimum firstname length is 3 characters" ],
        maxlength: [ 20, "Your recipe name is too long "],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Lastname field is required"],
        minLength: [ 3, "Minimum lastname length is 3 characters" ],
        maxlength: [ 20, "Your recipe name is too long "],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        validate: [email => emailValidator.validate(email), 'Type correct email']
    },
    photo: {
        data: Buffer,
        type: String
    },
    updated: {
        type: Boolean,
        default: false
    },
    recipes: {
        type: [ mongoose.ObjectId ],
        required: true,
        default: [],
    },
    menu: {
        type: [ Date ],
        required: true,
        default: [],
    },
    description: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please, type password"],
    },
    watched: {
        type: [ mongoose.ObjectId ],
        default: []
    },
    shoppingList: {
        type: [ingredientSchema],
        default: []
    },
    subscription: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
})

userSchema.pre('save', function(next){
    next()
})

const user = mongoose.model('user', userSchema)

module.exports = user

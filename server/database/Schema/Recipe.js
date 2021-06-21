require('../mongodb')
const mongoose = require('mongoose')
const ingredientSchema = require('./Recipe/Ingredient')
const commentSchema = require('./Recipe/Comment')
const ratingSchema = require('./Recipe/Rating')
const validators = require('./Validators/RecipeValidators')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        unique: true,
        uppercase: true,
        minLength: [ 3, "Minimum recipe length is 3 characters" ],
        maxlength: [ 100, "Your recipe name is too long "],
        trim: true,
        validate: validators.RegexValidator('recipe')
    },
    ingredients: {
        type: [ingredientSchema],
        required: true,
        validate: [validators.ArrayValidator(`ingredients`), validators.ArrayUniqueValidator('ingredients')]
    },
    photo: {
        data: Buffer,
        type: [String]
    },
    procedure: {
        type: [
            {
                type: String,
                trim: true,
                minLength: [5, 'Please, describe this step in more detail'],
            }
        ],
        required: true,
        validate: validators.ArrayValidator(`procedure`)
    },
    author: {
        type: mongoose.ObjectId,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        required: true,
        enum: {
            values: ['breakfast', 'lunch', 'dinner', 'tea'],
            message: 'Please, choose one of the options'
        }
    },
    comments: {
        type: [
            {
                type: commentSchema,
                trim: true
            }
        ],
        default: []
    },
    tags: {
        type: [
            {
                type: String,
                lowercase: true,
                trim: true,
                minLength: [3, 'Minimum tag length is 3 characters'],
                maxLength: [30, 'Your tag is too long'],
                validate: validators.RegexValidator('tag')
            }
        ]
    },
    rating: {
        type: [
            {
                type: ratingSchema,
            }
        ],
        default: []
    },
    updated: {
        type: Boolean,
        default: false
    },
    kcal: {
        type: Number,
        required: [true, "Please, type kcal value to your recipe"]
    },
    difficulty: {
        type: String,
        lowercase: true,
        enum: {
            values: ['easy', 'medium', 'hard'],
            message: 'Please, choose one of the options'
        },
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: [true, "Please, write time your recipe"]
    },
    views: {
        type: Number,
        default: 0
    },
    serving: {
        type: Number,
        required: [true, "Please write quantity of servings to your recipe"]
    }
}, {
    timestamps: true,
})

recipeSchema.pre('save', function(next){
    next()
})

const Recipe = mongoose.model('Recipe', recipeSchema)

Recipe.schema.path('ingredients').validate(function (value) {
    return value.every(el => validators.RegexValidator('ingredient').validator(el.name))
}, validators.RegexValidator('ingredient').message)

module.exports = Recipe

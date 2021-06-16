require('../../database/mongodb')
const mongoose = require('mongoose')
const Ingredient = require('../../database/Schema/Ingredient')

exports.find = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({
            name: {
                "$regex": req.body.word,
                "$options": "i"
            },
            accepting: true
        }).limit(5)

        res.status(200).send(ingredients)
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

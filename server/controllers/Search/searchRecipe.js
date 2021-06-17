const mongoose = require('mongoose')
const Recipe = require('../../database/Schema/Recipe')

exports.find = async (req, res) => {
    try {
        const recipe = await Recipe.find({
            name: {
                "$regex": req.body.word,
                "$options": "i"
            }
        }).limit(req.body.limit)

        res.status(200).send(recipe)
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

require('../../database/mongodb')
const mongoose = require('mongoose')
const Recipe = require('../../database/Schema/Recipe')

exports.update = async (recipe, req, res, next) => {
    // to refactor (i want send only changes values)
    try {
        await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $set: {
                name: recipe.name,
                ingredients: recipe.ingredients,
                procedure: recipe.procedure,
                category: recipe.category,
                tags: recipe.tags,
                updated: true,
                kcal: req.body.kcal,
                description: req.body.description,
                difficulty: req.body.difficulty,
                time: req.body.time,
            }
        })
        res.status(201).json({ ...recipe, _id: req.params.id}._doc)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({name: 'this recipe is already exist'})
        }   else console.log('Unhandled exception')
    }
}

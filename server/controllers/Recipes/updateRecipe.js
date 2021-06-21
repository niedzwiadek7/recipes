const mongoose = require('mongoose')
const Recipe = require('../../database/Schema/Recipe')
const Ingredient = require('../../database/Schema/Ingredient')

exports.update = async (req, res) => {
    // to refactor (i want send only changes values)
    try {
        await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $set: {
                name: req.body.recipe.name,
                ingredients: req.body.recipe.ingredients,
                procedure: req.body.recipe.procedure,
                category: req.body.recipe.category,
                tags: req.body.recipe.tags,
                updated: true,
                kcal: req.body.recipe.kcal,
                description: req.body.recipe.description,
                difficulty: req.body.recipe.difficulty,
                time: req.body.recipe.time,
                serving: req.body.recipe.serving
            }
        })

        for (const ingredient in req.body.recipe.ingredients) {
            try {
                const ingredientSchema = new Ingredient({
                    name: req.body.recipe.ingredients[ingredient].name
                })
                await ingredientSchema.save()
            } catch (err) {
                if (process.env.NODE_ENV === 'development') console.log(err)
            }
        }
        req.body.recipe._id = req.params.id
        req.body.recipe.updated = true
        res.status(201).json(req.body.recipe)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({name: 'this recipe is already exist'})
        }   else if(process.env.NODE_ENV === 'development') console.log(err)
    }
}

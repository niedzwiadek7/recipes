const mongoose = require('mongoose')
const User = require('../../database/Schema/User')
const Ingredient = require('../../database/Schema/Ingredient')

exports.add = async (req, res) => {
    try {
        await req.body.recipe.save()

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

        await User.updateOne({_id: new mongoose.Types.ObjectId(req.body.recipe.author)}, {
            $push: {
                recipes: req.body.recipe._id,
            }
        })
        res.status(201).json(req.body.recipe)
    }   catch (err) {
        // recipe.photo.forEach(value => controlPublicFolder.deleteFile(`./../public/uploads/image/recipes/${value}`))
        if (err.code === 11000) {
            res.status(400).json({name: 'this recipe is already exist'})
        }   else if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

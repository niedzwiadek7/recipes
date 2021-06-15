require('../../database/mongodb')
const User = require('../../database/Schema/User')
const Ingredient = require('../../database/Schema/Ingredient')

exports.add = async (recipe, req, res, next) => {
    try {
        await recipe.save()

        for (const ingredient in recipe.ingredients) {
            try {
                const ingredientSchema = new Ingredient({
                    name: recipe.ingredients[ingredient].name
                })
                await ingredientSchema.save()
            } catch (err) {
                if (process.env.NODE_ENV === 'development') console.log(err)
            }
        }

        await User.updateOne({_id: recipe.author}, {
            $push: {
                recipes: recipe._id,
            }
        })
        res.status(201).json(recipe)
    }   catch (err) {
        // recipe.photo.forEach(value => controlPublicFolder.deleteFile(`./../public/uploads/image/recipes/${value}`))
        if (err.code === 11000) {
            res.status(400).json({name: 'this recipe is already exist'})
        }   else console.log(err)
    }
}

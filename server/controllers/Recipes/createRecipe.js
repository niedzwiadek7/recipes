require('../../database/mongodb')
const User = require('../../database/Schema/User')

exports.add = async (recipe, req, res, next) => {
    try {
        await recipe.save()
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

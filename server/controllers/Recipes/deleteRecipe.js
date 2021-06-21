const mongoose = require('mongoose')
const User = require('../../database/Schema/User')
const Recipe = require('../../database/Schema/Recipe')

exports.delete = async(req, res) => {
    try {
        const info = await Recipe.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)})
        if (info.deletedCount === 0) throw new Error()

        await User.updateOne({_id: new mongoose.Types.ObjectId(req.body.recipe.author)}, {
            $pull: {
                recipes: req.body.recipe._id,
            }
        })
        res.status(200).json({info: "Deleting is successful"})
    }
    catch(err) {
        res.status(400).json({error: "You can't delete this Recipe, because this is now not existing!"})
    }
}

// return status 200 if delete object doesn't exist

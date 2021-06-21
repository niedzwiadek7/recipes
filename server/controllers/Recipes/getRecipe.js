require('../../database/mongodb')
const mongoose = require('mongoose')
const Recipe = require('../../database/Schema/Recipe')

exports.find = async (req, res) => {
    const RecipePage = (await Recipe.find({_id: new mongoose.Types.ObjectId(req.params.id)}))[0]

    if (RecipePage===undefined) res.status(404).json({error: `This page isn't available now`})
    else {
        await Recipe.updateOne({ _id: new mongoose.Types.ObjectId(req.params.id)}, {
            $inc: {
                views: 1
            }
        })
        res.send(RecipePage)
    }
}

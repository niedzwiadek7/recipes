require('../../database/mongodb')
const mongoose = require('mongoose')
const User = require('../../database/Schema/User')
const Recipe = require('../../database/Schema/Recipe')

exports.delete = async(req, res) => {
    try {
        const user = await User.findOne({_id: new mongoose.Types.ObjectId(req.params.id)})
        await user.recipes.forEach(async recipe => {
            await Recipe.deleteOne({_id: recipe})
        })
        const info = await User.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)})
        if (info.deletedCount===0) throw new Error()
        res.status(200).json({info: "Deleting is successful"})
    }
    catch(err) {
        res.status(400).json({error: "You can't delete your account, because this is now not existing!"})
    }
}

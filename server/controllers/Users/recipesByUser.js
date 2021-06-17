const mongoose = require('mongoose')
const User = require('../../database/Schema/User')
const Recipe = require('../../database/Schema/Recipe')

exports.find = async (req, res) => {
    console.log('im here')
    const error = {}
    try {
        const user = (await User.find({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }))[0]

        if (user === undefined) {
            error.notExist = `This user doesn't exist`
            throw new Error()
        }

        const list = []
        let updated = false

        for(const position in user.recipes) {
            const recipe = user.recipes[position]
            const result = (await Recipe.find({
                _id: new mongoose.Types.ObjectId(recipe)
            }))[0]
            if (result === undefined) {
                user.recipes.splice(position, 1)
                updated = true
            }   else list.push(result)
        }

        if (updated) {
            await User.updateOne({
                _id: new mongoose.Types.ObjectId(req.params.id)
            }, {
                $set: {
                    recipes: user.recipes
                }
            })
        }

        res.status(200).json(list)
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(400).json(error)
    }
}

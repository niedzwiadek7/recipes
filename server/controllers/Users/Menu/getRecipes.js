const mongoose = require('mongoose')
const User = require('../../../database/Schema/User')
const Recipe = require('../../../database/Schema/Recipe')

exports.get = async(req, res) => {
    if (req.body.position === -1) {
        res.status(200).json([])
    }

    let updated = false
    const list = []

    for (let recipe=0; recipe<req.body.menu[req.body.position].recipes.length; recipe++) {
        const id_recipe = req.body.menu[req.body.position].recipes[recipe]
        const response = (await Recipe.find({
            _id: new mongoose.Types.ObjectId(id_recipe)
        }))[0]
        if (response === undefined) {
            req.body.menu[req.body.position].recipes.splice(recipe, 1)
            recipe--
            updated = true
        } else {
            list.push(response)
        }
    }

    if (updated) {
        await User.updateOne({
            _id: new mongoose.Types.ObjectId(req.user._id)
        }, {
            $set: {
                menu: req.body.menu
            }
        })
    }

    res.status(200).json(list)
}

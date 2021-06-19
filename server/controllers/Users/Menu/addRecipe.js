const mongoose = require('mongoose')
const Recipe = require('../../../database/Schema/Recipe')

exports.add = async (req, res, next) => {
    const errors = {}
    try {
        const recipe = (await Recipe.find({
            _id: new mongoose.Types.ObjectId(req.body.id_recipe)
        }))[0]

        if (recipe === undefined) {
            errors.recipe = 'Incorrect recipe'
            throw new Error()
        }

        if (req.body.position === -1) {
            req.body.menu.push({
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
                recipes: []
            })
            req.body.position = req.body.menu.length - 1
        }

        req.body.menu[req.body.position].recipes.push(req.body.id_recipe)
        next()
    }   catch (err) {
        res.status(400).json(errors)
    }
}

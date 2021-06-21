const Ingredient = require('../../database/Schema/Ingredient')

exports.find = async (req, res) => {
    const ingredient = (await Ingredient.find({ name: req.body.name }))[0]

    if (ingredient === undefined) {
        res.sendStatus(400)
    }

    else res.status(200).json(ingredient)
}

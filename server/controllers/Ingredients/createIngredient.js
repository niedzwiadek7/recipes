require('../../database/mongodb')
const Ingredient = require('../../database/Schema/Ingredient')

exports.add = async (req, res) => {
    try {
        const ingredient = new Ingredient({
            name: req.body.name,
            description: req.body.description
        })
        await ingredient.save()
        res.status(201).json(ingredient)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({name: 'this ingredient is already exist'})
        }   else if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

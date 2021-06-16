const Ingredient = require('../database/Schema/Ingredient')
const bcrypt = require('bcrypt')

exports.handle = async (req, res, next) => {
    // const body = JSON.parse(req.body.body)
    const body = req.body
    const errors = {}

    const ingredient = new Ingredient({
        name: req.body.name,
        description: req.body.description,
        photo: req.files?.[0] ? (process.env.NODE_ENV === 'production' ?
            `https://recipe-server-2709.herokuapp.com/static/uploads/image/recipes/${req.files[0].filename}`
            : `http://localhost:5000/static/uploads/image/recipes/${req.files[0].filename}`) : null
    })

    const err = ingredient.validateSync()

    try {
        if (err !== undefined) {
            Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message
            })
            throw new Error()
        }
        req.body.ingredient = ingredient
        next()
    }   catch (err) {
        res.status(400).json(errors)
    }

}

const User = require('../database/Schema/User')
const bcrypt = require('bcrypt')

exports.handleUserErrors = async (req, res, next) => {
    // const body = JSON.parse(req.body.body)
    const body = req.body
    const errors = {}
    let correctData = true

    if (body.password.length < 8) {
        correctData = false
        errors.password = "Minimum password length is 8 characters"
    }   else if (body.password.length > 30) {
        correctData = false
        errors.password = "Your password is too long"
    }

    let hashPassword
    try {
        hashPassword = await bcrypt.hash(body.password, 10)
    } catch (err) {
        res.status(500).send(err)
    }

    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashPassword,
        email: body.email,
        photo: req.files?.[0] ? (process.env.NODE_ENV === 'production' ?
            `https://recipe-server-2709.herokuapp.com/static/uploads/image/recipes/${req.files[0].filename}`
            : `http://localhost:5000/static/uploads/image/recipes/${req.files[0].filename}`) : null,
        description: body.description
    })

    const err = user.validateSync()

    try {
        if (err !== undefined) {
            Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message
            })
            correctData = false
        }
        if (!correctData) throw new Error()
        next(user)

    }   catch (err) {
        res.status(400).json(errors)
    }

}

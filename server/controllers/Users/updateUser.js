require('../../database/mongodb')
const mongoose = require('mongoose')
const User = require('../../database/Schema/User')

exports.update = async (req, res) => {
    try {
        await User.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $set: {
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                password: req.body.user.password,
                date: req.body.user.date,
                updated: true,
                email: req.body.user.email,
                description: req.body.user.description
            }
        })
        req.body.user.updated = true
        req.body.user._id = req.params.id
        res.status(201).json(req.body.user)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({name: 'this recipe is already exist'})
        }   else console.log('Unhandled exception')
    }
}

require('../../database/mongodb')
const mongoose = require('mongoose')
const User = require('../../database/Schema/User')

exports.update = async (user, req, res, next) => {
    // to refactor (i want send only changes values)
    try {
        await User.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                date: user.date,
                updated: true,
                email: user.email
            }
        })
        res.status(201).json({ ...user, _id: req.params.id}._doc)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({name: 'this recipe is already exist'})
        }   else console.log('Unhandled exception')
    }
}

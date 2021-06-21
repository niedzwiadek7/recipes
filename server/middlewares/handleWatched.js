const mongoose = require('mongoose')
const User = require('../database/Schema/User')

exports.handle = async(req, res, next) => {
    const error = {}
    try {
        const user = (await User.find({
            _id: new mongoose.Types.ObjectId(req.user._id)
        }))[0]

        if (user === undefined) {
            error.user = 'We have problem with your account'
            throw new Error()
        }

        req.body.watched = user.watched

        req.body.position = req.body.watched.findIndex(user => {
            return user.toString() === req.body.toWatched.toString()
        })

        next()
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(400).json(error)
    }
}

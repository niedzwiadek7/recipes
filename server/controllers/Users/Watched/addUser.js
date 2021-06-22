const mongoose = require('mongoose')
const User = require('../../../database/Schema/User')

exports.add = async (req, res, next) => {
    const errors = {}
    try {
        if (req.body.position !== -1) {
            errors.isExist = 'You watch now this user'
            throw new Error()
        }

        const user_watched = (await User.find({
            _id: new mongoose.Types.ObjectId(req.body.toWatched)
        }))[0]

        if (user_watched === undefined || user_watched._id.toString() === req.user._id.toString()) {
            errors.watched = 'You cannot subscribe this user'
            throw new Error()
        }

        await User.updateOne({ _id: new mongoose.Types.ObjectId(req.body.toWatched) }, {
            $inc: {
                subscription: 1,
            }
        })

        req.body.watched.push(req.body.toWatched)
        next()
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(400).json(errors)
    }
}

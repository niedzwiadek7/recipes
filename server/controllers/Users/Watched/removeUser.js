const mongoose = require('mongoose')
const User = require('../../../database/Schema/User')

exports.remove = async (req, res, next) => {
    const errors = {}
    try {
        if (req.body.position === -1) {
            errors.isExist = `You don't watch now this user`
            throw new Error()
        }

        req.body.watched.splice(req.body.position, 1)

        await User.updateOne({ _id: new mongoose.Types.ObjectId(req.body.toWatched) }, {
            $inc: {
                subscription: -1,
            }
        })

        next()
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(400).json(errors)
    }
}

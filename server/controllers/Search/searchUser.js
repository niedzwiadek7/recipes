const mongoose = require('mongoose')
const User = require('../../database/Schema/User')

exports.find = async (req, res) => {
    try {
        const user = await User.find({
            $or: [
                {
                    firstName: {
                        "$regex": req.body.word,
                        "$options": "i"
                    }
                },
                {
                    lastName: {
                        "$regex": req.body.word,
                        "$options": "i"
                    }
                }
            ]
        }).limit(req.body.limit)

        res.status(200).send(user)
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

const mongoose = require('mongoose')
const User = require('../../../database/Schema/User')

exports.save = async (req, res) => {
    await User.updateOne({
        _id: new mongoose.Types.ObjectId(req.params.id)
    }, {
        $set: {
            watched: req.body.watched
        }
    })
    res.sendStatus(200)
}

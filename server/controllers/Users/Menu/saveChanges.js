const mongoose = require('mongoose')
const User = require('../../../database/Schema/User')

exports.save = async (req, res) => {
    await User.updateOne({
        _id: new mongoose.Types.ObjectId(req.user._id)
    }, {
        $set: {
            menu: req.body.menu
        }
    })
    res.sendStatus(200)
}

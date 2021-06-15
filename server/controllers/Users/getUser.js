require('../../database/mongodb')
const mongoose = require('mongoose')
const User = require('../../database/Schema/User')

exports.find = async (req, res) => {
    const UserPage = (await User.find({_id: new mongoose.Types.ObjectId(req.params.id)}))[0]

    if (UserPage===undefined) res.status(404).json({error: `This account isn't available now`})
    else res.send(UserPage)
}

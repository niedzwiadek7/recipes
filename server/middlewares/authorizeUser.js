require('../database/mongodb')
require('mongoose');
const User = require('../database/Schema/User')
const bcrypt = require('bcrypt')

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user === null) res.status(400).json({email: "This user is not exist"})
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.body._id = user._id;
            next()
        }   else {
            res.status(400).json({password: "This password isn't allowed"})
        }
    }   catch (err) {
        res.status(500).send(err)
    }
}

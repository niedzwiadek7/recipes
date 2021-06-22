const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const token = jwt.sign({ id: req.body._id }, process.env.JWT_TOKEN)
    const user = req.body._id
    res.send({ token, user })
}

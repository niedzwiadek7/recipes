const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const token = jwt.sign({ id: req.body._id }, process.env.JWT_TOKEN)
    res.send({ token })
}

exports.verify = (req, res, next) => {
    if (req.body._id.toString() === req.user._id.toString()) {
        next()
    }   else {
        res.status(401).send('Unauthorized')
    }
}

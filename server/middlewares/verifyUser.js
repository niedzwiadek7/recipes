exports.verify = (req, res, next) => {
    console.log(req.body._id)
    console.log(req.user._id)
    if (req.body._id.toString() === req.user._id.toString()) {
        next()
    }   else {
        res.status(401).send('Unauthorized')
    }
}

exports.notFound = (req, res, next) => {
    const err = new Error('404 page not found')
    err.status = 404
    next(err)
}

exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err))
    }
}

exports.catchError = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message)
}

const passport = require('passport')

exports.auth = (req, res, next) => {
    passport.authenticate('jwt', {session: false})(req, res, next)
}

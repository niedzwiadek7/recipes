const passport = require('passport')
const passport_jwt = require('passport-jwt')
const User = require('../database/Schema/User')

const JWTStrategy = passport_jwt.Strategy;
const ExtractJWT = passport_jwt.ExtractJwt;

function verifyCallback(payload, done) {
    return User.findOne({_id: payload.id}).
        then(user => {
            return done(null, user)
        }).catch(err => {
            return done(err)
        })
}

exports.auth = () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_TOKEN
    }
    passport.use(new JWTStrategy(config, verifyCallback))
}

const mongoose = require('mongoose')
const User = require('../database/Schema/User')

exports.find = async (req, res, next) => {
    const error = {}
    try {
        const user = (await User.find({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }))[0]

        if (user === undefined) {
            error.user = `Incorrect account`
            throw new Error()
        }

        const menu = user.menu

        const position = menu.findIndex(date => {
            return date.day === req.body.day && date.month === req.body.month && date.year === req.body.year;
        })

        if (position === -1) {
            if (req.body.day < 1) {
                error.date = 'Incorrect date'
                throw new Error()
            }
            switch (req.body.month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    if (req.body.day > 31) {
                        error.date = 'Incorrect date'
                        throw new Error()
                    }
                } break
                case 4:
                case 6:
                case 9:
                case 11: {
                    if (req.body.day > 30) {
                        error.date = 'Incorrect date'
                        throw new Error()
                    }
                } break
                case 2: {
                    if ((req.body.year%4 === 0 && req.body.year%100 !== 0) || req.body.year%400 === 0) {
                        if (req.body.day > 29) {
                            error.date = 'Incorrect date'
                            throw new Error()
                        }
                    }   else {
                        if (req.body.day > 28) {
                            error.date = 'Incorrect date'
                            throw new Error()
                        }
                    }
                } break
                default: {
                    error.date = 'Incorrect date'
                    throw new Error()
                }
            }
        }

        req.body.menu = menu
        req.body.position = position
        next()
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(400).json(error)
    }
}

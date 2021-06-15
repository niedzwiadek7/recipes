require('../../../database/mongodb')
const mongoose = require('mongoose')
const Recipe = require('../../../database/Schema/Recipe')

exports.add = async(req, res) => {
    try {
        await Recipe.updateOne({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }, {
            $inc: {
                "rating.sum": req.body.rating,
                "rating.quantity": 1
            }
        })
        res.redirect(`/api/posts/${req.params.id}`)
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.delete = async(req, res) => {
    try {
        await Recipe.updateOne({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }, {
            $inc: {
                "rating.sum": -req.body.rating,
                "rating.quantity": -1
            }
        })
        res.redirect(`/api/posts/${req.params.id}`)
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.update = async(req, res) => {
    try {
        await Recipe.updateOne({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }, {
            $inc: {
                "rating.sum": req.body.rating-req.body.old_rating
            }
        })
        res.redirect(`/api/posts/${req.params.id}`)
    }   catch (err) {
        res.sendStatus(400)
    }
}

const mongoose = require('mongoose')
const Recipe = require('../../../database/Schema/Recipe')

exports.add = async(req, res) => {
    try {
        if (req.body.position) {
            res.sendStatus(400)
        }   else {
            await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
                $push: {
                    rating: req.body.rate,
                }
            })
            res.status(200).json({info: "Adding is successful", rating: req.body.rate });
        }
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.delete = async(req, res) => {
    try {
        const deletingElement = await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $pull: {
                rating: { author: req.user._id }
            }
        })
        if (deletingElement.nModified === 0) throw new Error()
        res.status(200).json({info: "Delete is successful"})
    }
    catch(err) {
        res.sendStatus(400)
    }
}

exports.update = async(req, res) => {
    try {
        if (req.body.position) {
            await Recipe.updateOne ({
                _id: new mongoose.Types.ObjectId(req.params.id),
                rating: {
                    $elemMatch: {
                        author: req.user._id
                    }
                }
            }, {
                $set: {
                    "rating.$.value": req.body.rating,
                }
            })
            res.status(200).json({info: "Update is successful", rating: req.body.rating})
        }   else res.sendStatus(400)
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
}

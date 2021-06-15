require('../../../database/mongodb')
const mongoose = require('mongoose')
const Recipe = require('../../../database/Schema/Recipe')

exports.add = async(rating, req, res, next) => {
    try {
        await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $push: {
                rating
            }
        })
        res.status(200).json({info: "Adding is successful", rating });
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.delete = async(req, res) => {
    try {
        const deletingElement = await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $pull: {
                rating: { author: new mongoose.Types.ObjectId(req.body.author) }
            }
        })
        console.log(deletingElement)
        if (deletingElement.nModified === 0) throw new Error()
        res.status(200).json({info: "Delete is successful"});
    }
    catch(err) {
        res.sendStatus(400)
    }
}

exports.update = async(rating, req, res, next) => {
    try {
        await Recipe.updateOne ({
            _id: new mongoose.Types.ObjectId(req.params.id),
            rating: {
                $elemMatch: {
                    author: new mongoose.Types.ObjectId(req.body.author)
                }
            }
        }, {
            $set: {
                "rating.$.value": req.body.rating,
            }
        })
        res.status(200).json({info: "Update is successful", rating});
    } catch(err) {
        res.sendStatus(400)
    }
}

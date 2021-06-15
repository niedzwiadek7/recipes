require('../../../database/mongodb')
const mongoose = require('mongoose')
const Recipe = require('../../../database/Schema/Recipe')

exports.add = async (comment, req, res, next) => {
    try {
        await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $push: {
                comments: comment,
            }
        })
        res.status(200).json({info: "Adding is successful", comment: comment});
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.delete = async(req, res) => {
    try {
        const deletingElement = await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $pull: {
                comments: { _id: new mongoose.Types.ObjectId(req.params.id_comment) }
            }
        })
        if (deletingElement.nModified === 0) throw new Error()
        res.status(200).json({info: "Delete is successful"});
    }
    catch(err) {
        res.status(400).json({error: `This comment isn't available now`})
    }
}

exports.update = async(comment, req, res, next) => {
    try {
        await Recipe.updateOne ({
            _id: new mongoose.Types.ObjectId(req.params.id),
            comments: {
                $elemMatch: {
                    _id: new mongoose.Types.ObjectId(req.params.id_comment)
                }
            }
        }, {
            $set: {
                "comments.$.text": req.body.comment.text,
                "comments.$.updated": true
            }
        })
        res.status(200).json({info: "Update is successful", comment: comment});
    }   catch(err) {
        res.sendStatus(400)
    }
}

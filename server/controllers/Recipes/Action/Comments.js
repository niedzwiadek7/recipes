const mongoose = require('mongoose')
const Recipe = require('../../../database/Schema/Recipe')

exports.handleComment = async (req, res, next) => {
    const recipe = (await Recipe.find({ _id: new mongoose.Types.ObjectId(req.params.id)}))[0]

    req.body._id = recipe.comments.find(comment => {
        return comment._id.toString() === req.body.id_comment.toString()
    })?.author
    if (req.body._id === undefined) res.status(400).json({notExist: `This comment isn't available now`})
    else next()
}

exports.add = async (req, res) => {
    try {
        await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $push: {
                comments: req.body.comment,
            }
        })
        res.status(200).json({info: "Adding is successful", comment: req.body.comment});
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.delete = async(req, res) => {
    try {
        const deletingElement = await Recipe.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $pull: {
                comments: { _id: new mongoose.Types.ObjectId(req.body.id_comment) }
            }
        })
        if (deletingElement.nModified === 0) throw new Error()
        res.status(200).json({info: "Delete is successful"});
    }
    catch(err) {
        res.status(400).json({error: `This comment isn't available now`})
    }
}

exports.update = async(req, res) => {
    try {
        await Recipe.updateOne ({
            _id: new mongoose.Types.ObjectId(req.params.id),
            comments: {
                $elemMatch: {
                    _id: new mongoose.Types.ObjectId(req.body.id_comment)
                }
            }
        }, {
            $set: {
                "comments.$.text": req.body.comment.text,
                "comments.$.updated": true
            }
        })
        req.body.comment._id = req.body.id_comment
        res.status(200).json({info: "Update is successful", comment: req.body.comment})
    }   catch(err) {
        res.sendStatus(400)
        if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

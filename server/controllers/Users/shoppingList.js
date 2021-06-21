const User = require('../../database/Schema/User')
const mongoose = require('mongoose')

exports.add = async (req, res) => {
    try {
        await User.updateOne({_id: new mongoose.Types.ObjectId(req.user._id)}, {
            $push: {
                shoppingList: {
                    $each: req.body.ingredients
                }
            }
        })
        res.status(200).json({info: "Adding is successful"});
    }   catch (err) {
        res.sendStatus(400)
    }
}

exports.delete = async(req, res) => {
    try {
        const deletingElement = await User.updateOne({_id: new mongoose.Types.ObjectId(req.user._id)}, {
            $pull: {
                shoppingList: { _id: new mongoose.Types.ObjectId(req.body.ingredient) }
            }
        })
        if (deletingElement.nModified === 0) throw new Error()
        res.status(200).json({info: "Delete is successful"});
    }
    catch(err) {
        res.status(400).json({error: `This ingredient isn't available now`})
    }
}

exports.find = async(req, res) => {
    try {
        const shoppingList = (await User.find({ _id: new mongoose.Types.ObjectId(req.user._id) }))[0]?.shoppingList

        if (shoppingList === undefined) {
            res.status(400).json({info: `This user doesn't exist`})
        }
        else res.status(200).json(shoppingList)

    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.sendStatus(400)
    }
}

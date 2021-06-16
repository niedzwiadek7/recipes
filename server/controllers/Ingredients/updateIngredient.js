require('../../database/mongodb')
const mongoose = require('mongoose')
const Ingredient = require('../../database/Schema/Ingredient')

exports.update = async (req, res) => {
    try {
        await Ingredient.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $set: {
                name: req.body.ingredient.name,
                description: req.body.ingredient.description,
                photo: req.body.ingredient.photo
            }
        })
        res.status(200).json(req.body.ingredient)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({name: 'this ingredient is already exist'})
        }   else if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

exports.accept = async (req, res) => {
    try {
        await Ingredient.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
            $set: {
                accepting: true
            }
        })
        res.sendStatus(200)
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
    }
}

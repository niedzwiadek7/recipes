const mongoose = require('mongoose')
const User = require('../../../database/Schema/User')
const Recipe = require('../../../database/Schema/Recipe')

exports.find = async (req, res) => {
    const errors = {}
    try {
        const user = (await User.find({
            _id: new mongoose.Types.ObjectId(req.user._id)
        }))[0]

        if (user === undefined) {
            errors.notExist = 'Problem with your account'
            throw new Error()
        }

        const list = []
        let updated = false

        for (let position=0; position<user.watched.length; position++) {
            const followingUser = user.watched[position]
            const watched = (await User.find({
                _id: new mongoose.Types.ObjectId(followingUser)
            }))[0]

            if (watched === undefined) {
                updated = true
                followingUser.watched.splice(position, 1)
                --position
            }
            else {
                let updateInWatched = false
                for (let pos=0; pos<watched.recipes.length; pos++) {
                    const recipe = watched.recipes[pos]
                    const result = (await Recipe.find({
                        _id: new mongoose.Types.ObjectId(recipe)
                    }))[0]

                    if (result === undefined) {
                        updateInWatched = true
                        watched.recipes.splice(pos, 1)
                        --pos
                    }   else if (result.category === req.body.category) list.push(result)
                }

                if (updateInWatched) {
                    await User.updateOne({
                        _id: new mongoose.Types.ObjectId(followingUser)
                    }, {
                        $set: {
                            recipes: watched.recipes
                        }
                    })
                }
            }
        }

        if (updated) {
            await User.updateOne({
                _id: new mongoose.Types.ObjectId(req.user._id)
            }, {
                $set: {
                    watched: user.watched
                }
            })
        }

        res.status(200).json(list)
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(200).json(errors)
    }
}

const mongoose = require('mongoose')
const Recipe = require('../../database/Schema/Recipe')

exports.find = async(req, res) => {
    const main = (await Recipe.find({ _id: new mongoose.Types.ObjectId(req.params.id) }))[0]

    const recipes = await Recipe.find()

    const array = []

    let value = 0

    recipes.forEach(recipe => {
        if (main._id !== recipe._id) {
            array.push({
                id: recipe,
                value: recipe.views
            })

            if (recipe.category === main.category) {
                array[array.length-1].value += 20
            }

            value += array[array.length-1].value
        }
    })

    const recommended = []

    for (let i=0; i<12; i++) {
        let number = Math.random()*value

        let j

        for (j=0; array[j].value < number; j++) number -= array[j].value

        recommended.push(array[j].id)
        value -= array[j].value
        array.splice(j, 1)
    }

    res.status(200).json(recommended)
}

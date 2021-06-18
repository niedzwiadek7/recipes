const mongoose = require('mongoose')
const Recipe = require('../database/Schema/Recipe')
const controlPublicFolder = require('./controlPublicFolder')

const tagsOperation = value => {
    value = value.map(v => v.split(' '))
    value.forEach(v => {
        let space = v.indexOf('');
        while (space !== -1) {
            v.splice(space, 1)
            space = v.indexOf('')
        }
    })
    value = value.map(v => v.join('_'))

    for (let i = 0; i < value.length; i++)
        for (let j = i + 1; j < value.length; j++)
            if ((value[i]) === (value[j])) value.splice(j--, 1)
    return value
}

exports.handleRecipeError = (req, res, next) => {
    // const body = JSON.parse(req.body.body);
    const body = req.body

    const rec = new Recipe({
        name: body.name,
        ingredients: body.ingredients,
        procedure: body.procedure,
        category: body.category,
        tags: tagsOperation((body?.tags || [])),
        photo: (req?.files || []).map(value => process.env.NODE_ENV === 'production' ?
            `https://recipe-server-2709.herokuapp.com/static/uploads/image/recipes/${value.filename}`
            : `http://localhost:5000/static/uploads/image/recipes/${value.filename}`),
        kcal: body.kcal,
        description: body.description,
        difficulty: body.difficulty,
        time: body.time,
        author: req.user._id,
    })

    const err = rec.validateSync()
    const errors = {}

    try {
        if (err !== undefined) {
            for (const property in err.errors) {
                const elements = property.split('.');
                switch (elements.length) {
                    case 1: {
                        errors[property] = err.errors[property].properties.message
                    }   break
                    case 2: {
                        if (!errors?.[elements[0]]) errors[elements[0]] = []
                        errors[elements[0]][elements[1]] = err.errors[property].properties.message
                    }   break
                    case 3: {
                        if (!errors?.[elements[0]]) errors[elements[0]] = []
                        if (!errors[elements[0]]?.[elements[1]]) errors[elements[0]][elements[1]] = {}
                        errors[elements[0]][elements[1]][elements[2]] = err.errors[property].properties.message
                    }
                }
            }
            throw new Error()
        }
        req.body.recipe = rec
        next()

    }   catch (err) {
        (req.files || []).forEach(value => {
            controlPublicFolder.deleteFile(`./../public/uploads/image/recipes/${value.filename}`)
        })
        res.status(400).json(errors)
    }
}

exports.handleCommentError = (req, res, next) => {
    const RecipeSchema = new Recipe({
        comments: [{
            text: req.body.text,
            author: req.user._id
        }]
    })

    const errors = {}
    const validationResult = RecipeSchema.validateSync()

    try {
        if (validationResult.errors?.['comments.0.text']) {
            errors.text = validationResult.errors['comments.0.text'].message
            throw new Error()
        }
        req.body.comment = RecipeSchema.comments[0]
        next()
    }   catch (err) {
        res.status(400).json(errors)
    }
}

exports.handleRatingError = async (req, res, next) => {
    const rates = (await Recipe.find({ _id: new mongoose.Types.ObjectId(req.params.id)}))[0]?.rating
    if (rates === undefined) {
        res.sendStatus(400)
    }   else {
        req.body.position = !rates.every(rate => rate.author.toString() !== req.user._id.toString())
        console.log(req.body.position)

        const RecipeSchema = new Recipe({
            rating: [{
                value: req.body.rating,
                author: req.user._id
            }]
        })
        const errors = {}
        const validationResult = RecipeSchema.validateSync()

        try {
            if (validationResult.errors?.['rating.0.value']) {
                errors.text = validationResult.errors['rating.0.value'].message
                throw new Error()
            }
            req.body.rate = RecipeSchema.rating[0]
            req.body._id = req.body.author
            next()
        } catch (err) {
            res.status(400).json(errors)
        }
    }
}

exports.handleRecipe = async (req, res, next) => {
    req.body._id = (await Recipe.find({_id: new mongoose.Types.ObjectId(req.params.id)}))[0]?.author
    if (req.body._id === undefined) res.status(400).json({notExist: `This recipe isn't available now`})
    else next()
}

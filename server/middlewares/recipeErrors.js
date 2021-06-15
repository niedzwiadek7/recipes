const Recipe = require('../database/Schema/Recipe')
const controlPublicFolder = require('./controlPublicFolder')
const mongoose = require('mongoose')

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
    const body = JSON.parse(req.body.body);

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
        author: mongoose.Types.ObjectId(body.author),
    })

    // console.log(rec);

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
        next(rec)

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
            text: body.comment.text,
        }]
    })

    const errors = {}
    const validationResult = RecipeSchema.validateSync()

    try {
        if (validationResult.errors?.['comments.0.text']) {
            errors.text = validationResult.errors['comments.0.text'].message
            throw new Error()
        }
        next(RecipeSchema.comments[0])
    }   catch (err) {
        res.status(400).json(errors)
    }
}

exports.handleRatingError = (req, res, next) => {
    const ratings = [body.rating]
    if (body?.old_rating) ratings.push(body.old_rating)

    if (ratings.every(el => ((typeof(el) === "number") && (el>=1) && (el<=5)))) next()
    else res.status(400).json({error: "Typing must be numbers between 1 and 5"})
}

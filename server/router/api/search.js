const express = require('express')
const router = express.Router()

const errorHandler = require('../../middlewares/errors')

const searchIngredient = require('../../controllers/Search/searchIngredient')
router.post('/ingredient', errorHandler.catchAsync(searchIngredient.find))

const searchRecipe = require('../../controllers/Search/searchRecipe')
router.post('/recipe', errorHandler.catchAsync(searchRecipe.find))

const searchUser = require('../../controllers/Search/searchUser')
router.post('/user', errorHandler.catchAsync(searchUser.find))

const recommended = require('../../controllers/Search/recommended')
router.get('/recommended/:id', errorHandler.catchAsync(recommended.find))

module.exports = router

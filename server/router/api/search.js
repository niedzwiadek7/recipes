const express = require('express')
const router = express.Router()

const errorHandler = require('../../middlewares/errors')

const searchIngredient = require('../../controllers/Search/searchIngredient')
router.post('/ingredient', errorHandler.catchAsync(searchIngredient.find))

module.exports = router

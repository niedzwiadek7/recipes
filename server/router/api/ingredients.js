const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/uploadImage')

const errorHandler = require('../../middlewares/errors')

const createIngredient = require('../../controllers/Ingredients/createIngredient')
router.post('/', createIngredient.add)

module.exports = router

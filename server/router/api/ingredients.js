const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/uploadImage')
const jwtAuth = require('../../middlewares/jwtauth')

const handleIngredientErrors = require('../../middlewares/handleIngredientErrors')

const createIngredient = require('../../controllers/Ingredients/createIngredient')
router.post('/', jwtAuth.auth, upload.any('photo'), handleIngredientErrors.handle, createIngredient.add)

const updateIngredient = require('../../controllers/Ingredients/updateIngredient')
router.put('/update/:id', jwtAuth.auth, upload.any('photo'), handleIngredientErrors.handle, updateIngredient.update)
router.put('/accept/:id', jwtAuth.auth, updateIngredient.accept)

const getIngredient = require('../../controllers/Ingredients/getIngredient')
router.post('/get', getIngredient.find)

module.exports = router

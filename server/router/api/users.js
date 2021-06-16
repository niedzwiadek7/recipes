const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/uploadImage')

const errorHandler = require('../../middlewares/errors')
const userErrors = require('../../middlewares/handleUserErrors')
const findDate = require('../../middlewares/findDate')
const jwtAuth = require('../../middlewares/jwtauth')

const getUser = require('../../controllers/Users/getUser')
router.get('/:id', errorHandler.catchAsync(getUser.find))

const createUser = require('../../controllers/Users/createUser')
router.post('/', upload.any('photo'), userErrors.handleUserErrors, createUser.add)

const deleteUser = require('../../controllers/Users/deleteUser')
router.delete('/:id', errorHandler.catchAsync(deleteUser.delete))

const updateUser = require('../../controllers/Users/updateUser')
router.put('/update/:id', userErrors.handleUserErrors, updateUser.update)

const authorizeUser = require('../../middlewares/authorizeUser')
const loginUser = require('../../controllers/Users/loginUser')
router.post('/login', errorHandler.catchAsync(authorizeUser.login), loginUser.login)

const saveChanges = require('../../controllers/Users/Menu/saveChanges')
const addRecipe = require('../../controllers/Users/Menu/addRecipe')
router.put('/menu/add/:id', jwtAuth.auth, findDate.find, addRecipe.add, errorHandler.catchAsync(saveChanges.save))

const deleteRecipe = require('../../controllers/Users/Menu/deleteRecipe')
router.put('/menu/delete/:id', jwtAuth.auth, findDate.find, deleteRecipe.delete, errorHandler.catchAsync(saveChanges.save))

const getRecipes = require('../../controllers/Users/Menu/getRecipes')
router.get('/menu/:id', findDate.find, errorHandler.catchAsync(getRecipes.get))



module.exports = router

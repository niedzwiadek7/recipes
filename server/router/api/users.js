const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/uploadImage')

const errorHandler = require('../../middlewares/errors')
const userErrors = require('../../middlewares/handleUserErrors')
const findDate = require('../../middlewares/findDate')
const jwtAuth = require('../../middlewares/jwtauth')
const verifyUser = require('../../middlewares/verifyUser')

const getUser = require('../../controllers/Users/getUser')
router.get('/:id', errorHandler.catchAsync(getUser.find))

const createUser = require('../../controllers/Users/createUser')
router.post('/', upload.any('photo'), userErrors.handleUserErrors, createUser.add)

const deleteUser = require('../../controllers/Users/deleteUser')
router.delete('/:id', jwtAuth.auth, userErrors.handleUserId, verifyUser.verify, errorHandler.catchAsync(deleteUser.delete))

const updateUser = require('../../controllers/Users/updateUser')
router.put('/update/:id', jwtAuth.auth, userErrors.handleUserId, verifyUser.verify, userErrors.handleUserErrors, updateUser.update)

const authorizeUser = require('../../middlewares/authorizeUser')
const loginUser = require('../../controllers/Users/loginUser')
router.post('/login', errorHandler.catchAsync(authorizeUser.login), loginUser.login)

const recipesByUser = require('../../controllers/Users/recipesByUser')
router.get('/recipes/:id', recipesByUser.find)

const saveChanges = require('../../controllers/Users/Menu/saveChanges')
const addRecipe = require('../../controllers/Users/Menu/addRecipe')
router.put('/menu/add', jwtAuth.auth, findDate.find, addRecipe.add, errorHandler.catchAsync(saveChanges.save))

const deleteRecipe = require('../../controllers/Users/Menu/deleteRecipe')
router.put('/menu/remove', jwtAuth.auth, findDate.find, deleteRecipe.delete, errorHandler.catchAsync(saveChanges.save))

const getRecipes = require('../../controllers/Users/Menu/getRecipes')
router.post('/menu/get', jwtAuth.auth, findDate.find, errorHandler.catchAsync(getRecipes.get))

const handleWatched = require('../../middlewares/handleWatched')
const saveChangesInWatched = require('../../controllers/Users/Watched/saveChanges')

const addUserToWatched = require('../../controllers/Users/Watched/addUser')
router.put('/watched/add/', jwtAuth.auth, handleWatched.handle,
    addUserToWatched.add, errorHandler.catchAsync(saveChangesInWatched.save))

const removeUserFromWatched = require('../../controllers/Users/Watched/removeUser')
router.put('/watched/remove/', jwtAuth.auth, handleWatched.handle,
    removeUserFromWatched.remove, errorHandler.catchAsync(saveChangesInWatched.save))

const recipesByCategory = require('../../controllers/Users/Watched/recipesByCategory')
router.post('/watched/get/', jwtAuth.auth, recipesByCategory.find)

const shoppingList = require('../../controllers/Users/shoppingList')
router.put('/shopping/add', jwtAuth.auth, shoppingList.add)
router.put('/shopping/delete', jwtAuth.auth, shoppingList.delete)
router.get('/shopping/get', jwtAuth.auth, shoppingList.find)

module.exports = router

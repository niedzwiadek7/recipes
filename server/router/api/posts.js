const express = require('express')
const upload = require('../../middlewares/uploadImage')

const router = express.Router()
const errorHandler = require('../../middlewares/errors')
const recipeError = require('../../middlewares/recipeErrors')
const Comments = require('../../controllers/Recipes/Action/Comments')
const Ratings = require('../../controllers/Recipes/Action/Ratings')
const jwtAuth = require('../../middlewares/jwtauth')
const verifyUser = require('../../middlewares/verifyUser')

// Get posts
const getRecipe = require('../../controllers/Recipes/getRecipe')
router.get('/:id', errorHandler.catchAsync(getRecipe.find))

// Add post
const createRecipe = require('../../controllers/Recipes/createRecipe')
router.post('/', jwtAuth.auth, upload.any('photo') , recipeError.handleRecipeError, createRecipe.add)

// Delete post
const deleteRecipe = require('../../controllers/Recipes/deleteRecipe')
router.delete('/:id', jwtAuth.auth, recipeError.handleRecipe, verifyUser.verify, errorHandler.catchAsync(deleteRecipe.delete))

const updateRecipe = require('../../controllers/Recipes/updateRecipe')
router.put('/update/:id', jwtAuth.auth, recipeError.handleRecipe, verifyUser.verify, upload.any('photo'), recipeError.handleRecipeError, updateRecipe.update)

router.put('/comment/add/:id', jwtAuth.auth, recipeError.handleCommentError, Comments.add)
router.put('/comment/delete/:id', jwtAuth.auth, Comments.handleComment, verifyUser.verify, Comments.delete)
router.put('/comment/update/:id', jwtAuth.auth, Comments.handleComment, verifyUser.verify, recipeError.handleCommentError, Comments.update)

router.put('/rating/add/:id', jwtAuth.auth, recipeError.handleRatingError, Ratings.add)
router.put('/rating/delete/:id', jwtAuth.auth, errorHandler.catchAsync(Ratings.delete))
router.put('/rating/update/:id', jwtAuth.auth, recipeError.handleRatingError, Ratings.update)

module.exports = router

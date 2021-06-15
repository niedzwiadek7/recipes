const express = require('express')
const upload = require('../../middlewares/uploadImage')

const router = express.Router()
const errorHandler = require('../../middlewares/errors')
const recipeError = require('../../middlewares/recipeErrors')
const Comments = require('../../controllers/Recipes/Action/Comments')
const Ratings = require('../../controllers/Recipes/Action/Ratings')
const jwtAuth = require('../../middlewares/jwtauth')

// Get posts
const getRecipe = require('../../controllers/Recipes/getRecipe')
router.get('/:id', errorHandler.catchAsync(getRecipe.find))

// Add post
const createRecipe = require('../../controllers/Recipes/createRecipe')
router.post('/', jwtAuth.auth, upload.any('photo') , recipeError.handleRecipeError, createRecipe.add)

// Delete post
const deleteRecipe = require('../../controllers/Recipes/deleteRecipe')
router.delete('/:id', errorHandler.catchAsync(deleteRecipe.delete))

const updateRecipe = require('../../controllers/Recipes/updateRecipe')
router.put('/update/:id', recipeError.handleRecipeError, updateRecipe.update)

router.put('/comment/add/:id', jwtAuth.auth, recipeError.handleCommentError, Comments.add)
router.put('/comment/delete/:id/:id_comment', Comments.delete)
router.put('/comment/update/:id/:id_comment', recipeError.handleCommentError, Comments.update)

router.put('/rating/add/:id', recipeError.handleRatingError, Ratings.add)
router.put('/rating/delete/:id', recipeError.handleRatingError, Ratings.delete)
router.put('/rating/update/:id', recipeError.handleRatingError, Ratings.update)

module.exports = router

const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/uploadImage')

const errorHandler = require('../../middlewares/errors')
const userErrors = require('../../middlewares/handleUserErrors')

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

module.exports = router

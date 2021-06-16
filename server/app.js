require('dotenv').config({path: __dirname + '/.env'})

const express = require('express')
const cors = require('cors') //hidden console error
const bodyParser = require('body-parser') // send post data
const path = require('path')
const passport = require('./config/passport')
const posts = require('./router/api/posts')
const users = require('./router/api/users')
const ingredients = require('./router/api/ingredients')
const search = require('./router/api/search')
const err = require('./middlewares/errors')

const app = express()

// configure passport
passport.auth();

//Middleware inside and external
app.use(bodyParser.json())
app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'public')))

//Middleware router-level and handling errors
app.use('/api/posts', posts)
app.use('/api/users', users)
app.use('/api/ingredients', ingredients)
app.use('/api/search', search)

app.use(err.notFound)
app.use(err.catchError)

module.exports = app

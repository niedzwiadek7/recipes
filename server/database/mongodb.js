const mongoose = require('mongoose')
const db = require('../config/db')

const toString = () => {
    return `mongodb+srv://${db.connection.user}:${db.connection.password}@recipe.s1dwp.mongodb.net/${db.connection.database}?retryWrites=true`
}

mongoose.connect(toString(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

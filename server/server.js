const app = require('./app')
const user = require('./database/Schema/User')

app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'), () => {
    if (process.env.NODE_ENV === 'development') console.log(`App listen on port ${app.get('port')}`)
})

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const config = require('./config/config')
const datasource = require('./config/datasource')
const booksRouter = require('./routes/books.js')
const usersRouter = require('./routes/users.js')
const app = express()
const authorization = require('./auth')

app.config = config
app.datasource = datasource(app)

const auth = authorization(app)

app.use(bodyParser.json())
app.use('/', routes)
app.use(auth.initialize())

app.set('port', 3000)

booksRouter(app)
usersRouter(app)

module.exports = app

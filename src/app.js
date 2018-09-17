const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const datasource = require('./config/datasource')
const booksRouter = require('./routes/books.js')
const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')
const authorization = require('./auth')

const app = express()

app.config = config
app.datasource = datasource(app)

const auth = authorization(app)

app.use(bodyParser.json())
app.use(auth.initialize())

app.auth = auth

app.set('port', 3000)

booksRouter(app)
usersRouter(app)
authRouter(app)

module.exports = app

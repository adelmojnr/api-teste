const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const config = require('./config/config')
const datasource = require('./config/datasource')
const booksRouter = require('./routes/books.js')
const usersRouter = require('./routes/books.js')
const app = express()

app.config = config
app.datasource = datasource(app)

app.use(bodyParser.json())
app.use('/', routes)

app.set('port', 3000)

booksRouter(app)
usersRouter(app)

module.exports = app

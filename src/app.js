const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const config = require('./config/config')
const datasource = require('./config/datasource')
const booksRouter = require('./routes/books.js')
const app = express()

app.config = config
app.datasource = datasource(app)

app.use(bodyParser.json())
app.use('/', routes)

app.set('port', 3000)

const { Books } = app.datasource.models
booksRouter(app, Books)

module.exports = app

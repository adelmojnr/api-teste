const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const config = require('./config/config')
const datasource = require('./config/datasource')
const app = express()

app.config = config
app.datasource = datasource(app)


app.use(bodyParser.json())
app.use('/', routes)

app.set('port', 3000)

const Books = app.datasource.models.Books

app.route('/books')
  .get((req, res) => {
    Books.findAll({})
    .then(result => res.json(result))
    .catch(err => res.status(412))
  })
  .post((req, res) => {
    Books.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(412))
  })  

app.route('/books/:id')
  .get((req, res) => {
    Books.findOne({where: req.params})
    .then(result => res.json(result))
    .catch(err => res.status(412))
  })

module.exports = app


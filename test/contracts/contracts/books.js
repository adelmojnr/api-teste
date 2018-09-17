const jwt = require('jwt-simple')
describe('Routes Books', () => {
  const { Books } = app.datasource.models
  const { Users } = app.datasource.models
  const { jwtSecret } = app.config
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description'
  }

  let token

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'Adelmo Junior',
        email: 'adelmo@mail.com',
        password: 'adelmo'
      }))
      .then(user => {
        Books
          .destroy({ where: {} })
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret)
            done()
          })
      })
  })
  describe('Route get /books', () => {
    it('Should return a list of books', (done) => {
      const bookList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      }))
      request
        .get('/books')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, bookList)
          done(err)
        })
    })
  })

  describe('Route get /books/:id', () => {
    it('Should return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      })

      request
        .get('/books/1')
        .end((err, res) => {
          joiAssert(res.body, book)
          done(err)
        })
    })
  })

  describe('Route POST /book', () => {
    const newBook = {
      id: 2,
      name: 'newBook',
      description: 'new description'
    }

    const book = Joi.object().keys({
      id: Joi.number(),
      name: Joi.string(),
      description: Joi.string(),
      created_at: Joi.date().iso(),
      updated_at: Joi.date().iso()
    })
    it('Should be create a book', (done) => {
      request
        .post('/books')
        .set('Authorization', `bearer ${token}`)
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, book)
          done(err)
        })
    })
  })

  describe('Route PUT /books/{id}', () => {
    it('Should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'updated book',
        description: 'updated book'
      }

      const updatedCount = Joi.array().items(1)

      request
        .put('/books/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          joiAssert(res.body, updatedCount)
          done(err)
        })
    })
  })

  describe('Route DELETE /books/{id}', () => {
    it('Should delete a book', done => {
      request
        .delete('/books/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204)
          done(err)
        })
    })
  })
})

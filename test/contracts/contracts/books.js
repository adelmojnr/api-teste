describe('Routes Books', () => {
  const { Books } = app.datasource.models
  const defaultBook = {
    id: 1,
    name: 'Default Book'
  }

  beforeEach((done) => {
    Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => {
        done()
      })
  })

  describe('Route get /books', () => {
    it('Should return a list of books', (done) => {
      const bookList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      }))
      request
        .get('/books')
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
      name: 'newBook'
    }

    const book = Joi.object().keys({
      id: Joi.number(),
      name: Joi.string(),
      created_at: Joi.date().iso(),
      updated_at: Joi.date().iso()
    })
    it('Should be create a book', (done) => {
      request
        .post('/books')
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
        name: 'updated book'
      }

      const updatedCount = Joi.array().items(1)

      request
        .put('/books/1')
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
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204)
          done(err)
        })
    })
  })
})

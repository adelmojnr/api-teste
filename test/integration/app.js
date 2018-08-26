describe('Routes Books', () => {
  const Books = app.datasource.models.Books
  const defaultBook = {
    id: 1,
    name: 'Default Book'
  }

  beforeEach(done => {
    Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => {
        done()
      })
  })

  describe('Route get /books', () => {
    it('Should return a list of books', done => {
      request
        .get('/books')
        .end((err, res) => {

          expect(res.body[0].id).to.be.eql(defaultBook.id)
          expect(res.body[0].name).to.be.eql(defaultBook.name)

          done(err)
        })
    })
  })

  describe('Route get /books/:id', () => {
    it('Should return a book', done => {
      request
        .get('/books/1')
        .end((err, res) => {

          expect(res.body.id).to.be.eql(defaultBook.id)
          expect(res.body.name).to.be.eql(defaultBook.name)

          done(err)
        })
    })
  })

  describe('Route POST /book', () => {
    const newBook =  {
      id: 2,
      name: 'newBook'
    }
    it('Should be create a book', done => {
      request
        .post('/books')
        .send(newBook)
        .end((err, res) => {

          expect(res.body.name).to.be.eql(newBook.name)
          expect(res.body.id).to.be.eql(newBook.id)

          done(err)
        })
    })
  })  
})

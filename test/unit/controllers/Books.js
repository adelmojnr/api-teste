const BooksController = require('../../../src/controllers/books')

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('Should return a list of books', () => {
      const Books = {
        findAll: td.function()
      }

      const expectedResponse = [{
        id: 1,
        name: 'Teste Book',
        created_at: '2017-09-06T00:04:00.0000',
        updated_at: '2017-09-06T00:04:00.0000'
      }]

      td.when(Books.findAll({})).thenResolve(expectedResponse)

      const booksController = new BooksController(Books)
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('Get all books: getByid', () => {
    it('Should return a book', () => {
      const Books = {
        findOne: td.function()
      }

      const expectedResponse = {
        id: 1,
        name: 'Teste Book',
        created_at: '2017-09-06T00:04:00.0000',
        updated_at: '2017-09-06T00:04:00.0000'
      }

      td.when(Books.findOne( { where: { id: 1 } })).thenResolve(expectedResponse)

      const booksController = new BooksController(Books)
      return booksController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })
  describe('Create a book: create()', () => {
    it('Should return a book', () => {
      const Books = {
        create: td.function()
      }

      const requestBody = {
        name: 'Teste book'
      }

      const expectedResponse = {
        id: 1,
        name: 'Teste book',
        created_at: '2017-09-06T00:04:00.0000',
        updated_at: '2017-09-06T00:04:00.0000'
      }

      td.when(Books.create(requestBody)).thenResolve(expectedResponse)

      const booksController = new BooksController(Books)
      return booksController.create(requestBody)
        .then(response => {
          expect(response.statusCode).to.be.eql(201)
          expect(response.data).to.be.eql(expectedResponse)
        })
    })
  })
  describe('Update a book: update()', () => {
    it('Should update an existing book', () => {
      const Books = {
        update: td.function()
      }

      const requestBody = {
        id: 1,
        name: 'Teste book updated'
      }

      const expectedResponse = {
        id: 1,
        name: 'Teste book',
        created_at: '2017-09-06T00:04:00.0000',
        updated_at: '2017-09-06T00:04:00.0000'
      }
      td.when(Books.update(requestBody, { where: {id: 1}})).thenResolve(expectedResponse)

      const booksController = new BooksController(Books)
      return booksController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })
  describe('Delete a book: delete()', () => {
    it('Should delete an existing book', () => {
      const Books = {
        destroy: td.function()
      }

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({})

      const booksController = new BooksController(Books)
      return booksController.delete({ id: 1 })
        .then(response => expect(response.statusCode)).to.be.eql(204)
    })
  })
})

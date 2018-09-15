describe('Users Books', () => {
  const { Users } = app.datasource.models
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@email.com',
    password: 'teste'
  }

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done()
      })
  })

  describe('Route get /users', () => {
    it('Should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id)
          expect(res.body[0].name).to.be.eql(defaultUser.name)
          expect(res.body[0].email).to.be.eql(defaultUser.email)

          done(err)
        })
    })
  })

  describe('Route get /users/:id', () => {
    it('Should return a user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id)
          expect(res.body.name).to.be.eql(defaultUser.name)
          expect(res.body.email).to.be.eql(defaultUser.email)

          done(err)
        })
    })
  })

  describe('Route POST /user', () => {
    const newUser = {
      id: 2,
      name: 'newUser',
      email: 'test2@email.com',
      password: '123456'
    }
    it('Should be create a user', (done) => {
      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id)
          expect(res.body.name).to.be.eql(newUser.name)
          expect(res.body.email).to.be.eql(newUser.email)
          expect(res.body.password).to.be.eql(newUser.password)

          done(err)
        })
    })
  })

  describe('Route PUT /users/{id}', () => {
    it('Should update an user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updated user',
        email: 'updated@email.com',
        password: 'teste'
      }

      request
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1])

          done(err)
        })
    })
  })

  describe('Route DELETE /users/{id}', () => {
    it('Should delete a book', done => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204)
          done(err)
        })
    })
  })
})

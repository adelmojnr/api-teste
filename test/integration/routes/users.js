const jwt = require('jwt-simple')
describe('Routes Users', () => {
  const { Users } = app.datasource.models
  const { jwtSecret } = app.config
  const defaultUser = {
    id: 1,
    name: 'Default user',
    email: 'teste@mail.com',
    password: 'pass123'
  }

  let token

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'Adelmo',
        email: 'adelmo@mail.com',
        password: '12345'
      }))
      .then(user => {
        Users.create(defaultUser)
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret)
            done()
          })
      })
  })

  describe('Route get /users', () => {
    it('Should return a list of users', (done) => {
      request
        .get('/users')
        .set('Authorization', `bearer ${token}`)
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
        .set('Authorization', `bearer ${token}`)
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
      email: 'email@email.com',
      password: '1234156a4e'
    }
    it('Should be create a user', (done) => {
      request
        .post('/users')
        .set('Authorization', `bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.body.name).to.be.eql(newUser.name)
          expect(res.body.id).to.be.eql(newUser.id)
          expect(res.body.description).to.be.eql(newUser.description)

          done(err)
        })
    })
  })

  describe('Route PUT /users/{id}', () => {
    it('Should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updated user',
        email: 'adelmo@mail.com',
        password: '123549ahguy'
      }

      request
        .put('/users/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1])

          done(err)
        })
    })
  })

  describe('Route DELETE /users/{id}', () => {
    it('Should delete a user', done => {
      request
        .delete('/users/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204)
          done(err)
        })
    })
  })
})

const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

module.exports = app => {
  const { Users } = app.datasource.models
  const opts = {}
  opts.secretOrKey = app.config.jwtSecret
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

  const strategy = new Strategy(opts, (payload, done) => {
    console.log(Users)
    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          })
        }
        return done(null, false)
      })
      .catch(error => done(error, null))
  })
  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession)
  }
}

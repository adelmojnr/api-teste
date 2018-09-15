module.exports = {
  database: 'books',
  username: 'root',
  password: '2522510',
  params: {
    dialect: 'mysql',
    define: {
      underscored: true
    },
    operatorsAliases: false
  },
  jwtSecret: 'Sec3t',
  jwtSession: { session: false }
}

module.exports = {
  database: process.env.NODE_ENV ? 'test_books' : 'books',
  username: 'root',
  password: '2522510',
  params: {
    dialect: 'mysql',
    storage: process.env.NODE_ENV ? 'teste_books.json' : 'books.json',
    define: {
      underscored: true
    }
  }
}

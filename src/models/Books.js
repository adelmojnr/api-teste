module.exports = (sequelize, DataType) => {
  const Books = sequelize.define('Books', {
    id: { 
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncremente: true
    },
    name: {
      type: DataType.STRING,
      validate: {
        notEmpty: true
      }
    }
  })
  return Books
}

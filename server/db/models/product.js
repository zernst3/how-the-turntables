const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  songList: {
    type: Sequelize.TEXT,
  },
  artistName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  releaseYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://i.pinimg.com/originals/f1/01/40/f101408a505673ae915f3afcc6588183.png',
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.STRING,
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

module.exports = Product

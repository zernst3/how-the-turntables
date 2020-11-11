const {NOW} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  //   status: {
  //     cart or order history
  //   },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: NOW,
  },
  deliveryStatus: {
    type: Sequelize.STRING,
    defaultValue: 'Pending',
  },
  overallPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
})

module.exports = Order

const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('OrderItem', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  itemPriceAtTimeOfPurchase: {
    type: Sequelize.INTEGER,
  },
})

module.exports = OrderItem

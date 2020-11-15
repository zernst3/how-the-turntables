const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('OrderItem', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  itemPriceAtTimeOfPurchase: {
    type: Sequelize.INTEGER,
  },
  shippingAddressAtTimeOfPurchase: {
    type: Sequelize.STRING,
  },
  billingAddressAtTimeOfPurchase: {
    type: Sequelize.STRING,
  },
  creditCardNumberAtTimeOfPurchase: {
    type: Sequelize.STRING,
  },
})

module.exports = OrderItem

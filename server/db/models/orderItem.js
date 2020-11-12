const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order-item', {
  // quantity: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 1
  // },
  // combinedPrice: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
})

module.exports = OrderItem

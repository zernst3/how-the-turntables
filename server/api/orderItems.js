const router = require('express').Router()
const Sequelize = require('sequelize')
const {OrderItem, Product, Order} = require('../db/models')
const Op = Sequelize.Op

router.get('/', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderItemId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findAll({
      where: {
        id: {[Op.eq]: req.params.orderItemId}
      }
    })
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router

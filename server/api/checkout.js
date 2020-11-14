const router = require('express').Router()
const Sequelize = require('sequelize')
const {User, Address, Order, CreditCard, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport && req.session.passport.user) {
      const id = req.session.passport.user
      const user = await User.findByPk(id, {
        include: [
          {
            model: Address,
          },
          {
            model: Order,
            where: {status: 'Current Cart'},
            include: {
              model: Product,
            },
          },
          {
            model: CreditCard,
          },
        ],
      })
      res.json(user)
    } else {
      // This is so it matches the object format as if it were from a login
      const cart = {orders: [req.session.cart]}
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

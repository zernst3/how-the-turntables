/* eslint-disable guard-for-in */
const router = require('express').Router()
const Sequelize = require('sequelize')
const {
  User,
  Address,
  Order,
  CreditCard,
  Product,
  OrderItem,
} = require('../db/models')

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

router.post('/', async (req, res, next) => {
  try {
    const products = req.session.cart.products
    // console.log(req.body.checkoutData)
    // console.log(req.session.cart)
    // Change order from 'Current Cart' to 'Old Order', Change order delivery status to 'Pending'
    // Order.update(
    //   {
    //     status: 'Old Order',
    //     deliveryStatus: 'Pending',
    //   },
    //   {
    //     where: {
    //       id: req.session.cart.id,
    //     },
    //   }
    // )

    // For each product in cart
    // Change OrderItem itemPriceAtTimeOfPurchase to equal the product price in the session store, shipping address, billing address, credit card number (last 4 digits)
    // Find product in the database and update its inventory
    // for (let i = 0; i < products.length; i++) {
    //   const foundProduct = await Product.findByPk(products[i].id)
    //   const newInventory =
    //     foundProduct.dataValues.inventory - products[i].OrderItem.quantity
    //   await foundProduct.update({inventory: newInventory})
    // }

    // Clear session cart
  } catch (error) {
    next(error)
  }
})

module.exports = router

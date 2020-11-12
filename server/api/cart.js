const router = require('express').Router()
module.exports = router
const {Order, Product, orderItem} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.session.user) {
      req.session.cart = await findUserCart(parseInt(req.session.user.id))
    }

    if (!req.session.cart) {
      req.session.cart = {products: []}
    }

    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    // req.body.quantity should contain the quantity of the item

    let product = await Product.findByPk(parseInt(req.params.id))
    product = product.dataValues
    product.orderItem = {}
    product.orderItem.quantity = req.body.quantity

    // If user is logged in, make cart equal to cart in database and add item to the cart
    if (req.session.user) {
      const cart = (req.session.cart = await findUserCart(
        parseInt(req.session.user.id)
      ))

      await orderItem.upsert({
        ProductId: product.id,
        OrderId: cart.id,
        quantity: req.body.quantity,
      })
    }

    // This is if the cart has not been loaded into the session yet for a guest user, this creates a new cart with the item
    if (!req.session.cart) {
      req.session.cart = {products: []}
      req.session.cart.products.push(product)
      return res.json(req.session.cart)
    }

    // If the session cart already exists for the guest user, find and update the product in the cart, or push new item
    let found = false
    for (let i = 0; i < req.session.cart.products.length; i++) {
      if (req.session.cart.products[i].id === parseInt(req.params.id)) {
        found = true
        req.session.cart.products[i] = product
      }
    }

    if (!found) {
      req.session.cart.products.push(product)
    }

    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.session.user) {
      const cart = await findUserCart(parseInt(req.session.user.id))
      const item = await orderItem.findOne({
        where: {
          ProductId: req.params.id,
          OrderId: cart.id,
        },
      })

      item.destroy()
    }
    req.session.cart.products = req.session.cart.products.filter((item) => {
      return item.id !== parseInt(req.params.id)
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// Maybe rework this into an instance method?
const findUserCart = async (id) => {
  // Searches for user information based on currently logged-in user, and includes their cart
  const cart = await Order.findOrCreate({
    where: {
      userId: parseInt(id),
      status: null,
    },
    defaults: {
      userId: parseInt(id),
      status: null,
    },
    include: {
      model: Product,
      as: 'products',
    },
  })

  return cart
}
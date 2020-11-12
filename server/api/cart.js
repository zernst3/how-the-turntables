const router = require('express').Router()
module.exports = router
const {Order, Product, OrderItem} = require('../db/models')

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

    const product = await Product.findByPk(parseInt(req.params.id))

    // If user is logged in, make cart equal to cart in database and add item to the cart
    if (req.session.user) {
      const cart = (req.session.cart = await findUserCart(
        parseInt(req.session.user.id)
      ))

      await OrderItem.upsert({
        ProductId: product.id,
        OrderId: cart.id,
        quantity: req.body.quantity,
      })
    }

    const orderItem = {
      quantity: req.body.quantity,
      product,
    }

    // This is if the cart has not been loaded into the session yet for a guest user, this creates a new cart with the item
    if (!req.session.cart) {
      req.session.cart = {products: []}
      req.session.cart.products.push(orderItem)
    }

    // If the session cart already exists for the guest user, find and update the product in the cart, or push new item
    let found = false
    for (let i = 0; i < req.session.cart.length; i++) {
      console.log(req.session.cart[i].product.id)
      if (req.session.cart[i].product.id === parseInt(req.params.id)) {
        found = true
        req.session.cart[i] = orderItem
      }
    }

    if (!found) {
      req.session.cart.push(orderItem)
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
      const orderItem = await OrderItem.findOne({
        where: {
          ProductId: req.params.id,
          OrderId: cart.id,
        },
      })

      orderItem.destroy()
    }
    req.session.cart.products = req.session.cart.products.filter((item) => {
      return item.product.id !== parseInt(req.params.id)
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
      status: 'Current Cart',
    },
    defaults: {
      userId: parseInt(id),
      status: 'Current Cart',
    },
    include: {
      model: Product,
      as: 'products',
    },
  })

  return cart
}

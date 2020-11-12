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

    req.session.cart = {
      products: [
        {
          id: 1,
          title: 'Thriller',
          songList: 'Toiahwewewf,wefw',
          artistName: 'Michael Jackson',
          releaseYear: 1982,
          imageUrl:
            'https://i5.walmartimages.com/asr/ac1953e5-4676-4ede-b0ff-0e3ad92818a3_1.915ca3bc461982df19a86d4acd26228a.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
          price: 2050,
          category: 'Pop',
          inventory: 148,
          orderItem: {
            quantity: 3,
          },
        },
        {
          id: 2,
          title: 'Ray of Light',
          songList: 'Erotic, ray of Light, Time goes By',
          artistName: 'Madonna',
          releaseYear: 1988,
          imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/7128tY0BnEL._SY450_.jpg',
          price: 2036,
          category: 'Pop',
          inventory: 77,
          orderItem: {
            quantity: 2,
          },
        },
        {
          id: 3,
          title: 'Rumours',
          songList: 'Dreams, Never going back',
          artistName: 'Fleetwood Mac',
          releaseYear: 1977,
          imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/71BekDJBb3L._SY355_.jpg',
          price: 2088,
          category: 'Pop Rock',
          inventory: 28,
          orderItem: {
            quantity: 1,
          },
        },
      ],
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

      await OrderItem.upsert({
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
      const orderItem = await OrderItem.findOne({
        where: {
          ProductId: req.params.id,
          OrderId: cart.id,
        },
      })

      orderItem.destroy()
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

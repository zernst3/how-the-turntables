const router = require('express').Router()
module.exports = router
const {Order} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    // if (req.session.user) {
    //   req.session.cart = await findUserCart(parseInt(req.session.user.id))
    // }

    // REMOVE ONCE TEST DATA IS NO LONGER NEEDED
    req.session.cart = user.Cart

    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    // if (req.session.user) {
    //   const cart = await findUserCart(parseInt(req.session.user.id))
    //   cart.destroy({
    //     where: {
    //       ProductId: req.params.id,
    //     },
    //   })
    // }
    req.session.cart = req.session.cart.filter((item) => {
      return item.id !== parseInt(req.params.id)
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// For updating amount in the cart
router.put('/:id', async (req, res, next) => {
  try {
    if (req.session.user) {
      const user = await findUserCart(parseInt(req.session.user.id))
    }
  } catch (error) {
    next(error)
  }
})

const user = {
  email: 'zernst3@live.com',
  id: 1,
  Cart: [
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
      amount: 2,
    },
    {
      id: 2,
      title: 'Ray of Light',
      songList: 'Erotic, ray of Light, Time goes By',
      artistName: 'Madonna',
      releaseYear: 1988,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/7128tY0BnEL._SY450_.jpg',
      price: 3036,
      category: 'Pop',
      amount: 1,
    },
    {
      id: 3,
      title: 'Rumours',
      songList: 'Dreams, Never going back',
      artistName: 'Fleetwood Mac',
      releaseYear: 1977,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71BekDJBb3L._SY355_.jpg',
      price: 2588,
      category: 'Pop Rock',
      amount: 2,
    },
  ],
}

// Maybe rework this into an instance method?
const findUserCart = async (id) => {
  // Searches for user information based on currently logged-in user, and includes their cart
  const cart = await Order.findOne({
    where: {
      userId: parseInt(id),
      deliveryStatus: 'inCart',
    },
  })

  return cart
}

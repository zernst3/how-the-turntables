const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // Searches for user information based on currently logged-in user, and includes their cart
    // const user = await User.findByPk(
    //   req.session.user.id,
    //   {
    //     attributes: ['id', 'email'],
    //   },
    //   {
    //     include: [Cart],
    //   }
    // )
    // res.json(user);

    // Test data
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

    if (user) {
      req.session.cart = user.Cart
    }

    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

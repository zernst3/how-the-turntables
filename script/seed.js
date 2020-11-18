const db = require('../server/db')
const {green, red} = require('chalk')
const Chance = require('chance')

const Products = require('../server/db/models/product')
const Users = require('../server/db/models/user')
const Orders = require('../server/db/models/order')
const CreditCards = require('../server/db/models/creditCard')
const Addresses = require('../server/db/models/address')

const chance = new Chance()

const productsForPostico = [
  // Real Albums
  // Pop Albums
  {
    title: 'Thriller',
    songList: 'P.Y.T, Thriller, Beat It',
    artistName: 'Michael Jackson',
    releaseYear: 1982,
    imageUrl:
      'https://i5.walmartimages.com/asr/ac1953e5-4676-4ede-b0ff-0e3ad92818a3_1.915ca3bc461982df19a86d4acd26228a.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Future Nostalgia',
    songList: `Future Nostalgia, Don't Start Now, Cool`,
    artistName: 'Dua Lipa',
    releaseYear: 2020,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'thank u, next',
    songList: 'imagine, needy, NASA',
    artistName: 'Ariana Grande',
    releaseYear: 2019,
    imageUrl:
      'data:image/jpeg;base64,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',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Fine Line',
    songList: `Golden, Watermelon Sugar, Adore You`,
    artistName: 'Harry Styles',
    releaseYear: 2019,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61uo57hXGxL._SL1200_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Ray of Light',
    songList: 'Erotic, Ray of Light, Time Goes By',
    artistName: 'Madonna',
    releaseYear: 1988,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/7128tY0BnEL._SY450_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  // Pop Rock
  {
    title: 'Rumours',
    songList: 'Dreams, Never Going Back Again, The Chain',
    artistName: 'Fleetwood Mac',
    releaseYear: 1977,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71BekDJBb3L._SY355_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop Rock',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Purple Rain',
    songList: `Let's Go Crazy, When Doves Cry, Purple Rain`,
    artistName: 'Prince',
    releaseYear: 1984,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81mmKB%2B6zaL._SL1500_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop Rock',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Abbey Road',
    songList: `Come Together, Maxwell's Silver Hammer, Here Comes The Sun`,
    artistName: 'The Beatles',
    releaseYear: 1969,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/A1ppzg2gLwL._AC_SL1500_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop Rock',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars',
    songList: `Five Years, Soul Love, Moonage Daydream`,
    artistName: 'David Bowie',
    releaseYear: 1972,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/515OGBMBsaL.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop Rock',
    inventory: chance.integer({min: 0, max: 99}),
  },
  // Rock and Roll
  {
    title: 'Back in Black',
    songList: `Hells Bells, Shoot To Thrill, Back in Black`,
    artistName: 'ACDC',
    releaseYear: 1980,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/ACDC_Back_in_Black.png/1200px-ACDC_Back_in_Black.png',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Rock and Roll',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Dark Side of the Moon',
    songList: `On The Run, Time, Money`,
    artistName: 'Pink Floyd',
    releaseYear: 1973,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61hw9WloObL._SL1500_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Rock and Roll',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Led Zeppelin II',
    songList: `Whole Lotta Love, The Lemon Song, Moby Dick`,
    artistName: 'Led Zeppelin',
    releaseYear: 1969,
    imageUrl:
      'https://media.musicarts.com/is/image/MMGS7/J22185000000000-00-600x600.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Rock and Roll',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Hotel California',
    songList: `Hotel California, Life in the Fast Lane, Wasted Time`,
    artistName: 'Eagles',
    releaseYear: 1976,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Rock and Roll',
    inventory: chance.integer({min: 0, max: 99}),
  },
  // Hip Hop
  {
    title: 'To Pimp A Butterfly',
    songList: `King Kunta, These Walls, Alright`,
    artistName: 'Kendrick Lamar',
    releaseYear: 2015,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61PSVxItH9L._AC_SL1001_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Hip-Hop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: '4:44',
    songList: `The Story of O.J., 4:44, Marcy Me`,
    artistName: 'Jay-Z',
    releaseYear: 2017,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/4-44_album_cover.png',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Hip-Hop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'Enter the Wu-Tang (36 Chambers)',
    songList: `Bring da Ruckus, Clan in da Front, C.R.E.A.M.`,
    artistName: 'Wu-Tang',
    releaseYear: 1993,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71h631BJGLL._SX425_.jpg',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Hip-Hop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  {
    title: 'My Beautiful Dark Twisted Fantasy',
    songList: `Dark Fantasy, Gorgeous, POWER`,
    artistName: 'Kanye West',
    releaseYear: 2010,
    imageUrl:
      'data:image/jpeg;base64,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',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Hip-Hop',
    inventory: chance.integer({min: 0, max: 99}),
  },
  // K-POP
  {
    title: 'The Album',
    songList: `How You Like That, Ice Cream, Pretty Savage`,
    artistName: 'Blackpink',
    releaseYear: 2020,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/f/f2/BLACKPINK-_The_Album.png',
    price: chance.integer({min: 1000, max: 500000}),
    category: 'K-POP',
    inventory: chance.integer({min: 0, max: 99}),
  },
]

for (let i = 0; i < 10; i++) {
  productsForPostico.push({
    title: chance.sentence({words: 1}),
    songList: chance.paragraph(),
    artistName: chance.word({syllables: 3}),
    releaseYear: chance.integer({min: 1900, max: 2020}),
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Rock and Roll',
    inventory: chance.integer({min: 0, max: 99}),
  })
}
for (let i = 0; i < 10; i++) {
  productsForPostico.push({
    title: chance.sentence({words: 1}),
    songList: chance.paragraph(),
    artistName: chance.word({syllables: 3}),
    releaseYear: chance.integer({min: 1900, max: 2020}),
    price: chance.integer({min: 1000, max: 500000}),
    category: 'K-POP',
    inventory: chance.integer({min: 0, max: 99}),
  })
}
for (let i = 0; i < 10; i++) {
  productsForPostico.push({
    title: chance.sentence({words: 1}),
    songList: chance.paragraph(),
    artistName: chance.word({syllables: 3}),
    releaseYear: chance.integer({min: 1900, max: 2020}),
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Pop',
    inventory: chance.integer({min: 0, max: 99}),
  })
}
for (let i = 0; i < 10; i++) {
  productsForPostico.push({
    title: chance.sentence({words: 1}),
    songList: chance.paragraph(),
    artistName: chance.word({syllables: 3}),
    releaseYear: chance.integer({min: 1900, max: 2020}),
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Classical',
    inventory: chance.integer({min: 0, max: 99}),
  })
}
for (let i = 0; i < 10; i++) {
  productsForPostico.push({
    title: chance.sentence({words: 1}),
    songList: chance.paragraph(),
    artistName: chance.word({syllables: 3}),
    releaseYear: chance.integer({min: 1900, max: 2020}),
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Jazz',
    inventory: chance.integer({min: 0, max: 99}),
  })
}
for (let i = 0; i < 10; i++) {
  productsForPostico.push({
    title: chance.sentence({words: 1}),
    songList: chance.paragraph(),
    artistName: chance.word({syllables: 3}),
    releaseYear: chance.integer({min: 1900, max: 2020}),
    price: chance.integer({min: 1000, max: 500000}),
    category: 'Country',
    inventory: chance.integer({min: 0, max: 99}),
  })
}

const usersForPostico = []
usersForPostico.push({
  userName: 'admin',
  email: 'admin@howtheturntables.com',
  password: 'admin123',
  isAdmin: true,
})

for (let i = 0; i < 100; i++) {
  usersForPostico.push({
    firstName: chance.first(),
    lastName: chance.last(),
    userName: chance.word({syllables: 4}),
    email: i.toString() + chance.email({domain: 'gmail.com'}),
    password: chance.string(),
  })
}

const ordersForPostico = []

for (let i = 1; i < 101; i++) {
  ordersForPostico.push({
    status: 'Current Cart',
    userId: i,
  })
}
for (let i = 0; i < 33; i++) {
  ordersForPostico.push({
    status: 'Old Order',
    deliveryStatus: 'Delivered',
    userId: chance.integer({min: 1, max: 100}),
  })
}
for (let i = 0; i < 33; i++) {
  ordersForPostico.push({
    status: 'Old Order',
    deliveryStatus: 'Pending',
    userId: chance.integer({min: 1, max: 100}),
  })
}
for (let i = 0; i < 33; i++) {
  ordersForPostico.push({
    status: 'Old Order',
    deliveryStatus: 'Shipped',
    userId: chance.integer({min: 1, max: 100}),
  })
}

const addressesForPostico = []

for (let i = 0; i < 50; i++) {
  addressesForPostico.push({
    fullName: chance.name(),
    street: chance.address(),
    city: chance.city(),
    state: chance.state({full: true}),
    country: chance.country({full: true}),
    zipCode: chance.zip(),
    addressType: 'Shipping',
    userId: chance.integer({min: 1, max: 100}),
  })
}
for (let i = 0; i < 50; i++) {
  addressesForPostico.push({
    fullName: chance.name(),
    street: chance.address(),
    city: chance.city(),
    state: chance.state({full: true}),
    country: chance.country({full: true}),
    zipCode: chance.zip(),
    addressType: 'Billing',
    userId: chance.integer({min: 1, max: 100}),
  })
}

const creditCardsForPostico = []

for (let i = 0; i < 101; i++) {
  creditCardsForPostico.push({
    fullName: chance.name(),
    creditCardNumber: parseInt(chance.cc({type: 'Mastercard'}), 10),
    expirationMonth: parseInt(chance.exp_month(), 10),
    expirationYear: parseInt(chance.exp_year(), 10),
    cvv: chance.integer({min: 100, max: 999}),
    userId: chance.integer({min: 1, max: 100}),
  })
}

const seed = async () => {
  try {
    await db.sync({force: true})

    const productArr = await Promise.all(
      productsForPostico.map((product) => {
        return Products.create(product)
      })
    )

    await Promise.all(
      usersForPostico.map((user) => {
        return Users.create(user)
      })
    )

    const orderArr = await Promise.all(
      ordersForPostico.map((order) => {
        return Orders.create(order)
      })
    )

    await Promise.all(
      creditCardsForPostico.map((creditCard) => {
        return CreditCards.create(creditCard)
      })
    )

    await Promise.all(
      addressesForPostico.map((address) => {
        return Addresses.create(address)
      })
    )

    await Promise.all(
      orderArr.map((order) => {
        return order.addProduct(productArr[chance.integer({min: 1, max: 199})])
      })
    )
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}

// 'use strict'

// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // We've separated the `seed` function from the `runSeed` function.
// // This way we can isolate the error handling and exit trapping.
// // The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed

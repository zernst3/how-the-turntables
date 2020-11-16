/* eslint-disable guard-for-in */
const router = require('express').Router()
const nodemailer = require('nodemailer')

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
    const {
      email,
      selectedCreditCard,
      selectedBillingAddress,
      selectedShippingAddress,
    } = req.body.checkoutData

    const products = req.session.cart.products

    // Change order from 'Current Cart' to 'Old Order', Change order delivery status to 'Pending', shipping address, billing address, credit card number (last 4 digits)
    Order.update(
      {
        status: 'Old Order',
        deliveryStatus: 'Pending',
        shippingAddressAtTimeOfPurchase: JSON.stringify(
          selectedShippingAddress
        ),
        billingAddressAtTimeOfPurchase: JSON.stringify(selectedBillingAddress),
        creditCardNumberAtTimeOfPurchase: selectedCreditCard.creditCardNumber.slice(
          selectedCreditCard.creditCardNumber.length - 4
        ),
      },
      {
        where: {
          id: req.session.cart.id,
        },
      }
    )

    // For each product in cart find product in the database and update its inventory
    for (let i = 0; i < products.length; i++) {
      // Update the inventory
      const foundProduct = await Product.findByPk(products[i].id)
      const newInventory =
        foundProduct.dataValues.inventory - products[i].OrderItem.quantity
      await foundProduct.update({inventory: newInventory})

      // Change OrderItem itemPriceAtTimeOfPurchase to equal the product price in the session store
      await OrderItem.update(
        {
          itemPriceAtTimeOfPurchase: products[i].price,
        },
        {
          where: {
            orderId: req.session.cart.id,
            productId: products[i].id,
          },
        }
      )
    }

    // Clear session cart
    req.session.cart = {}
    res.sendStatus(200)

    // ===================================
    // Nodemailer Code
    // ===================================
    // 1. Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    // 2.
    let mailOptions = {
      from: 'donotreply@howtheturntables.com',
      to: email,
      subject: 'Thank You for your Order',
      html: `<h1>This is a test</h1>
      <p>Look at this, if you received this email, that means I have gotten nodemailer to work :)</p>`,
    }

    // 3.
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Email Sent Successfully')
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

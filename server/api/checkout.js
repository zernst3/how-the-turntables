/* eslint-disable complexity */
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
    let guestOrder
    let total = 0

    // Change order from 'Current Cart' to 'Old Order', Change order delivery status to 'Pending', shipping address, billing address, credit card number (last 4 digits)
    if (req.session.cart.id) {
      Order.update(
        {
          status: 'Old Order',
          deliveryStatus: 'Pending',
          emailOfPurchase: email,
          shippingAddressAtTimeOfPurchase: JSON.stringify(
            selectedShippingAddress
          ),
          billingAddressAtTimeOfPurchase: JSON.stringify(
            selectedBillingAddress
          ),
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
    } else {
      guestOrder = await Order.create({
        status: 'Old Order',
        emailOfPurchase: email,
        deliveryStatus: 'Pending',
        shippingAddressAtTimeOfPurchase: JSON.stringify(
          selectedShippingAddress
        ),
        billingAddressAtTimeOfPurchase: JSON.stringify(selectedBillingAddress),
        creditCardNumberAtTimeOfPurchase: selectedCreditCard.creditCardNumber.slice(
          selectedCreditCard.creditCardNumber.length - 4
        ),
      })
    }

    // For each product in cart find product in the database and update its inventory
    for (let i = 0; i < products.length; i++) {
      total =
        total +
        req.session.cart.products[i].OrderItem.quantity * products[i].price
      // Update the inventory
      const foundProduct = await Product.findByPk(products[i].id)
      const newInventory =
        foundProduct.dataValues.inventory - products[i].OrderItem.quantity
      await foundProduct.update({inventory: newInventory})

      // Change OrderItem itemPriceAtTimeOfPurchase to equal the product price in the session store
      if (req.session.cart.id) {
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
      } else {
        await OrderItem.create({
          itemPriceAtTimeOfPurchase: products[i].price,
          orderId: guestOrder.id,
          productId: products[i].id,
          quantity: req.session.cart.products[i].OrderItem.quantity,
        })
      }
    }

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
      subject: 'How The Turntables - Thank You for your Order',
      html: `<h1>This is a test</h1>
      <p>Dear Customer,</p>
      <p>Thank you very much for your purchase with us today.</p>
      <p>Your order number is: ${req.session.cart.id || guestOrder.id}</p>
      <table style="width: 90%">
        <thead>
          <tr>
            <td>Item</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Item Total</td>
          </tr>
        </thead>
        <tbody>
        ${products.map((product) => {
          return `
          <tr>
            <td>${product.title}</td>
            <td>$${(product.price / 100).toFixed(2)}</td>
            <td>${product.OrderItem.quantity}</td>
            <td>$${((product.price * product.OrderItem.quantity) / 100).toFixed(
              2
            )}</td>
          </tr>`
        })}
        </tbody>
      </table>
      <p>Your Total: $${(total / 100).toFixed(2)}</p>
      `,
    }

    // 3.
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Email Sent Successfully')
      }
    })

    // Clear session cart
    req.session.cart = {products: []}
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

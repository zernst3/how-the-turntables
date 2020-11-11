const router = require('express').Router()
const Sequelize = require('sequelize')
const {Product} = require('../db/models')
const Op = Sequelize.Op

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: {[Op.eq]: req.params.productId},
      },
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router

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
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: {[Op.eq]: req.params.productId},
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => product.update(req.body))
    .then((product) => res.json(product))
    .catch(next)
})

module.exports = router

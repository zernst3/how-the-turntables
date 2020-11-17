const router = require('express').Router()
const Sequelize = require('sequelize')
const {Product} = require('../db/models')
const Op = Sequelize.Op
const {isAdmin} = require('../auth/middlewares')

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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {
      albumTitle,
      artistName,
      image,
      price,
      songList,
      releaseYear,
      category,
      inventory,
      id,
    } = req.body

    const newAlbum = {
      id,
      title: albumTitle,
      artistName,
      imageUrl: image,
      price,
      songList: songList,
      releaseYear,
      category,
      inventory,
    }

    const newProduct = await Product.upsert(newAlbum, {returning: true})

    res.json(newProduct[0].dataValues)
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

module.exports = router

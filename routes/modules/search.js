const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  let stores = []

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      stores = restaurants.filter(data => {
        const dataName = data.name.trim().toLowerCase()
        const dataCategory = data.category.trim().toLowerCase()
        return (dataName.includes(keyword) || dataCategory.includes(keyword))
      })
       return stores
    })
    .then(stores => res.render('index', { stores, keyword }))
    .catch(error => console.log(error))

})

module.exports = router
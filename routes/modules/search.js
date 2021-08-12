const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const keywordRegex = new RegExp(keyword, 'i');

  Restaurant.find({ $or: [{ category: { $regex: keywordRegex } }, { name: { $regex: keywordRegex } }] })
    .lean()
    .then(stores => res.render('index', { stores, keyword }))
    .catch(error => console.log(error))

})

module.exports = router
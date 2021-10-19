const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// 依序排列
router.get('/asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .sort({ name: 'asc' })
    .lean()
    .then(stores => res.render('index', { stores }))
    .catch(error => console.log(error))
})
// 反序排列
router.get('/desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .sort({ name: 'desc' })
    .lean()
    .then(stores => res.render('index', { stores }))
    .catch(error => console.log(error))
})
// 依種類排列
router.get('/category', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .sort({ category: 1 })
    .lean()
    .then(stores => res.render('index', { stores }))
    .catch(error => console.log(error))
})
// 依地點排列
router.get('/location', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .sort({ location: 1 })
    .lean()
    .then(stores => res.render('index', { stores }))
    .catch(error => console.log(error))
})

module.exports = router

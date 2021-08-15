const express = require('express')
const router = express.Router()
// 引入home模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')

// 將網址結構符合/字串的request導向home模組
router.use('/', home)

router.use('/restaurants', restaurants)

router.use('/search', search)

router.use('/sort', sort)

module.exports = router
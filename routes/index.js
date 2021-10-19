const express = require('express')
const router = express.Router()
// 引入home模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

// 將網址結構符合/字串的request導向home模組
router.use('/restaurants', authenticator, restaurants)

router.use('/sort', authenticator, sort)

router.use('/search', authenticator, search)

router.use('/users', users)

router.use('/auth', auth)

router.use('/', authenticator, home)

module.exports = router

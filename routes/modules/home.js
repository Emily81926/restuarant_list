const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {

  Restaurant.find()
    .lean()
    .then(stores => res.render('index', { stores }))
    .catch(error => console.log(error))
})

module.exports = router
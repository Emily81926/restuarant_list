const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortInfos = require('../../public/javascripts/sortInfos')

router.get('/asc', (req, res) => {
     Restaurant.find()
              .sort({ name: 'desc'})
       .then(stores => res.render('index', { stores }))
       .catch(error => console.log(error))
})


module.exports = router
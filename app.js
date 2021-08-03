const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant.js')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',()=>{
  console.log('mongodb error!')
})

db.once('open',()=>{
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {

  Restaurant.find()
            .lean()
            .then( stores => res.render('index',{stores}))
            .catch(error =>console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const item = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)

  res.render('show', { item: item })
})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(items => {
    return items.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { items: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})
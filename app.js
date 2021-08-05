const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',() => {
  console.log('mongodb error!')
})

db.once('open',() => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {

  Restaurant.find()
            .lean()
            .then( stores => res.render('index',{stores}))
            .catch(error =>console.log(error))
})

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const item = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)

//   res.render('show', { item: item })
// })

// app.get('/search', (req, res) => {

//   const keyword = req.query.keyword
//   const restaurant = restaurantList.results.filter(items => {
//     return items.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { items: restaurant, keyword: keyword })
// })

app.get('/restaurants/new',(req,res)=>{
  return res.render('new')
})

app.post('/restaurants', (req,res) =>{
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  
  console.log('req.body.phone',req.body.phone)
  return Restaurant.create({ name , name_en , category ,  image ,  location ,  phone ,  google_map ,  rating ,  description })
                 .then(()=> res.redirect('/'))
                 .catch(error => console.log(error))

})


app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})
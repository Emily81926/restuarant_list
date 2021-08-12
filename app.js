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

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {

  Restaurant.find()
            .lean()
            .then( stores => res.render('index',{stores}))
            .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')

})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
      .lean()
    .then((item) => res.render('show', { item }))
    .catch(error => console.log(error))
 
})



app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordRegex = new RegExp(keyword, 'i');
  
  Restaurant.find({ $or: [{ category: { $regex: keywordRegex} }, { name: { $regex: keywordRegex} } ] })
    .lean()
    .then(stores => res.render('index', { stores , keyword }))
    .catch(error => console.log(error))
  
})


app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((item) => res.render('edit', { item }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
      .then(item => {
        item.name = name,
        item.name_en = name_en,
        item.category = category,
        item.image = image,
        item.location = location,
        item.phone = phone,
        item.google_map = google_map,
        item.rating = rating,
        item.description = description
        return item.save()
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete',(req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
        .then(item => item.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})
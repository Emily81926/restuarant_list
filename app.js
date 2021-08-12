const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})
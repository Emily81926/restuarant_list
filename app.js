const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const usePassport = require('./config/passport')

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SEESION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
//設定本地變數 res.locals 的 middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)




app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})
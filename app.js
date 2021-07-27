const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
app.engine('handlebars',exphbs({defaultLayout : 'main'}))
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(req,res)=>{
  
  res.render('index', {items: restaurantList.results})
})

app.get('/restaurants/:restaurant_id',(req,res)=>{
  const item = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  
  res.render('show',{ item: item })
})

app.get('/search',(req,res)=>{

  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(items =>{
    return items.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index',{ items: restaurant, keyword: keyword })
})

app.listen(port,()=>{
  console.log(`express is listening on http://localhost:${port}`)
})
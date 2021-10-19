const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../users')
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantsID: [1, 2, 3, 4]
  }, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantsID: [5, 6, 7, 8]
  }]
const data = require('./restaurant.json')
const restaurant_data = data.results

db.once('open', () => {
  console.log('mongodb connected!')
  Promise.all(SEED_USERS.map(SEED_USER =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
      .then(user => {
        // 從restaurant_data中篩選出含有在SEED_USER的restaurantsID中的餐廳
        const restaurants = restaurant_data.filter(restaurant => SEED_USER.restaurantsID.includes(restaurant.id))
        // 將選出的餐廳，設定他們的userId是user資料庫所產生的id
        restaurants.forEach(restaurant => { restaurant.userId = user._id })
        return Restaurant.create(restaurants)
      })
  ))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})

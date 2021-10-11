const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
  return res.render('register')

})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword){
    errors.push({ message: 'All fields are required!' })
  }
  if(password !== confirmPassword){
    errors.push({ message:'Password and Confirm password do not match!' })
  }
  if(errors.length){
     return res.render('register',{
       errors,
       name,
       email,
       password,
       confirmPassword
     })
  }

  User.findOne({ email })
  .then( user => {
    if(user){
      errors.push({ message: 'This email is already registered!' })
      return res.render('register',{
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
    return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
        name,
        email,
        password: hash
      }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
    
  })
})


router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local',{
   successRedirect:'/',
   failureRedirect:'/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'successfully logged out!')
  res.redirect('/users/login')
})


module.exports = router
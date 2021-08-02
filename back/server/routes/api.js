const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = require('../servHit.js')

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongdb'))
  .catch(err => console.log(err))



const tokenAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
   req.tokenData = jwt.verify(token, 'userKey')
   next()
  } catch (err) {
    return res.status(401).send('There is no user')
  }
}

router.post('/register', (req, res) => {
  let userData = req.body

  User.findOne({email: userData.email}, (err, user) => {
    if (user !== null) {
      res.status(400).send('this email arledy exist')
      return
    } else {
      let user = new User(userData)
      user.save((error, registerUser) => {
        if (error) {
          console.log(error)
        } else {
          let payload = { subject: registerUser._id }
          let token = jwt.sign(payload, 'userKey')
          res.status(200).send({token})
        }
      })
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body

  User.findOne({email: userData.email}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send('Invalid email')
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid password')
      } else {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'userKey')
        res.status(200).send({token})
      }
    }
  })
})

router.put('/login', tokenAuth, (req, res) => {
  let userData = req.body

  User.updateOne(
    {_id: req.tokenData.subject},
    {$set: {userOption: userData.userOption}},
    (err, user) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send(user)
      }
    }
  )
})

router.get('/login', tokenAuth, (req, res) => {
  User.findOne({_id: req.tokenData.subject}, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send({email: user.email, option: user.userOption})
    }
  })
})

module.exports = router

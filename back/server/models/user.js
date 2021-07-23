const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: String,
  password: String,
  userOption: Array
})
module.exports = mongoose.model('user', userSchema, 'users')

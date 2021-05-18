const mongoose = require('./index')

module.exports = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  gender: Number,
  age: Number
}), 'user')
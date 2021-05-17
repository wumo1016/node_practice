const mongoose = require('./index')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  gender: Number,
  age: Number
})

const UserModel = mongoose.model('User', UserSchema, 'user')

module.exports = UserModel

const mongoose = require('./index')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  gender: Number,
  age: Number
})

// 通过名字查找用户
UserSchema.statics.findByName = function (name) {
  return this.findOne({
    username: name
  })
}

// this.model 获取模型
UserSchema.methods.saveMd5 = function () {
  this.password = crypto.createHash('md5').update(this.password).digest('base64')
  // return this.model('User').create(this)
  return this.save()
}

// 虚拟属性 可以取到 但是不会影响原来的字段
UserSchema.virtual('usernameAndPassword').get(function () {
  return this.username + '+' + this.password
})

module.exports = mongoose.model('User', UserSchema, 'user')
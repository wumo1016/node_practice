const mongoose = require('mongoose')

mongoose.connect('mongodb://webAdmin:123456@127.0.0.1:27017/web', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    return console.log('数据库连接失败');
  }
  console.log('数据库连接成功');
})

module.exports = mongoose
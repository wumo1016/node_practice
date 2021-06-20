const mongoose = require('./index')

module.exports = mongoose.model('Article', new mongoose.Schema({
  title: String,
  content: String,
  createTime: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    // ref: 'User' // 旧版本 配合populate使用
  } // 用户的 _id
}), 'article')
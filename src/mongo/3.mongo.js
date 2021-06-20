const mongoose = require('mongoose')
const ArticleModel = require('./model/article')
const UserModel = require('./model/user');

// (async () => {
//   let user = await UserModel.create({
//     username: 'wyb',
//     password: '123456'
//   })
//   let article = ArticleModel.create({
//     title: '测试1',
//     content: '这是一段测试内容',
//     user_id: user._id
//   })
// })();

// 知道文章id(60a237d1a972964bf818890a) 查用户
(async () => {
  // let article = await ArticleModel.findById('60a237d1a972964bf818890a').populate('user_id')
  // console.log(article);

  let article = await ArticleModel.aggregate([{
      $lookup: {
        from: 'user', // 通过文章查询用户
        localField: 'user_id', // 对应的文章字段
        foreignField: '_id', // 对应的用户字段
        as: 'user' // 查到的结果放到user字段中
      }
    },
    {
      $match: { // 查询指定id
        _id: mongoose.Types.ObjectId('60a237d1a972964bf818890a')
      }
    },
    {
      $project: { // 结果显示的字段
        user: 1
      }
    }
  ])
  console.log(article);
})();
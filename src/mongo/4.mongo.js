const mongoose = require('mongoose')
const UserModel = require('./model/user');

// 自己可以在骨架上扩展方法
(async () => {
  // let user = await UserModel.findByName('wyb1')
  // console.log(user);

  // 创建用户
  // let user = await new UserModel({
  //   username: 'wyb5',
  //   password: '123456'
  // }).save()
  // console.log(user);

  // 将用户的密码保存为MD5格式
  // let user = await new UserModel({
  //   username: 'wyb7',
  //   password: '123456'
  // }).saveMd5()

  let users = await UserModel.findOne({})
  console.log(users.usernameAndPassword);

})();
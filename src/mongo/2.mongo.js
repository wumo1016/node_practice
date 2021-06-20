const mongoose = require('mongoose')
const UserModel = require('./model/user')

let arr = []
for (let i = 0; i < 5; i++) {
  arr.push({
    username: 'wyb' + i,
    password: 'abc' + i,
    gender: 1,
    age: i
  })
}

(async () => {
  /* 新增 */
  // let users = await UserModel.create(arr)
  // console.log(users);

  /* 查询 */
  // let users = await UserModel.find({}) // 查询所有
  // let users = await UserModel.find({username:'wyb1',password:'abc1'}) // 查询条件
  // let users = await UserModel.find({}, { username: 1, age: 1 }) // 查询条件并且只显示指定字段 一般0/1只能有一种 但是可以添加 _id:0
  // let users = await UserModel.find({}, { age: 0 }) // 取反 不显示age
  // let users = await UserModel.find({ $or: [{ username: 'wyb1'},{ username: 'wyb2'}] }) // 取 username = wyb1/wyb2
  // let users = await UserModel.find({ age: { $gt: 2 } }) // 取age>2  $gt大于 $lt小于
  // let users = await UserModel.find({}).limit(3) // 先返回3条数据
  // let users = await UserModel.find({}).limit(3).skip(1) // 跳过一条 返回3条
  // 分页显示
  // let limit = 3,
  //   current = 1
  // let users = await UserModel.find({}).limit(limit).skip((current - 1) * limit)
  // let users = await UserModel.find({}).limit(limit).skip((current - 1) * limit).sort({age:-1}) // 根据年龄倒序

  /* 更新 updateOne更新一个 updateMany更新多个 */
  // let users = await UserModel.updateOne({username: 'wyb0'}, {password:'abc10'})

  /* 删除 */
  let users = await UserModel.deleteOne({username: 'wyb0'})

  console.log(users);

  mongoose.disconnect()
})();
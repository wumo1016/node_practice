const mongoose = require('mongoose')

// 1.连接数据库
mongoose.connect('mongodb://webAdmin:123456@127.0.0.1:27017/web', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    return console.log('数据库连接失败');
  }
  console.log('数据库连接成功');
})

// 2.给数据库创造一个固定的骨架 用来描述集合中的字段 规范存入的数据格式
const UserSchema = mongoose.Schema({ // 在配置骨架的时候 可以增加默认值和校验 包括对属性的操作功能
  username: {
    type: String,
    trim: true, // 表示去掉前后空格
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 6,
    validate: {
      validator(value) { // 返回true表示校验通过
        console.log(value);
        return true
      },
      message: ''
    }
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
    default: 18
  },
  gender: {
    type: Number,
    enum: [0, 1]
  },
}, {
  timestamps: {
    createAt: 'createAt', // 自动生成创建时间
    updateAt: 'updateAt' //         更新时间
  }
})

// 3.创建一个数据库模型 用来操作数据库 可以当作集合 (默认会根据名字小写+s的集合)
const UserModel = mongoose.model('User', UserSchema); // 第三个参数就是集合名字字符串 指定后就不会加s

(async () => {
  let r = await UserModel.create({
    username: ' Zs ',
    address: '中关村',
    password: '1234567',
    gender: 1
  })
  console.log(r);
  mongoose.disconnect()
})();
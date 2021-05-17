## Win安装
  - 下载安装包 `https://www.mongodb.com/try/download/community`
  - 配置环境变量(mongo的bin目录)到path中 新建一条数据 例如：`C:\Program Files\MongoDB\Server\4.4\bin`
  - 安装后 mogoed 服务端是自行启动 采用的配置文件是 `mongod.cfg`
  - 默认端口号 避免安装

## 可视化工具 Robomongo Robo 3T
  - 下载安装包 `https://robomongo.org/download`

## 简介
  - 数据库 => 集合 => 文档

## 配置数据库权限
  - 链接数据库
  - 切换到admin数据库
  - 创建用户
  - 先关闭Mongo服务
  - 去mongo的配置文件添加 security: authorization: enabled
  - 启动Mongo服务
  - 切换到 admin 用户
  - 登录 `db.auth('wyb','123456')`
  - 进入web数据库
  - 创建数据库用户 `db.createUser({user:'webAdmin',pwd:'123456',roles:[{role:'dbOwner',db:'web'}]})`
  - 切换到web数据库
  - 创建一条数据 db.user.insert({name:'wyb'}) 往当前数据库插入一条数据 user是集合

  - 进入数据库 `mongo webAdmin` === `mongo` + `use webAdmin`

## 常用命令
  - 链接数据库 `mongo`
  - 显示所有数据库 `show dbs`
  - 显示当前数据库的所有集合 `show collections`
  - 切换到admin数据库 `use admin`
  - 查看当前数据库 `db`
  - 显示当前数据库用户 `show users`
  - 显示帮助信息 `db.help()`
  - 删除用户 `db.dropUser('用户名')`
  - 创建用户 `db.createUser({user:'wyb',pwd:'123456',roles:[{role:'root',db:'admin'}]})` 表示给admin配置了超级管理员
  - 进入数据库 `use 库名` 没有则直接新建
  - 增 db.user.insert({name:'wyb'})
  - 删 db.user.remove()
  - 改 db.user.update()
  - 查 db.user.find()

## 步骤
  - 创建库
  - 创建admin用户
  - 创建数据库专用用户
  - 进入指定库 然后登录即可

## node工具 mongoose
  - orm(对象关系映射)工具方便 而且可以约束存储内容

## 下载安装
  - 下载地址 `https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip`

## 将redis安装到本地服务
  - `redis-server --service-install redis.windows.conf --loglevel verbose`
    - redis.windows.conf 使用这个配置文件
    - --loglevel verbose 添加日志

## 将redis的安装目录放到path的环境变量中

## 可视化工具 `https://pan.baidu.com/s/1Ov6M_kOOclATfY4Hak1V4Q`

## 基本操作
  - `keys*` 列出所有数据
  - `flushall` 清空所有数据
  - `set key value` 设置数据
  - `get key` 获取数据
  - `expire age 5` 设置age 5s后过期
  - `exists age` 查看age是否存在 存在返回1 否则0
  - `hset obj name wyb` 设置 对象 属性 值
  - `hget obj name` 获取 对象 属性
  - `hgetall obj` 获取对象所有属性
  - `hdel obj name` 删除 对象 属性
  - `hmset obj a 1 b 2` 设置多个属性和值
  - `hkeys obj` 获取所有对象属性

## 安全问题
  - 配置密码 `config set requirepass wyb`
  - 登录 `auth wyb`
const redis = require('redis')
// const {
//   promisify
// } = require('util')
// promisify(redis.get).bind(redis)

const client = redis.createClient(6379, '127.0.0.1', {
  password: 'wyb'
})

client.on('error', function (err) {
  console.log(err);
})

// client.set('name', 'wyb', redis.print)

// 封装一个类 用于基本的增删改查
class RedisService {
  set(key, value, expire) {
    if (typeof expire !== 'undefined') {
      client.setex(key, expire, value)
    } else {
      client.set(key, value, redis.print)
    }
  }
  get(key) {
    return new Promise((r, j) => {
      client.get(key, function (err, data) {
        if (err) j(err)
        r(data)
      })
    })
  }
  remove(key) {
    return new Promise((r, j) => {
      client.del(key, function (err, data) {
        if (err) j(err)
        r(data)
      })
    })
  }
  ttl(key) { // 获取过期时间 如果没有则返回 -1
    return new Promise((r, j) => {
      client.ttl(key, function (err, data) {
        if (err) j(err)
        r(data)
      })
    })
  }
}

let service = new RedisService()
service.set('name', 'wyb')
service.get('name').then(data => {
  console.log(data);
})
service.ttl('name').then(data => {
  console.log(data);
})


// 